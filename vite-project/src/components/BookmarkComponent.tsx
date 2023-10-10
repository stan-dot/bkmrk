import React, { useState } from "react";
import { useBookmarkChange } from "../lib/hooks/useBookmarkChange";

export const BookmarkComponent = () => {
  const [log, setLog] = useState<string[]>([]);

  const callback = (eventType: string, id: string, info: string) => {
    setLog(
      (prev) => [
        ...prev,
        `Bookmark ${id} ${eventType}: ${JSON.stringify(info)}`,
      ],
    );
  };

  useBookmarkChange(callback);

  return (
    <div>
      <h1>Bookmark Changes</h1>
      {log.map((entry, index) => <p key={index}>{entry}</p>)}
    </div>
  );
};
