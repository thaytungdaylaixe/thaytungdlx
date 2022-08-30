import React, { useEffect, useState } from "react";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";
import { Box, Fab } from "@mui/material";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import Loading from "../components/loading";

const SortFullName = (fullname) => {
  return [...fullname].sort((a, b) => {
    let a_sp = a.hovaten.split(" ")[a.hovaten.split(" ").length - 1];
    let b_sp = b.hovaten.split(" ")[b.hovaten.split(" ").length - 1];

    return a_sp.localeCompare(b_sp);
  });
};

const Hocvien = () => {
  const navigate = useNavigate();

  const [hvs, setHvs] = useState(JSON.parse(localStorage.getItem("hvs")) || []);
  const [loadingPage, setLoadingPage] = useState(true);
  useEffect(() => hvs && setLoadingPage(false));

  return (
    <>
      <Loading loading={loadingPage} />
      <Box
        sx={{
          "& > :not(style)": { m: 1 },
          position: "fixed",
          bottom: 60,
          right: 10,
        }}
        onClick={() => {
          navigate("/hocvien/add");
        }}
      >
        <Fab color="primary" aria-label="add">
          <PersonAddAltOutlinedIcon />
        </Fab>
      </Box>
    </>
  );
};

export default Hocvien;
