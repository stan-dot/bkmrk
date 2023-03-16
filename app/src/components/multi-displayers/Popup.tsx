import { usePopup } from "../../contexts/PopupContext";
import AddNewBookmarkAlert from "../alerts/AddNewBookmarkAlert";
import AddNewFolderAlert from "../alerts/AddNewFolderAlert";
import EditBookmarkAlert from "../alerts/EditBookmarkAlert";
import EditFolderAlert from "../alerts/EditFolderAlert";
import SettingsAlert from "../alerts/settings_stuff/SettingsAlert";

export default function Popup() {
  const popup = usePopup();
  console.log("current componentId", popup.componentId);
  return (
    <div>
      {popup.componentId === "s" && <SettingsAlert />}
      {/* {popup.component} */}
      {popup.componentId === "eba" && <EditBookmarkAlert id={popup.args} />}
      {popup.componentId === "efa" && <EditFolderAlert id={popup.args} />}
      {popup.componentId === "anb" && (
        <AddNewBookmarkAlert parentId={popup.args} />
      )}
      {popup.componentId === "anf" && <AddNewFolderAlert parent={popup.args} />}
    </div>
  );
}
