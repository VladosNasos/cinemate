/* lib/user.ts */
import api from "@/lib/api";

/* -------- shape the back-end actually returns -------- */
interface RawUserProfile {
  id:        number;
  username:  string;
  firstname: string;
  surname:   string;
  email:     string;
  phoneNum:  string;
  avatar:    string | null;
}

/* -------- camel-case shape used by React components -------- */
export interface UserProfile {
  id:        number;
  username:  string;
  firstName: string;
  lastName:  string;
  email:     string;
  phone:     string;
  avatarUrl: string | null;
}

/* convert raw → UI */
const toUser = (u: RawUserProfile): UserProfile => ({
  id:         u.id,
  username:   u.username,
  firstName:  u.firstname,
  lastName:   u.surname,
  email:      u.email,
  phone:      u.phoneNum,
  avatarUrl:  u.avatar,
});

/* -------- GET  /user/me -------- */
export async function getMyProfile() {
  const { data } = await api.get<RawUserProfile>("/user/me");
  return toUser(data);
}

/* -------- PUT  /user/me (multipart) -------- */
export interface UpdateProfileMetadata {
  username:  string;
  firstname: string;
  surname:   string;
  email:     string;
  phoneNum:  string;
}

export async function updateMyProfile(
  metadata: UpdateProfileMetadata,
  avatarFile: File | null,
) {
  const form = new FormData();

  form.append("metadata", JSON.stringify(metadata));

  form.append(
    "avatar",
    avatarFile ??
      new File([""], "placeholder.png", { type: "application/octet-stream" }),
  );

  /* keep header override exactly as you had it */
  const { data } = await api.put<RawUserProfile>("/user/me", form, {
    headers: { "Content-Type": undefined },
  });

  return toUser(data);
}
