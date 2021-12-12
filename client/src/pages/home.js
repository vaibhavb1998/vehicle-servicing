import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/router";

import VehicleBanner from "../icons/vehicle-banner.png";

export default function ButtonAppBar() {
  const router = useRouter();
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Vehicle Servicing Portal
            </Typography>
            <Button color="inherit" onClick={() => router.push("/home")}>
              Home
            </Button>
            <Button color="inherit" onClick={() => router.push("/login")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => router.push("/register")}>
              Register
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        style={{ padding: "40px 120px", minHeight: "80vh" }}
      >
        <div>
          <Typography variant="h1" component="div">
            Vehicle Servicing Portal
          </Typography>
        </div>

        <div style={{ marginTop: 100 }}>
          <Button
            variant="contained"
            style={{ width: 200, marginRight: 40 }}
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
          <Button
            variant="contained"
            style={{ width: 200 }}
            onClick={() => router.push("/register")}
          >
            Register
          </Button>
        </div>
      </Box>
    </div>
  );
}
