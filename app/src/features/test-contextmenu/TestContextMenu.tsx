import React, { useEffect, useState } from "react";

type DataTest = {
  id: number;
  title: string;
};
const data: DataTest[] = [
  { id: 1, title: "message1" },
  { id: 2, title: "message2" },
  { id: 3, title: "message3" },
  { id: 4, title: "message4" },
];

export function TestContextMenu() {
  return (
    <div
      id="test-context-menu"
      onContextMenu={(e) => {
        e.preventDefault();
        console.log("context click");
      }}
    >
      TestContextMenu
      <MenuContext data={data} />
    </div>
  );
}

type Points = {
  x: number;
  y: number;
};

const MenuContext = ({ data }: { data: DataTest[] }) => {
  const [points, setPoints] = useState<Points>({ x: 0, y: 0 });
  const [clicked, setClicked] = useState<boolean>(false);

  useEffect(() => {
    const handleClick = () => setClicked(false);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  });

  return (
    <div>
      {data.map((item) => (
        <div
          onContextMenu={(e) => {
            e.preventDefault();
            setClicked(true);
            setPoints({
              x: e.pageX,
              y: e.pageY,
            });
            console.log("Right Click", e.pageX, e.pageY);
          }}
        >
          <div
            className="border-1 border-solid border-yellow-300 rounded p-6 m-2"
            key={item.id}
          >
            {item.title}
          </div>
        </div>
      ))}
      {clicked && (
        <div
          id="context-menu"
          className="bg-slate-500 rounded "
          style={{
            position: "absolute",
            width: "200px",
            top: `${points.x}px`,
            left: `${points.y}px`,
          }}
        >
          <ul className="p-4 m-0 list-none">
            <li className="px-4 py-2 hover:cursor-pointer hover:bg-white">
              Edit
            </li>
            <li className="px-4 py-2 hover:cursor-pointer hover:bg-white">
              Copy
            </li>
            <li className="px-4 py-2 hover:cursor-pointer hover:bg-white">
              Delete
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
