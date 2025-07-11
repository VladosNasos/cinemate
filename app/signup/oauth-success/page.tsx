"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, CircularProgress, Typography } from "@mui/material";
import api from "@/lib/api";

/**
 * Backend (Google / Facebook) делает redirect на:
 *   http://cinemate.ddns.net:3000/signup/oauth-success?state=<UUID>
 * Мы забираем state  →  запрашиваем токены  →  кладём в localStorage.
 */
export default function OAuthSuccessPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const state = params.get("state");
    if (!state) {
      setError("State not provided");
      return;
    }

    (async () => {
      try {
        // Путь, который вернёт JSON {accessToken, refreshToken, email?}
        // baseURL у api уже содержит /api/v1
        const { data } = await api.get<{
          accessToken: string;
          refreshToken: string;
          email?: string;
        }>(`/oauth/tokens?state=${state}`);

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        if (data.email) localStorage.setItem("user_email", data.email);

        router.push("/");
      } catch {
        setError("Failed to exchange state for tokens. Link may have expired.");
      }
    })();
  }, [params, router]);

  return (
    <Box sx={{ width: "100vw", height: "100vh", bgcolor: "#000", display: "flex", justifyContent: "center", alignItems: "center" }}>
      {error ? (
        <Typography sx={{ color: "#EB685E", fontSize: 18 }}>{error}</Typography>
      ) : (
        <CircularProgress sx={{ color: "#24C0C9" }} />
      )}
    </Box>
  );
}
