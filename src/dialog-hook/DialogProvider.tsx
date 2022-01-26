// eslint-disable-next-line no-use-before-define
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'

import { HandlerRef, DialogProviderProps } from './types'

import withHandle from './withHandle'

import DialogContext from './context'

/**
 * Provider
 */
export const DialogProvider = ({
  parent,
  children,
  Component
}: DialogProviderProps) => {
  const [show, setShow] = useState(false)
  const [props, setProps] = useState<unknown>()
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

  const setPropsFn = useCallback((props: any) => setProps(props), [])

  const container = containerRef.current
  const RenderComponent = withHandle(Component, containerRef)

  useEffect(() => () => container?.remove(), [container])

  return (
    <DialogContext.Provider
      value={{
        show,
        setShow: setShowFn,
        setProps: setPropsFn,
        alertRef
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
