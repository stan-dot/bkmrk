export function MainContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      id="mainContainer"
      className=" overflow-auto drop-shadow m-2 p-2 flex flex-col rounded-md"
    >
      {children}
    </div>
  );
}
