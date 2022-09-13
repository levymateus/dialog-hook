// eslint-disable-next-line no-use-before-define
import React, { forwardRef, FC, ReactNode } from 'react'

import { HandlerRef, Container, WrapperComponent, Props } from './types'

import Handle from './Handle'

const withHandle = (Wrapper: WrapperComponent, container: Container): ReturnType<typeof forwardRef> => {
  const Component = forwardRef<HandlerRef, Props>(({ ...props }, ref) => {
    const render = (): React.ReactNode => {
      if (typeof Wrapper === 'function') {
        return Wrapper({ ...props }) as ReactNode
      }
      const RenderComponent = Wrapper as FC<Props>
      return <RenderComponent {...props} />
    }
    const children = render()
    return (
      <Handle container={container} ref={ref}>
        {children}
      </Handle>
    )
  })

  Component.displayName = `${(Wrapper as React.FC).displayName}Wrapped`

  return Component as ReturnType<typeof forwardRef>
}

export default withHandle
