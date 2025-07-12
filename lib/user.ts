/* lib/user.ts */
import api from "@/lib/api"

/* ---------- shapes ---------- */
/** raw shape exactly as /user/me returns it */
interface RawUserProfile {
  id:        number
  username:  string
  firstname: string
  surname:   string
  email:     string
  phoneNum:  string
  avatar:    string | null
  provider?: string
}

/** camel-case shape used by the UI */
export interface UserProfile {
  id:        number
  username:  string
  firstName: string
  lastName:  string
  email:     string
  phone:     string
  avatarUrl: string | null
}

/* helper: turn raw → camel-case */
function normalise(u: RawUserProfile): UserProfile {
  return {
    id:         u.id,
    username:   u.username,
    firstName:  u.firstname,
    lastName:   u.surname,
    email:      u.email,
    phone:      u.phoneNum,
    avatarUrl:  u.avatar,
  }
}

/* ---------- GET  /api/v1/user/me ---------- */
export async function getMyProfile() {
  const { data } = await api.get<RawUserProfile>("/user/me")
  return normalise(data)
}

/* ---------- PUT  /api/v1/user/me  (multipart) ---------- */
export interface UpdateProfileMetadata {
  username:  string
  firstname: string
  surname:   string
  email:     string
  phoneNum:  string
}

export async function updateMyProfile(
  metadata: UpdateProfileMetadata,
  avatarFile: File | null,
) {
  const form = new FormData()

  /* send metadata as a plain-text blob (backend parses JSON string) */
  form.append(
    "metadata",
    new Blob([JSON.stringify(metadata)], { type: "text/plain" }),
  )

  /* avatar is required → real file or zero-byte placeholder */
  form.append(
    "avatar",
    avatarFile ??
      new File([""], "placeholder.png", { type: "application/octet-stream" }),
  )

  /* let Axios add the multipart boundary automatically */
  const { data } = await api.put<RawUserProfile>("/user/me", form)

  /* return camel-case back to the React component */
  return normalise(data)
}
