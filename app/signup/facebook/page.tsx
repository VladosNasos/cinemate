"use client";

import React, { useEffect } from "react";
import NextLink from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Paper, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthProvider"; // /app/signup/facebook → two levels up

// BACKEND redirection endpoint (Spring Security OAuth2) — adjust if different
const FACEBOOK_OAUTH_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/api\/v1$/, "")}/oauth2/authorization/facebook`;

export default function SignUpFacebookPage() {
  const router = useRouter();
  const search = useSearchParams();
  const { login } = useAuth();

  // 1) If backend just sent us back with tokens as query params → log user in
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

  // 2) Click handler → redirect to Spring Security Facebook endpoint
  const handleContinue = () => {
    window.location.href = FACEBOOK_OAUTH_URL;
  };

  return (
    <Box sx={{ width: "100vw", height: "100vh", bgcolor: "#000", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Paper elevation={4} sx={{ width: 380, minHeight: 600, borderRadius: "35px", bgcolor: "#284345", p: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography sx={{ color: "#1E8E95", fontSize: 24, mb: 1 }}>Log in</Typography>
        <Typography sx={{ color: "#1E8E95", fontSize: 16, mb: 4 }}>Welcome back!</Typography>

        {/* Placeholder avatar / email — real data comes from Facebook */}
        <Box component="img" src="/images/tyler_durden.jpg" alt="Avatar" sx={{ width: 64, height: 64, borderRadius: "50%", mb: 2 }} />
        <Typography sx={{ color: "#c1dad9", mb: 4 }}>[Facebook e‑mail]</Typography>

        <Box onClick={handleContinue} sx={{ width: "100%", border: "1px solid #1E8E95", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "space-between", px: 2, py: 1.5, mb: 8, cursor: "pointer", "&:hover": { borderColor: "#24C0C9" } }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box component="img" src="/images/tyler_durden.jpg" alt="Avatar" sx={{ width: 40, height: 40, borderRadius: "50%", mr: 1 }} />
            <Box>
              <Typography sx={{ color: "#c1dad9", fontWeight: "bold", fontSize: 14 }}>Continue with Facebook</Typography>
              <Typography sx={{ color: "#c1dad9", fontSize: 12 }}> </Typography>
            </Box>
          </Box>
          <Box component="img" src="/svg/facebook.svg" alt="Facebook" sx={{ width: 24, height: 24 }} />
        </Box>

        <NextLink href="/signup" passHref>
          <Typography sx={{ color: "#c1dad9" }}>Don’t you have an account? Sign up</Typography>
        </NextLink>
      </Paper>
    </Box>
  );
}
