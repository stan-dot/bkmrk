import React from "react";
import useContextMenu from "./hooks/useContextMenu";

const defaultData: DataTest[] = [
  { id: 1, title: "message1" },
  { id: 2, title: "message2" },
  { id: 3, title: "message3" },
  { id: 4, title: "message4" },
];

type DataTest = {
  id: number;
  title: string;
};

function MenuContextHook(data: DataTest[] = defaultData) {
  const { clicked, setClicked, points, setPoints } = useContextMenu();
  return (
    <div>
      {data.map((item) => (
        <ContextMenuItem
          item={item}
          setClicked={setClicked}
          setPoints={setPoints}
        />
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
          <ul>
            <li>Edit</li>
            <li>Copy</li>
            <li>Delete</li>
          </ul>
        </div>
      )}
    </div>
  );
}
export default MenuContextHook;

interface MenuContextItemProps {
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setPoints: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    }>
  >;
  item: DataTest;
}

function ContextMenuItem(
  { setClicked, setPoints, item }: MenuContextItemProps,
) {
  return (
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
  );
}
