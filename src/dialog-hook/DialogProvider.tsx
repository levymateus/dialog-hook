// eslint-disable-next-line no-use-before-define
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'

import { HandlerRef, DialogProviderProps, Props } from './types'

import withHandle from './withHandle'

import DialogContext, { observer } from './context'

/**
 * Provider
 */
export const DialogProvider = ({
  parent,
  children,
  Component
}: DialogProviderProps): React.ReactNode => {
  const [show, setShow] = useState(false)
  const [props, setProps] = useState<Props>()
  const containerRef = useRef<HTMLElement | null>(null)
  const alertRef = useRef<HandlerRef>(null)

  const setShowFn = useCallback(
    (value: boolean) => {
      setShow(value)

      if (value) {
        if (!containerRef.current) {
          const divElement = document.createElement('div')
          containerRef.current = divElement
        }

        if (parent) parent.appendChild(containerRef.current)
        else document.body.appendChild(containerRef.current)
      }

      if (!value && containerRef.current) {
        (containerRef.current as HTMLElement).remove()
        containerRef.current = null
      }
    },
    [setShow, parent]
  )

  const setPropsFn = useCallback((props: Props) => setProps(props), [])

  const container = containerRef.current
  const RenderComponent = withHandle(Component, containerRef)

  useEffect(() => () => container?.remove(), [container])

  return (
    <DialogContext.Provider
      value={{
        show,
        setShow: setShowFn,
        setProps: setPropsFn,
        alertRef,
        observer
      }}
    >
      {container &&
        ReactDOM.createPortal(
          show && <RenderComponent ref={alertRef} {...props} />,
          container
        )}
      {children}
    </DialogContext.Provider>
  )
}
