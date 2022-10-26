export function CloseSection(props: { closeCallback: () => void; }) {
  return <div className="group4">
    <button onClick={() => props.closeCallback()}>
      Close
    </button>
  </div>;
}
