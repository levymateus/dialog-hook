// eslint-disable-next-line no-use-before-define
import React, { forwardRef, useCallback, useImperativeHandle } from 'react'

import { HandlerComponentProps, HandlerRef } from './types'

const Handle = forwardRef<HandlerRef, HandlerComponentProps>(
  ({ children, container }: HandlerComponentProps, ref) => {
    const getByName = useCallback(
      (target: HTMLElement, name: string): HTMLElement => {
        const el = target.getElementsByTagName('BUTTON').namedItem(name)
        const errorMessage = `Button with no name='${name}' was found`
        if (el) return el as HTMLElement
        throw new Error(errorMessage)
      },
      []
    )

    useImperativeHandle(
      ref,
      () => ({
        ok: (event, callback, name = 'ok') => {
          const target = container.current
          if (target) getByName(target, name).addEventListener(event, callback)
        },
        cancel: (event, callback, name = 'cancel') => {
          const target = container.current
          if (target) getByName(target, name).addEventListener(event, callback)
        }
      }),
      [container, getByName]
    )

    return <>{children}</>
  }
)

Handle.displayName = 'Handle'

export default Handle
