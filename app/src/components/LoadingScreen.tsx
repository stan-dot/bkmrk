import React from "react";

export function LoadingScreen(props: { loading: boolean; }) {
  return <div id="loadingStatus"
    className={"flex flex-grow h-full fixed top-28 w-full p-4 content-center text-center  bg-slate-800 text-slate-50"}
    style={{
      visibility: `${props.loading ? "visible" : "hidden"}`,
    }}
  >
    <p className="text-3xl text-slate-50 bg-slate-900 p-4 ">Loading...</p>
  </div>
}
