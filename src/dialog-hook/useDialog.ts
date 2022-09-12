import { useCallback, useContext, useEffect } from 'react'

import { UseDialogProps, UseDialogOptions, UseDialog, Props, Options, Data } from './types'

import DialogContext from './context'

export function useDialog (
  { ok, cancel }: UseDialogProps,
  options: UseDialogOptions = { close: true }
): UseDialog {
  const context = useContext(DialogContext)

  if (!context) {
    throw new Error('useConfirm needs to be inside a ConfirmationProvider')
  }

  const { setProps, setShow, observer, alertRef, show } = context

  const confirmation = useCallback(
    (data: Data, options: Options) => () => {
      if (options.close) setShow(false)
      observer.notify('ok', data)
    },
    [setShow, observer]
  )

  const cancelation = useCallback(
    (data: Data, options: Options) => () => {
      if (options.close) setShow(false)
      observer.notify('cancel', data)
    },
    [setShow, observer]
  )

  useEffect(() => {
    const alert = alertRef.current
    if (show && alert) {
      alert.ok('click', confirmation(ok, options))
      alert.cancel('click', cancelation(cancel, options))
    }
  }, [alertRef, show, options, ok, cancel, confirmation, cancelation])

  const confirm: UseDialog = (props) => {
    setShow(true)
    setProps(props as unknown as Props)

    const onOk = new Promise<Data>((resolve) => observer.subscribe('ok', resolve))

    const onCancel = new Promise<Data>((resolve, reject) =>
      observer.subscribe('cancel', reject)
    )

    return Promise.race([onOk, onCancel])
  }

  return confirm
}
