# dialog-hook

The dialog-hook is a custom react hook to use a dialog easily.
<br/>

First of all it is necessary to install the package in your project some command lines.

If you using npm
```
npm i dialog-hook
```

If you using yarn
```
yarn add dialog-hook
```

## Documentation

To use dialog-hook follow the documentation.

### **useDialog**

Returns a `Promise` that resolves when ok button was selected and rejects when cancel is selected.<br/>

```typescript
function useDialog(props: UseDialogProps, options: UseDialogOptions)
```

```typescript
export type UseDialogProps = {

  // The data returned on promise resolves
  ok?: unknown | null;

  // The data returned on promise rejects
  cancel?: unknown | null;

};

```

```typescript
export type UseDialogOptions = {

  // If this value is `true` the dialog close after button click
  close?: boolean;

};

```

### Code examples

Take this simple example o use:

```javascript
import { useDialog } from 'dialog-hook'

function MyComponent() {
  const confirm = useDialog({
    ok: 'ok', cancel: 'cancel'
  })

  function handleClick () {
    confirm({ message: 'Are you ok?' })
	  .then(console.log)
    .catch(console.log)
  }

  return <button onClick={handleClick}>
    click here
  </button>
}
```
On you custom dialog component you need to add two buttons with name 'cancel' and 'ok'.
The dialog-hook listen this two buttons by then name and handles a promise about this.

Then in the root o the app, you should use the provider.

```javascript
import { DialogProvider } from 'dialog-hook'

function MyDialog({ message }) {
  return <>
	<p>{message}</p>
	<button name="cancel">Cancel</button>
	<button name="ok" variant="primary">Ok</button>
  </>
}

function App() {
  return <DialogProvider
    Component={({ ...props }) => <MyDialog {...props} />}>
      <App />
  </DialogProvider>
}
```

Take this example live in CodeSandbox: https://codesandbox.io/s/dialog-hook-example-1-c71uk

The great gain with this hook is the possibility to pass this promise in any part of your app!