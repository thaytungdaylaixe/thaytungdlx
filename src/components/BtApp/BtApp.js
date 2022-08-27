import React from "react";
import { BtAppData } from "./DataBtApp";
import "./BtApp.css";

import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";

export default function BtApp(props) {
  const { BtChange, value } = props;

  const handleChange = (event, newValue) => {
    BtChange(newValue);
  };

  return (
    <Paper className="BtApp_Paper" elevation={3}>
      <BottomNavigation
        className="BtApp_BottomNavigation"
        value={value}
        onChange={handleChange}
      >
        {BtAppData.map((prop, i) => (
          <BottomNavigationAction
            className="BtApp_BottomNavigationAction"
            key={i}
            label={prop.label}
            value={prop.value}
            icon={prop.icon}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
