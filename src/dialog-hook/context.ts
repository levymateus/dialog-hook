import { createContext } from 'react'
import { Observer } from 'src/utils/Observer'

import { DialogContextProps, Data } from './types'

export const observer = new Observer<Data>()

const setShow = () => null

const setProps = () => null

const DialogContext = createContext<DialogContextProps>({
  show: false,
  setShow: setShow,
  setProps: setProps,
  alertRef: { current: null },
  observer: observer
})

export default DialogContext
