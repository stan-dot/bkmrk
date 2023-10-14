import { BookmarkNode } from "../../../lib/typesFacade";
import { useSiblings } from "../hooks/useSiblings";
import { SiblingButton } from "./SiblingButton";

type SiblingBoxTypes = {
  siblingsVisible: boolean;
  node: BookmarkNode;
  closeCallback: () => void;
  level: number;
  openBranch: (node: BookmarkNode) => void;
};

export function SiblingBox(
  { siblingsVisible, node, closeCallback, level, openBranch }: SiblingBoxTypes,
) {
  const siblings = useSiblings(node);
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
                  level={0}
                  closeCallback={closeCallback}
                  addNodeToBranch={openBranch}
                />
              );
            })}
          </div>
        )}
    </>
  );
}
