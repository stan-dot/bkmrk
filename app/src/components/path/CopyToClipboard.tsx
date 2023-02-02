import * as React from "react";

/**
 * Render prop component that wraps element in a Tooltip that shows "Copied to clipboard!" when the
 * copy function is invoked
 */
export function CopyToClipboard(props: { text: string, children?: React.ReactNode }) {
  const [showTooltip, setShowTooltip] = React.useState(false);

  const onCopy = (content: string) => {
    navigator.clipboard.writeText(content)
    setShowTooltip(true);
  };
  return (
    <dialog
      open={showTooltip}
      title={`${props.text}Copied to clipboard!`}
      onClose={() => setShowTooltip(false)}
    >
      <button
        onClick={() => onCopy("testing tooltip")}
      >
        Copy
      </button>
    </dialog>
  );

}
