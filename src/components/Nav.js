"use client";

// route imports
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useClientSession } from "@/lib/client-session";
import { useThemeMode } from "./ThemeProviderWrapper";
import { signOut } from "next-auth/react";

// MUI imports
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Tooltip,
  Button,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Nav = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const pathname = usePathname();

  const { user, status } = useClientSession();

  // Prevent hydration mismatch by not rendering until session is loaded
  // Also hide Nav if not authenticated
  // if (status === "loading" || !user) {
  //   return null;
  // }

  const navigation = [
    { name: "Dashboard", href: "/", current: pathname === "/" ? true : false },
    {
      name: "Financial Statement",
      href: "/financial-statement",
      current: pathname.startsWith("/financial-statement"),
    },
    {
      name: "Stocks & Options",
      href: "/stocks-options",
      current: pathname.startsWith("/stocks-options"),
    },
    {
      name: "Cryptos",
      href: "/cryptos",
      current: pathname.startsWith("/cryptos"),
    },
    {
      name: "Setup",
      href: "/setup",
      current: pathname.startsWith("/setup"),
    },
    ...(user?.roles?.permissions?.includes("*")
      ? [
          {
            name: "Admin Portal",
            href: "/admin-portal",
            current: pathname.startsWith("/admin-portal"),
          },
        ]
      : []),
  ];

  const profileSettings = [
    {
      name: "User Profile",
      href: "/user-profile",
      current: pathname.startsWith("/user-profile"),
    },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { mode, toggleMode } = useThemeMode();

  return (
    <AppBar position="fixed" color="default">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* menu for larger screen */}
          <IconButton sx={{ display: { xs: "none", md: "flex" }, mr: 1, p: 0 }}>
            <img
              style={{ borderRadius: 4 }}
              src="/portfolio-management-logo.png"
              alt="logo"
              width="50"
              height="50"
            />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {navigation.map((page) => (
                <Link key={page.name} href={page.href}>
                  <MenuItem
                    key={page.name}
                    sx={{
                      bgcolor: page.current ? "action.selected" : undefined,
                      color: page.current ? "action.contrastText" : undefined,
                      "&:hover": {
                        bgcolor: "action.hover",
                        color: "action.contrastText",
                      },
                    }}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>

          {/* menu for smaller screen */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <IconButton>
              <img
                src="/portfolio-management-logo.png"
                alt="logo"
                width="50px"
              />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {navigation.map((page) => (
              <Link key={page.name} href={page.href}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    m: 1,
                    display: "block",
                    bgcolor: page.current ? "action.selected" : undefined,
                    color: page.current ? "action.contrastText" : undefined,
                    "&:hover": {
                      bgcolor: "action.hover",
                      color: "action.contrastText",
                    },
                  }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>

          {/* user profile */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Profile">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{
                  bgcolor:
                    pathname.startsWith("/user-profile") && "action.selected",
                }}
              >
                <Avatar alt={user?.name} src={user?.image || undefined} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                sx={{
                  "&:hover": {
                    bgcolor: "primary.light",
                    color: "primary.contrastText",
                  },
                }}
                onClick={toggleMode}
              >
                <Typography textAlign="center">
                  {mode === "light"
                    ? "Switch to Dark Mode"
                    : "Switch to Light Mode"}
                </Typography>
              </MenuItem>

              {profileSettings.map((setting) => (
                <Link key={setting.name} href={setting.href}>
                  <MenuItem
                    sx={{
                      bgcolor: setting.current ? "primary.light" : undefined,
                      color: setting.current
                        ? "primary.contrastText"
                        : undefined,
                      "&:hover": {
                        bgcolor: "primary.light",
                        color: "primary.contrastText",
                      },
                    }}
                    onClick={handleCloseUserMenu}
                  >
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                </Link>
              ))}

              <MenuItem
                sx={{
                  "&:hover": {
                    bgcolor: "primary.light",
                    color: "primary.contrastText",
                  },
                }}
                onClick={() => {
                  handleCloseUserMenu();
                  signOut();
                }}
              >
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Nav;
