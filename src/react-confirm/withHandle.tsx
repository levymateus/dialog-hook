// eslint-disable-next-line no-use-before-define
import React, { forwardRef, ForwardRefRenderFunction, FC, ReactNode } from 'react'

import { HandlerRef, Container, WrapperComponent } from './types'

import Handle from './Handle'

const withHandle = (Wrapper: WrapperComponent, container: Container) => {
  const Component: ForwardRefRenderFunction<HandlerRef, any> = (
    { ...props },
    ref
  ) => {
    const render = (): ReactNode => {
      if (typeof Wrapper === 'function') {
        return Wrapper({ ...props }) as ReactNode
      }
      const RenderComponent = Wrapper as FC<any>
      return <RenderComponent {...props} />
    }
    const children = render()
    return (
      <Handle container={container} ref={ref}>
        {children}
      </Handle>
    )
  }
  return forwardRef(Component)
}

export default withHandle
