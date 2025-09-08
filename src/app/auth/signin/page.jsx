"use client";

// route imports
import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

// MUI imports
import Image from "next/image";
import {
  Button,
  Stack,
  Typography,
  Alert,
  Box,
  CircularProgress,
  TextField,
} from "@mui/material";

export default function SignIn() {
  const [email, setEmail] = useState("admin@example.com"); // demo defaults
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);

  const params = useSearchParams();
  const errorParam = params.get("error");
  const errorMsg = useMemo(() => {
    if (!errorParam) return "";
    if (errorParam === "CredentialsSignin") return "Invalid email or password.";
    return "Sign in failed.";
  }, [errorParam]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/", // where to go after SignIn
    });
    setLoading(false);
  }

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 180px)"
    >
      <form onSubmit={handleSubmit}>
        <Stack
          spacing={3}
          justifyContent="center"
          alignItems="center"
          sx={{
            py: 6,
            px: 6,
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
            minWidth: 360,
          }}
        >
          <Box
            component="img"
            src="/portfolio-management-logo.png"
            alt="Logo"
            sx={{ borderRadius: 2, width: 96, height: 96 }}
          />

          <Typography gutterBottom variant="h5">
            Sign In to Portfolio Management
          </Typography>

          {errorMsg ? (
            <Alert severity="error" sx={{ alignSelf: "stretch" }}>
              {errorMsg}
            </Alert>
          ) : null}

          <TextField
            label="Email"
            type="email"
            value={email}
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            fullWidth
            startIcon={loading ? <CircularProgress size={18} /> : null}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
