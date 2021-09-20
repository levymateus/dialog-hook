import { useCallback, useContext, useEffect } from 'react'

import { UseConfirmProps, UseConfirmOptions, UseConfirm } from './types'

import ConfirmationContext from './context'

import observer from '../utils/Observer'

export function useConfirm (
  { ok, cancel }: UseConfirmProps,
  options: UseConfirmOptions = { close: true }
): UseConfirm {
  const context = useContext(ConfirmationContext)

  if (!context) {
    throw new Error('useConfirm needs to be inside a ConfirmationProvider')
  }

  const confirmation = useCallback(
    (data, options) => () => {
      if (options.close && context.setShow) context.setShow(false)
      observer.notify('ok', data)
    },
    [context]
  )

  const cancelation = useCallback(
    (data, options) => () => {
      if (options.close && context.setShow) context.setShow(false)
      observer.notify('cancel', data)
    },
    [context]
  )

  useEffect(() => {
    const alert = context.alertRef.current
    if (context.show && alert) {
      alert.ok('click', confirmation(ok, options))
      alert.cancel('click', cancelation(cancel, options))
    }
  }, [context, options, ok, cancel, confirmation, cancelation])

  function confirm<P = any> (props: P) {
    if (context.setShow) context.setShow(true)
    if (context.setProps) context.setProps(props)

    const onOk = new Promise(resolve => observer.subscribe('ok', resolve))

    const onCancel = new Promise((resolve, reject) =>
      observer.subscribe('cancel', reject)
    )

    return Promise.race([onOk, onCancel])
  }

  return confirm
}
