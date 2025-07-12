/* app/signup/page.tsx */
"use client";
import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import {
  Box,
  Paper,
  Typography,
  Button,
  Link as MuiLink,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

export default function SignUpOptionsPage() {
  const router = useRouter();
  const [optOut, setOptOut] = React.useState(false);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        bgcolor: "#000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: 380,
          minHeight: 600,
          borderRadius: "35px",
          bgcolor: "#284345",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: 6,
          pb: 6,
          px: 4,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: "#1E8E95",
            fontSize: 16,
            fontWeight: "bold",
            mb: 8,
            pt: 14,
          }}
        >
          Create an account
        </Typography>

        {/* ----- OAuth / e-mail buttons ----- */}
        <Button
          fullWidth
          variant="outlined"
          startIcon={
            <Box component="img" src="/svg/google.svg" alt="Google" sx={{ width: 24, height: 24 }} />
          }
          sx={{
            mb: 3,
            color: "#c1dad9",
            borderColor: "#c1dad9",
            "&:hover": { color: "#24C0C9", borderColor: "#24C0C9" },
            textTransform: "none",
            borderRadius: 2,
            fontWeight: "bold",
          }}
          onClick={() => router.push("/signup/google")}
        >
          Continue with Google
        </Button>

        <Button
          fullWidth
          variant="outlined"
          startIcon={
            <Box component="img" src="/svg/facebook.svg" alt="Facebook" sx={{ width: 24, height: 24 }} />
          }
          sx={{
            mb: 3,
            color: "#c1dad9",
            borderColor: "#c1dad9",
            "&:hover": { color: "#24C0C9", borderColor: "#24C0C9" },
            textTransform: "none",
            borderRadius: 2,
            fontWeight: "bold",
          }}
          onClick={() => router.push("/signup/facebook")}
        >
          Continue with Facebook
        </Button>

        <Button
          fullWidth
          variant="outlined"
          startIcon={
            <Box component="img" src="/svg/email.svg" alt="Email" sx={{ width: 24, height: 24 }} />
          }
          sx={{
            mb: 4,
            color: "#c1dad9",
            borderColor: "#c1dad9",
            "&:hover": { color: "#24C0C9", borderColor: "#24C0C9" },
            textTransform: "none",
            borderRadius: 2,
            fontWeight: "bold",
          }}
          onClick={() => router.push("/signup/email")}
        >
          Continue with E-mail
        </Button>

        {/* ----- opt-out checkbox ----- */}
        <FormControlLabel
          control={
            <Checkbox
              checked={optOut}
              onChange={() => setOptOut((v) => !v)}
              sx={{ color: "#c1dad9", "&.Mui-checked": { color: "#24C0C9" } }}
            />
          }
          label={
            <Typography sx={{ color: "#c1dad9", fontSize: 14, whiteSpace: "pre-line" }}>
              I do not wish to receive news and{`\n`}promotions from Cinemate by email.
            </Typography>
          }
          sx={{ mb: 3 }}
        />

        {/* ----- legal text with single anchors ----- */}
        <Typography sx={{ color: "#1E8E95", fontSize: 14, mb: 8 }}>
          By continuing, you agree to IllustrationStock Company’s{" "}
          <MuiLink
            component={NextLink}
            href="#"
            sx={{ color: "#46C2D3", textDecoration: "underline" }}
            underline="none"
          >
            Terms of Use
          </MuiLink>{" "}
          and{" "}
          <MuiLink
            component={NextLink}
            href="#"
            sx={{ color: "#46C2D3", textDecoration: "underline" }}
            underline="none"
          >
            Privacy Policy
          </MuiLink>
          .
        </Typography>

        {/* ----- login link ----- */}
        <Typography sx={{ color: "#c1dad9", fontSize: 16 }}>
          Already have an account?{" "}
          <MuiLink
            component={NextLink}
            href="/login"
            sx={{ color: "#24C0C9", fontWeight: "bold" }}
            underline="none"
          >
            Log in
          </MuiLink>
        </Typography>
      </Paper>
    </Box>
  );
}
