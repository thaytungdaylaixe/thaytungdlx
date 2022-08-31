import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { Box, Fab } from "@mui/material";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import Loading from "../components/loading";

import "./hocvien.css";

// eslint-disable-next-line
const SortFullName = (fullname) => {
  return [...fullname].sort((a, b) => {
    let a_sp = a.hovaten.split(" ")[a.hovaten.split(" ").length - 1];
    let b_sp = b.hovaten.split(" ")[b.hovaten.split(" ").length - 1];

    return a_sp.localeCompare(b_sp);
  });
};

const filterInfo = (allData, key, datafilter, outKey) => {
  return allData.filter((data) => {
    return data[key] === datafilter;
  })[0][outKey];
};

const Hocvien = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line
  const {
    datadlx,
    dataHvs: { hvs },
  } = useSelector((state) => ({ ...state }));

  const { sanhoc, nguon, truongthi, khoathi } = datadlx;

  const [loadingPage, setLoadingPage] = useState(true);
  // eslint-disable-next-line
  useEffect(() => {
    hvs && setLoadingPage(false);

    // 578beb8-67c3-b363-fdb2-ca055ab16f8b

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Loading loading={loadingPage} />

      {SortFullName(hvs).map((hv, i) => (
        <Box key={i} component="div" className="boxHv">
          <Box
            component="div"
            onClick={() => {
              navigate("/hocvien/" + hv._id);
            }}
          >
            <Box component="div" className="hovaten">
              {hv.hovaten}
            </Box>
            <Box component="span" className="ngaysinh">
              {hv.ngaysinh}
            </Box>
            <Box component="span" className="khoathi">
              {hv.khoathi !== "" &&
                " - " + filterInfo(khoathi, "_id", hv.khoathi, "value")}
            </Box>
            <Box component="span" className="sogiohoc">
              {hv.sogiohoc !== "" && " - " + hv.sogiohoc}
            </Box>
          </Box>
          <Box component="div" className="tel">
            <a href={"tel:" + hv.sdt}>
              <PhoneIcon />
            </a>
          </Box>
        </Box>
      ))}

      <Box
        sx={{
          "& > :not(style)": { m: 1 },
          position: "absolute",
          bottom: 10,
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
