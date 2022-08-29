import React, { useState } from "react";
import "./layout.css";
import { useNavigate } from "react-router-dom";

import BtApp from "./BtApp/BtApp";
import Header from "./Header/Header";

const DefaultLayOut = ({ children }) => {
  const navigate = useNavigate();

  const [btNati, setBtNati] = useState(localStorage.getItem("link") || "");

  // eslint-disable-next-line no-unused-vars
  const [pathname, setPathname] = useState(window.location.pathname);

  const BtChange = (newValue) => {
    setBtNati(newValue);
    localStorage.setItem("link", newValue);
    navigate(newValue);
  };

  // eslint-disable-next-line no-unused-vars
  const [back, setBack] = useState(true);

  const clickBack = () => {
    window.history.go(-1);
  };

  const clearHistory = () => {
    console.log(window.history.length);
  };

  // useEffect(() => {
  //   localStorage.setItem("link", JSON.stringify(history));

  //   setBack(false);
  //   if (history.length > 1) {
  //     setBack(true);
  //   }
  //   navigate(`${history[history.length - 1]}`);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [history]);

  // useEffect(() => {
  //   if (pathname !== history[history.length - 1]) {
  //     setHistory([...history, pathname]);
  //     localStorage.setItem("link", JSON.stringify(history));
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pathname]);

  return (
    <div className="DefaultLayOut">
      <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>

      <Header
        backAction={back}
        clickBack={clickBack}
        clearHistory={clearHistory}
      />

      <div className="main">{children}</div>

      <BtApp BtChange={BtChange} value={btNati} />
    </div>
  );
};

export default DefaultLayOut;
