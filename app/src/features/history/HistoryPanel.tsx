import React from "react";
import { BookmarkNode } from "../../lib/typesFacade";
import { useHistoryIds } from "./HistoryContext";
import { useNodesBasedOnIds } from "./hooks/useNodesBasedOnIds";

type HistoryPanelProps = {
  historyVisible: boolean;
};

export function HistoryPanel({ historyVisible }: HistoryPanelProps) {
  const historyIds = useHistoryIds();
  const historyNodes = useNodesBasedOnIds(historyIds.futureNodeIds);

  const futureNodes = useNodesBasedOnIds(historyIds.futureNodeIds);

  return (
    <div
      id="rightPanel"
      className="bg-slate-700 w-44 z-10 rounded-md shadow"
      style={{ visibility: `${historyVisible ? "visible" : "hidden"}` }}
    >
      <DisplayEvents nodes={historyNodes} tag="past" />
      <DisplayEvents nodes={futureNodes} tag="future" />
    </div>
  );
}

function DisplayEvents(
  props: { nodes: BookmarkNode[]; tag: string },
): JSX.Element {
  const empty = props.nodes.length === 0;
  if (empty) {
    return <p>no {props.tag} found</p>;
  }
  return (
    <div id={`eventsContainer-${props.tag}`}>
      {props.nodes.map((n) => <DisplayOneEvent thing={n} />)}
    </div>
  );
}

function DisplayOneEvent(
  props: { thing: BookmarkNode },
): JSX.Element {
  // todo onclick redirect. either with path imperative or window object change
  return (
    <p>
      {<a href={props.thing.url} className="link">{props.thing.title}</a>}
    </p>
  );
}
