import { createContext } from 'react'

import { ConfirmationContextProps } from './types'

const ConfirmationContext = createContext<ConfirmationContextProps>({
  show: false,
  setShow: undefined,
  setProps: undefined,
  alertRef: { current: null }
})

export default ConfirmationContext
