export interface ContextMenuButtonProps {
  textNode: JSX.Element;
  callback: any;
  title?: string;
  disabled?: boolean;
}

export function ContextMenuButton(
  { textNode, callback, title }: ContextMenuButtonProps,
) {
  return (
    <div>
      {title && <h2>{title}</h2>}
      <button
        onClick={callback}
        className="hover:bg-slate-500 w-36 text-slate-50 p-2 justify-start pl-4 disabled:opacity-25"
      >
        {textNode}
      </button>
    </div>
  );
}
