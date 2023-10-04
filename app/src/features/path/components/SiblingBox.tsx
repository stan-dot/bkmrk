import { BookmarkNode } from "../../../lib/typesFacade";
import { useHistoryIdsDispatch } from "../../history/HistoryContext";
import { usePathDispatch } from "../PathContext";
import { useSiblings } from "../hooks/useSiblings";
import { SiblingButton } from "./SiblingButton";

type SiblingBoxTypes = {
  siblingsVisible: boolean;
  node: BookmarkNode;
  closeCallback: () => void;
  level: number;
};

export function SiblingBox(
  { siblingsVisible, node, closeCallback, level }: SiblingBoxTypes,
) {
  const siblings = useSiblings(node);
  const historyDispatch = useHistoryIdsDispatch();
  const pathDispatch = usePathDispatch();
  return (
    <>
      {siblingsVisible &&
        (
          <div
            id="siblings"
            className="absolute w-40 h-40 mb-2 flex flex-col  bg-slate-700 text-slate-50 z-50 "
          >
            {siblings.map((s) => {
              return (
                <SiblingButton
                  s={s}
                  node={node}
                  pathDispatch={pathDispatch}
                  level={0}
                  historyDispatch={historyDispatch}
                  closeCallback={closeCallback}
                />
              );
            })}
          </div>
        )}
    </>
  );
}
