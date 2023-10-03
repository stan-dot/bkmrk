import React, { useState } from "react";
import { useHistory } from "../../../contexts/HistoryContext";

type HistoryPanelProps = {
  historyVisible: boolean;
};

export function HistoryPanel({ historyVisible }: HistoryPanelProps) {
  const history = useHistory();

  const [fullHistory, setFullHistory] = useState<
    BookmarkNode[]
  >([]);

  Promise.all(history.pastNodeIds.map((id) => {
    return chrome.bookmarks.get(id);
  })).then((all) => {
    const flat: BookmarkNode[] = all.flat();
    setFullHistory(flat);
  });

  const [fullFuture, setFullFuture] = useState<
    BookmarkNode[]
  >([]);

  Promise.all(history.futureNodeIds.map((id) => {
    return chrome.bookmarks.get(id);
  })).then((all) => {
    const flat: BookmarkNode[] = all.flat();
    setFullFuture(flat);
  });

  return (
    <div
      id="rightPanel"
      className="bg-slate-700 w-44 z-10 rounded-md shadow"
      style={{ visibility: `${historyVisible ? "visible" : "hidden"}` }}
    >
      <DisplayEvents nodes={fullHistory} tag="past" />
      <DisplayEvents nodes={fullFuture} tag="future" />
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

function DisplayEvents(
  props: { nodes: BookmarkNode[]; tag: string },
): JSX.Element {
  const empty = props.nodes.length === 0;
  if (empty) {
    return <p>no {tag} found</p>;
  }

  return (
    <div id={`eventsContainer-${props.tag}`}>
      {props.nodes.map((n) => <DisplayOneEvent thing={n} />)}
    </div>
  );
}
