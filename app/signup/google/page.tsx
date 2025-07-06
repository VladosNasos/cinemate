"use client";

import React, { useEffect } from "react";
import NextLink from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Paper, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthProvider";

// Fixed backend URL (не зависит от env)
const GOOGLE_OAUTH_URL = "http://cinemate.ddns.net:8081/oauth2/authorization/google";

export default function SignUpGooglePage() {
  const router = useRouter();
  const search = useSearchParams();
  const { login } = useAuth();

  /* ---------------------------------------------------------------
     Handle redirect back with tokens
  ----------------------------------------------------------------*/
  useEffect(() => {
    const at = search.get("accessToken");
    const rt = search.get("refreshToken");
    const email = search.get("email");
    if (at && rt && email) {
      localStorage.setItem("accessToken", at);
      localStorage.setItem("refreshToken", rt);
      localStorage.setItem("user_email", email);
      router.push("/");
    }
  }, [search, router]);

  return (
    <Box sx={{ width: "100vw", height: "100vh", bgcolor: "#000", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Paper elevation={4} sx={{ width: 380, minHeight: 600, borderRadius: "35px", bgcolor: "#284345", p: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography sx={{ color: "#1E8E95", fontSize: 24, mb: 1 }}>Log in</Typography>
        <Typography sx={{ color: "#1E8E95", fontSize: 16, mb: 4 }}>Welcome back!</Typography>

        <Box component="img" src="/images/tyler_durden.jpg" alt="Avatar" sx={{ width: 64, height: 64, borderRadius: "50%", mb: 2 }} />
        <Typography sx={{ color: "#c1dad9", mb: 4 }}>[Google e‑mail]</Typography>

        {/* clickable card – real redirect via <a> */}
        <a href={GOOGLE_OAUTH_URL} style={{ width: "100%", textDecoration: "none" }}>
          <Box sx={{ width: "100%", border: "1px solid #1E8E95", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "space-between", px: 2, py: 1.5, mb: 8, cursor: "pointer", "&:hover": { borderColor: "#24C0C9" } }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box component="img" src="/images/tyler_durden.jpg" alt="Avatar" sx={{ width: 40, height: 40, borderRadius: "50%", mr: 1 }} />
              <Box>
                <Typography sx={{ color: "#c1dad9", fontWeight: "bold", fontSize: 14 }}>Continue with Google</Typography>
                <Typography sx={{ color: "#c1dad9", fontSize: 12 }}></Typography>
              </Box>
            </Box>
            <Box component="img" src="/svg/google.svg" alt="Google" sx={{ width: 24, height: 24 }} />
          </Box>
        </a>

        <NextLink href="/signup" passHref>
          <Typography sx={{ color: "#c1dad9" }}>Don’t you have an account? Sign up</Typography>
        </NextLink>
      </Paper>
    </Box>
  );
}
