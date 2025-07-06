"use client";
import React from "react";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import {
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Link as MuiLink,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "../context/AuthProvider";

// --------------------------------------------------------------------------------
// LOGIN PAGE – wired to Cinemate auth API via AuthProvider
// --------------------------------------------------------------------------------

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  // --------------------------------------------------------------------------------
  // Helpers
  // --------------------------------------------------------------------------------
  const sanitizeInput = (input: string) => input.replace(/[\${}\""]/g, "");
  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.toLowerCase());
  const handleTogglePassword = () => setShowPassword((f) => !f);

  // --------------------------------------------------------------------------------
  // Main submit handler
  // --------------------------------------------------------------------------------
  const handleLogin = async () => {
    const rawEmail = email.trim();
    const rawPassword = password.trim();
    const safeEmail = sanitizeInput(rawEmail);
    const safePassword = sanitizeInput(rawPassword);
    const newErrors: typeof errors = {};

    // --- client‑side validation
    if (!rawEmail) newErrors.email = "Email is required";
    else if (!isValidEmail(rawEmail)) newErrors.email = "Please enter a valid email";

    if (!rawPassword) newErrors.password = "Password is required";
    else if (rawPassword.length < 6) newErrors.password = "Password must be at least 6 characters";

    if (rawEmail !== safeEmail || rawPassword !== safePassword) {
      newErrors.general = 'Input contains invalid characters. Please remove any { } " or $.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // --- call the API through AuthProvider
    try {
      setLoading(true);
      await login(rawEmail, rawPassword);
      router.push("/"); // landing page after successful login
    } catch (err) {
      setErrors({ general: "Wrong e‑mail or password. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------------------------------------
  // RENDER
  // --------------------------------------------------------------------------------
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
        {/* Title */}
        <MuiLink
          component="span"
          underline="none"
          variant="body1"
          sx={{ color: "#1E8E95", fontSize: 24, pt: 8, pb: 8, transition: "all .3s" }}
        >
          Log in
        </MuiLink>

        {/* Error */}
        {errors.general && (
          <Typography variant="body2" sx={{ color: "#EB685E", mb: 2, fontSize: 16 }}>
            {errors.general}
          </Typography>
        )}

        {/* Email field */}
        <TextField
          fullWidth
          variant="outlined"
          label="E‑mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              color: "#fff",
              "& fieldset": { borderColor: "#D5EBE9", borderRadius: 2 },
              "&:hover fieldset": { borderColor: "#98C4CA" },
            },
            "& .MuiInputLabel-root": { color: "#98C4CA" },
            "& .MuiFormHelperText-root": { color: "#EB685E" },
          }}
        />

        {/* Password field */}
        <TextField
          fullWidth
          variant="outlined"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
          sx={{
            mb: 4,
            "& .MuiOutlinedInput-root": {
              color: "#fff",
              "& fieldset": { borderColor: "#D5EBE9", borderRadius: 2 },
              "&:hover fieldset": { borderColor: "#98C4CA" },
            },
            "& .MuiInputLabel-root": { color: "#98C4CA" },
            "& .MuiFormHelperText-root": { color: "#EB685E" },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePassword} edge="end" sx={{ color: "#fff" }}>
                  <Box
                    component="img"
                    src={showPassword ? "/svg/closedeye.svg" : "/svg/eye.svg"}
                    alt="Toggle"
                    sx={{ width: 24, height: 24 }}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Submit button */}
        <Button
          variant="contained"
          fullWidth
          disabled={loading}
          onClick={handleLogin}
          sx={{
            mb: 2,
            bgcolor: "#1E8E95",
            "&:hover": { bgcolor: "#24C0C9" },
            borderRadius: 2,
            py: 1.5,
            fontWeight: "bold",
            color: "#fff",
            textTransform: "none",
          }}
        >
          {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Log in"}
        </Button>

        {/* Links */}
        <NextLink href="/forgot-password" passHref>
          <MuiLink underline="none" sx={{ color: "#46C2D3", fontSize: 16, mb: 4, "&:hover": { color: "#24C0C9" } }}>
            Forgot your password?
          </MuiLink>
        </NextLink>

        <Typography sx={{ color: "#fff", fontSize: 16 }}>
          Don’t have an account?{" "}
          <NextLink href="/signup" passHref>
            <MuiLink underline="none" sx={{ color: "#46C2D3", fontWeight: "bold", "&:hover": { color: "#24C0C9" } }}>
              Sign up
            </MuiLink>
          </NextLink>
        </Typography>
      </Paper>
    </Box>
  );
}
