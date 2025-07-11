"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getTokensByState } from "@/lib/auth";   // we add this helper next
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function OAuthSuccessPage() {
  const params   = useSearchParams();
  const router   = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const err = params.get("error");
    if (err) { setError(err); return; }

    const state = params.get("state");
    if (!state) { setError("Missing state parameter."); return; }

    (async () => {
      try {
        const { accessToken, refreshToken } = await getTokensByState(state);
        localStorage.setItem("accessToken",  accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        router.replace("/");          // or “/dashboard” etc.
      } catch (e: any) {
        setError(e?.response?.data?.message ?? "Could not complete sign-in.");
      }
    })();
  }, [params, router]);

  if (error) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#000", color: "#fff",
                 display: "flex", flexDirection: "column",
                 justifyContent: "center", alignItems: "center" }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Google sign-in failed</Typography>
        <Typography sx={{ opacity: 0.8 }}>{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#000",
               display: "flex", justifyContent: "center", alignItems: "center" }}>
      <CircularProgress />
    </Box>
  );
}
