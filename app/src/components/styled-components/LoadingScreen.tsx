import { ColorRing } from "react-loader-spinner";

export function LoadingScreen(props: { loading: boolean }) {
  return (
    <div
      id="loadingStatus"
      className={"flex h-full fixed top-28 w-full  flex-col justify-center bg-slate-800 text-slate-50"}
      style={{
        visibility: `${props.loading ? "visible" : "hidden"}`,
      }}
    >
      <div
        id="loadingBox"
        className=" absolute top-20 left-20 border-1 border-solid border-cyan-600"
      >
        <p className="text-3xl text-slate-50  p-4 ">Loading...</p>
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#fff", "#0891b2", "#475569", "#fff", "#0891b2"]}
        />
      </div>
    </div>
  );
}
