import { usePopup } from "./PopupContext";
import AddNewBookmarkAlert from "./AddNewBookmarkAlert";
import AddNewFolderAlert from "./AddNewFolderAlert";
import EditBookmarkAlert from "./EditBookmarkAlert";
import EditFolderAlert from "./EditFolderAlert";
import SettingsAlert from "../settings/SettingsAlert";
import { BookmarkImportAlert } from "../import-export/components/BookmarkImportAlert";
import { useBookmarks } from "../../lib/GlobalReducer";
import OpenSelectedAlert from "./OpenSelectedAlert";

const PopupComponents: Record<string, React.FC<any>> = {
  s: SettingsAlert,
  eba: EditBookmarkAlert,
  efa: EditFolderAlert,
  anb: AddNewBookmarkAlert,
  anf: AddNewFolderAlert,
  bi: BookmarkImportAlert,
  os: OpenSelectedAlert,
};

export default function AlertManager() {
  const popup = usePopup();
  const { state } = useBookmarks();
  const path = state.path;
  console.debug("current componentId", popup.componentId);
  if (!popup.componentId) return <></>;
  const Component: React.FC<any> = PopupComponents[popup.componentId];
  return <Component path={path} />;
}
