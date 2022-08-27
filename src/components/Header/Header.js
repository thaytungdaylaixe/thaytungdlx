import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClearIcon from "@mui/icons-material/Clear";

export default function Header(props) {
  const { backAction, clickBack, clearHistory } = props;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {!backAction && (
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Your App
            </Typography>
          )}

          {backAction && (
            <>
              {" "}
              <IconButton
                onClick={clickBack}
                edge="start"
                color="inherit"
                aria-label="menu"
              >
                <ArrowBackIcon />
              </IconButton>
              <IconButton
                onClick={clearHistory}
                edge="start"
                color="inherit"
                aria-label="menu"
              >
                <ClearIcon />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
