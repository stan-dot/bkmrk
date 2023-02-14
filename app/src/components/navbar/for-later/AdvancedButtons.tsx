import React from "react";

function AdvancedButtons() {

  return <>

    <button
      id="refresh-button"
      className="text-white hover:bg-slate-400 focus:outline-none rounded-lg text-xl p-4 text-center border-red-600 cursor-pointer"
      // onClick={() => reloadWithNode([lastPathItem()])}
      disabled
    >
      &#128472; refresh
    </button>
    <button
      id="history-button"
      className="text-white hover:bg-slate-400 focus:outline-none rounded-lg text-md p-4 text-center border-red-600 cursor-pointer"
      // onClick={() => setHistoryVisible(!historyVisible)}
      // onBlur={() => setHistoryVisible(false)}
      disabled
    >
      &#11186; History
    </button>
    <button
      id="notifications-button"
      className="text-white hover:bg-slate-400 focus:outline-none rounded-lg text-md p-4 text-center border-red-600 cursor-pointer"
      onClick={() => console.log(" activated notifications button")}
      onBlur={() => console.log(" lost focus on notifications button")}
      disabled
    >
      &#128276; Notifications
    </button>
  </>;
}
