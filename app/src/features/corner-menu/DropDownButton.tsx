const activeLinkClass: string =
  "block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white";

const disabledLink: string = "block px-4 py-2 w-full text-left";

export type DropdownMenuButtonProps = {
  textNode: JSX.Element;
  callback: any;
  disabled?: boolean;
};
export function DropDownButton(
  { textNode, callback, disabled }: DropdownMenuButtonProps,
): JSX.Element {
  return (
    <li>
      <button
        className={disabled ? disabledLink : activeLinkClass}
        onClick={(v) => callback()}
      >
        {textNode}
      </button>
    </li>
  );
}
