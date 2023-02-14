
import { usePopup } from '../contexts/PopupContext';
import EditBookmarkAlert from './alerts/EditBookmarkAlert';

export default function Popup() {
  const popup = usePopup();
  console.log('current component', popup.component)
  console.log('current componentId', popup.componentId)
  return (
    <div>
      <h2 className='text-xl text-red-800'>
        Popup
      </h2>
      {popup.component}
      {
        popup.componentId === 'eba' ?? <EditBookmarkAlert id={popup.args} />
      }
    </div>
  )
}
