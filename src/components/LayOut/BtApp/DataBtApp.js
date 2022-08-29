import React from "react";

import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";

import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";

import AppsIcon from "@mui/icons-material/Apps";

export const BtAppData = [
  {
    label: "Home",
    value: "",
    icon: <AppsIcon />,
  },
  {
    label: "Học viên",
    value: "hocvien",
    icon: <AutoStoriesOutlinedIcon />,
  },
  {
    label: "Lịch thi",
    value: "lichthi",
    icon: <DirectionsCarFilledOutlinedIcon />,
  },
  {
    label: "TKB",
    value: "tkb",
    icon: <HomeWorkOutlinedIcon />,
  },
];
