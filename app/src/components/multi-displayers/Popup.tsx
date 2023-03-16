import { usePopup } from "../../contexts/PopupContext";
import AddNewBookmarkAlert from "../alerts/AddNewBookmarkAlert";
import AddNewFolderAlert from "../alerts/AddNewFolderAlert";
import EditBookmarkAlert from "../alerts/EditBookmarkAlert";
import EditFolderAlert from "../alerts/EditFolderAlert";

export default function Popup() {
  const popup = usePopup();
  console.log("current component", popup.component);
  console.log("current componentId", popup.componentId);
  return (
    <div>
      {/* {popup.component} */}
      {popup.componentId === "eba" && <EditBookmarkAlert id={popup.args} />}
      {popup.componentId === "efa" && <EditFolderAlert id={popup.args} />}
      {popup.componentId === "anb" && (
        <AddNewBookmarkAlert
          parentId={popup.args}
        />
      )}
      {popup.componentId === "anf" && (
        <AddNewFolderAlert
          id={popup.args}
          closeCallback={function (): void {
            throw new Error("Function not implemented.");
          }}
          visible={false}
        />
      )}
    </div>
  );
}
