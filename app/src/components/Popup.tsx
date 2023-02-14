


import { usePopup } from '../contexts/PopupContext';

export default function Popup() {
  const popup = usePopup();
  console.log('current component', popup.component)
  return (
    <div>
      <h2 className='text-xl text-red-800'>
        Popup
      </h2>
      {popup.component}
    </div>
  )
}
