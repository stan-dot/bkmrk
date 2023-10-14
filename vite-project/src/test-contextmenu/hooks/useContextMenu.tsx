import { useEffect, useState } from "react";
export type Points = {
  x: number;
  y: number;
};

const initPoints = {
  x: 0,
  y: 0,
};
const useContextMenu = () => {
  const [clicked, setClicked] = useState(false);
  const [points, setPoints] = useState(initPoints);
  useEffect(() => {
    const handleClick = () => setClicked(false);
    document.addEventListener("contextmenu", handleClick);
    return () => {
      document.removeEventListener("contextmenu", handleClick);
    };
  }, []);
  return {
    clicked,
    setClicked,
    points,
    setPoints,
  };
};
export default useContextMenu;
