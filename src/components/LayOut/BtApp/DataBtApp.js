import React from "react";

import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AppsIcon from "@mui/icons-material/Apps";

export const BtAppData = [
  {
    label: "Home",
    value: "/",
    icon: <AppsIcon />,
  },
  {
    label: "Học viên",
    value: "/hocvien",
    icon: <PeopleAltOutlinedIcon />,
  },
  {
    label: "Lịch thi",
    value: "/lichthi",
    icon: <AutoStoriesOutlinedIcon />,
  },
  {
    label: "TKB",
    value: "/tkb",
    icon: <AccessTimeOutlinedIcon />,
  },
];
