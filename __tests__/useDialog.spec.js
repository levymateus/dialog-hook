import React from 'react'
import { render } from '@testing-library/react'
import { DialogProvider, useDialog } from '../src/dialog-hook'
import userEvent from '@testing-library/user-event'

const Dialog = ({ message }) => {
  return <>
    <p>{message}</p>
    <button name="cancel" data-testid="cancel">Cancel</button>
    <button name="ok" data-testid="ok">Ok</button>
  </>
}

const App = ({ okCallback, cancelCallback }) => {
  const alert = useDialog({ ok: 'ok', cancel: 'cancel' })
  React.useEffect(() => {
    alert({ message: 'title' })
      .then(okCallback)
      .catch(cancelCallback)
  }, [])
  return <></>
}

const Wrapper = ({ ...props }) => {
  return <DialogProvider
    Component={({ ...props }) => <Dialog {...props} />}
  >
    <App {...props} />
  </DialogProvider>
}

describe('useDialog', () => {
  it('Should render props', async () => {
    const { getByText, getByTestId } = render(<Wrapper />)
    expect(getByText('title')).not.toBeUndefined()
    expect(getByTestId('ok')).not.toBeUndefined()
    expect(getByTestId('cancel')).not.toBeUndefined()
  })

  it('Should resolve', async () => {
    const okMock = jest.fn()
    const { getByTestId } = render(<Wrapper okCallback={okMock} />)
    await userEvent.click(getByTestId('ok'))
    expect(okMock).toHaveBeenCalledWith('ok')
  })

  it('Should reject', async () => {
    const cancelMock = jest.fn()
    const { getByTestId } = render(<Wrapper cancelCallback={cancelMock} />)
    await userEvent.click(getByTestId('cancel'))
    expect(cancelMock).toHaveBeenCalledWith('cancel')
  })
})