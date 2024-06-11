import "./mode.css";
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { themeActions } from "../store/theme";

import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import DoneIcon from "@mui/icons-material/Done";

import ContrastIcon from "@mui/icons-material/Contrast";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const icons = [<LightModeIcon />, <DarkModeIcon />, <ContrastIcon />];

const Mode = () => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [iconIndex, setIcon] = useState(0);

  const handleModeChange = useCallback((mode) => {
    let index;
    if (mode === "light") {
      index = 0;
    } else if (mode === "dark") {
      index = 1;
    } else {
      index = 2;
    }
    setIcon(index);
    dispatch(themeActions.setMode(mode));
    setIsVisible(false);
  }, [dispatch]);

  const handleDropdown = useCallback(() => {
    setIsVisible((prevVisible) => !prevVisible);
  }, []);

  const fetchSystemMode = useCallback(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    } else {
      return "light";
    }
  }, []);

  useEffect(() => {
    const mode = fetchSystemMode();
    handleModeChange(mode);
  }, [fetchSystemMode, handleModeChange]);

  return (
    <div className="theme">
      <ul className="dropdown" style={{ display: isVisible ? "block" : "none" }}>
        <li className="modeItem" onClick={() => handleModeChange("light")}>
          <LightModeIcon />
          Light
          <DoneIcon style={{ color: iconIndex === 0 ? "inherit" : "transparent" }} />
        </li>
        <li className="modeItem" onClick={() => handleModeChange("dark")}>
          <DarkModeIcon />
          Dark
          <DoneIcon style={{ color: iconIndex === 1 ? "inherit" : "transparent" }} />
        </li>
        <li className="modeItem" onClick={() => handleModeChange("auto")}>
          <ContrastIcon />
          Auto
          <DoneIcon style={{ color: iconIndex === 2 ? "inherit" : "transparent" }} />
        </li>
      </ul>
      <div className="modeBtn">
        <button onClick={handleDropdown}>
          {icons[iconIndex]}
          <ArrowDropUpIcon />
        </button>
      </div>
    </div>
  );
};

export default Mode;
