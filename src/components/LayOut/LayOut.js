import React, { useEffect, useState } from "react";
import "./layout.css";
import { useNavigate } from "react-router-dom";

import BtApp from "./BtApp/BtApp";
import Header from "./Header/Header";

const DefaultLayOut = ({ children }) => {
  const navigate = useNavigate();

  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("link")) || ["/"]
  );

  const [pathname, setPathname] = useState(window.location.pathname);

  const BtChange = (newValue) => {
    if (newValue !== history[history.length - 1])
      setHistory([...history, newValue]);
  };

  const [back, setBack] = useState(false);

  const clickBack = () => {
    let hist = [...history];

    if (hist.length > 1) {
      hist.pop();
      setHistory(hist);
    }
  };

  const clearHistory = () => {
    setHistory(["/"]);
  };

  useEffect(() => {
    localStorage.setItem("link", JSON.stringify(history));

    setBack(false);
    if (history.length > 1) {
      setBack(true);
    }
    navigate(`${history[history.length - 1]}`);
  }, [history]);

  useEffect(() => {
    if (pathname !== history[history.length - 1]) {
      setHistory([...history, pathname]);
      localStorage.setItem("link", JSON.stringify(history));
    }
  }, [pathname]);

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
        value={"/" + history[history.length - 1].split("/")[1]}
      />
    </div>
  );
};

export default DefaultLayOut;
