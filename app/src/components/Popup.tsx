import { usePopup } from "../contexts/PopupContext";
import EditBookmarkAlert from "./alerts/EditBookmarkAlert";
import EditFolderAlert from "./alerts/EditFolderAlert";

export default function Popup() {
  const popup = usePopup();
  console.log("current component", popup.component);
  console.log("current componentId", popup.componentId);
  return (
    <div>
      {/* {popup.component} */}
      {popup.componentId === "eba" && <EditBookmarkAlert id={popup.args} />}
      {popup.componentId === "efa" && <EditFolderAlert id={popup.args} />}
    </div>
  );
}
