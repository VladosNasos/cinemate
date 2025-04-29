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
            fontSize: 30,
            fontWeight: "bold",
            mb: 8,
            WebkitTextStroke: "1px #000",
            "&:hover": { color: "#24C0C9", textShadow: "0 0 6px #24C0C9" },
          }}
        >
          Create an account
        </Typography>

        <Button
          fullWidth
          variant="outlined"
          startIcon={
            <Box
              component="img"
              src="/svg/google.svg"
              alt="Google"
              sx={{ width: 24, height: 24 }}
            />
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
            <Box
              component="img"
              src="/svg/facebook.svg"
              alt="Facebook"
              sx={{ width: 24, height: 24 }}
            />
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
            <Box
              component="img"
              src="/svg/email.svg"
              alt="Email"
              sx={{ width: 24, height: 24 }}
            />
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

        <FormControlLabel
          control={
            <Checkbox
              checked={optOut}
              onChange={() => setOptOut((v) => !v)}
              sx={{
                color: "#c1dad9",
                "&.Mui-checked": { color: "#24C0C9" },
              }}
            />
          }
          label={
            <Typography
              sx={{ color: "#c1dad9", fontSize: 14, whiteSpace: "pre-line" }}
            >
              I do not wish to receive news and{`\n`}
              promotions from Cinemate by email.
            </Typography>
          }
          sx={{ mb: 3 }}
        />

        <Typography sx={{ color: "#1E8E95", fontSize: 14, mb: 8 }}>
          By continuing, you agree to IllustrationStock Company’s{" "}
          <NextLink href="#" passHref>
            <MuiLink sx={{ color: "#46C2D3", textDecoration: "underline" }}>
              Terms of Use
            </MuiLink>
          </NextLink>{" "}
          and{" "}
          <NextLink href="#" passHref>
            <MuiLink sx={{ color: "#46C2D3", textDecoration: "underline" }}>
              Privacy Policy
            </MuiLink>
          </NextLink>
          .
        </Typography>

        <Typography sx={{ color: "#c1dad9", fontSize: 16 }}>
          Already have an account?{" "}
          <NextLink href="/login" passHref>
            <MuiLink
              sx={{ color: "#24C0C9", fontWeight: "bold" }}
              underline="none"
            >
              Log in
            </MuiLink>
          </NextLink>
        </Typography>
      </Paper>
    </Box>
  );
}
