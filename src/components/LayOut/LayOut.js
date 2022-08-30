import React, { useEffect, useState } from "react";
import "./layout.css";
import { useNavigate, useLocation } from "react-router-dom";

import BtApp from "./BtApp/BtApp";
import Header from "./Header/Header";

const DefaultLayOut = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("link")) || ["/"]
  );

  const BtChange = (newValue) => {
    if (newValue !== history[history.length - 1]) navigate(newValue);
  };

  // eslint-disable-next-line no-unused-vars
  const [back, setBack] = useState(false);

  const clickBack = () => {
    navigate(history[history.length - 2]);
    let hist = [...history];

    hist.splice(hist.length - 1, 1);
    setHistory(hist);
  };

  const clearHistory = () => {
    setHistory(["/"]);
    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (location.pathname !== history[history.length - 1])
      setHistory([...history, location.pathname]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem("link", JSON.stringify(history));
    setBack(false);
    if (history.length > 1) setBack(true);
  }, [history]);

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

      <BtApp
        BtChange={BtChange}
        value={"/" + history.slice(-1)[0].split("/")[1]}
      />
    </div>
  );
};

export default DefaultLayOut;
