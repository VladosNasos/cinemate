"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Link as MuiLink,
} from "@mui/material";
import { useAuth } from "../context/AuthProvider"; // relative to /app/forgot-password
import * as auth from "@/lib/auth";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sanitizeInput = (input: string) => input.replace(/[\${}\"']/g, "");
  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.toLowerCase());

  const handleSend = async () => {
    const raw = email.trim();
    const safe = sanitizeInput(raw);

    if (!raw || !isValidEmail(raw) || raw !== safe) {
      setError("Enter a valid e‑mail address");
      return;
    }

    try {
      setLoading(true);
      await auth.forgotPassword({ email: raw });
      setSent(true);
    } catch (_) {
      setError("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <Box sx={{ width: "100vw", height: "100vh", bgcolor: "#000", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Paper elevation={4} sx={{ width: 380, minHeight: 400, borderRadius: "35px", bgcolor: "#284345", textAlign: "center", p: 6 }}>
          <Typography sx={{ color: "#1E8E95", fontSize: 24, mb: 4 }}>Check your inbox</Typography>
          <Typography sx={{ color: "#c1dad9", mb: 6 }}>
            We sent a password‑reset link to <br /> <b>{email}</b>
          </Typography>
          <Button variant="contained" fullWidth onClick={() => router.push("/login")}
            sx={{ bgcolor: "#1E8E95", "&:hover": { bgcolor: "#24C0C9" }, borderRadius: 2, py: 1.5, fontWeight: "bold", color: "#fff", textTransform: "none" }}>
            Back to log in
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100vw", height: "100vh", bgcolor: "#000", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Paper elevation={4} sx={{ width: 380, minHeight: 600, borderRadius: "35px", bgcolor: "#284345", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", pt: 6, pb: 6, px: 4 }}>
        <MuiLink component="span" underline="none" sx={{ color: "#1E8E95", fontSize: 24, mb: 8 }}>Forgot password</MuiLink>

        {error && <Typography variant="body2" sx={{ color: "#EB685E", mb: 2 }}>{error}</Typography>}

        <TextField fullWidth label="E‑mail" type="email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 4, "& .MuiOutlinedInput-root": { color: "#fff", "& fieldset": { borderColor: "#D5EBE9", borderRadius: 2 }, "&:hover fieldset": { borderColor: "#98C4CA" } }, "& .MuiInputLabel-root": { color: "#98C4CA" }, "& .MuiFormHelperText-root": { color: "#EB685E" } }} />

        <Button fullWidth variant="contained" disabled={loading} onClick={handleSend} sx={{ mb: 4, bgcolor: "#1E8E95", "&:hover": { bgcolor: "#24C0C9" }, borderRadius: 2, py: 1.5, fontWeight: "bold", color: "#fff", textTransform: "none" }}>
          {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Send reset link"}
        </Button>

        <NextLink href="/login" passHref>
          <MuiLink underline="none" sx={{ color: "#46C2D3", "&:hover": { color: "#24C0C9" } }}>
            Back to log in
          </MuiLink>
        </NextLink>
      </Paper>
    </Box>
  );
}
