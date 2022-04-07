import React, { useEffect , useState } from "react";
import "./Header.css";
import HeaderInDesktopView from "./HeaderInDesktopView";
import HeaderInMobileView from "./HeaderInMobileView";
const Header = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 670;
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
  return width < breakpoint ? <HeaderInMobileView /> : <HeaderInDesktopView />;
};

export default Header;
