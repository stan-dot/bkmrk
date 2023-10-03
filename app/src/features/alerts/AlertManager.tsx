import { usePopup } from "./PopupContext";
import AddNewBookmarkAlert from "./AddNewBookmarkAlert";
import AddNewFolderAlert from "./AddNewFolderAlert";
import EditBookmarkAlert from "./EditBookmarkAlert";
import EditFolderAlert from "./EditFolderAlert";
import SettingsAlert from "../settings/SettingsAlert";
import { BookmarkImportAlert } from "../import-export/components/BookmarkImportAlert";

const PopupComponents: Record<string, React.FC<any>> = {
  s: SettingsAlert,
  eba: EditBookmarkAlert,
  efa: EditFolderAlert,
  anb: AddNewBookmarkAlert,
  anf: AddNewFolderAlert,
  bi: BookmarkImportAlert
};

export default function AlertManager() {
  const popup = usePopup();
  console.debug("current componentId", popup.componentId);
  if (!popup.componentId) return;
  const Component: React.FC<any> = PopupComponents[popup.componentId];
  return <Component />;
  // return (
  //   <div>
  //     {popup.componentId === "s" && <SettingsAlert />}
  //     {popup.componentId === "eba" && <EditBookmarkAlert id={popup.args} />}
  //     {popup.componentId === "efa" && <EditFolderAlert id={popup.args} />}
  //     {popup.componentId === "anb" && (
  //       <AddNewBookmarkAlert parentId={popup.args} />
  //     )}
  //     {popup.componentId === "anf" && <AddNewFolderAlert parent={popup.args} />}
  //   </div>
  // );
}
