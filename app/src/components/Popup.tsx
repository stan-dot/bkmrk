


import React from 'react'
import { usePopup, usePopupDispatch } from '../contexts/PopupContext'

export default function Popup() {
  const popup = usePopup();
  return (
    <div>
      <h2 className='text-xl text-red-800'>
        Popup
      </h2>
      {popup.component}
    </div>
  )
}
