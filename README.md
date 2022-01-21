# react-dialog

react-dialog is a custom react hook to use a dialog easily.
<br/>

## Documentation

To use react-dialog follow the documentation.

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
import { useDialog } from 'react-dialog'

function MyComponent() {
  const confirm = useDialog({
    ok: 'ok',
	cancel: 'cancel'
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
The react-dialog listen this two buttons by then name and handles a promise about this.

Then in the root o the app, you should use the provider.

```javascript
import { DialogProvider } from 'react-dialog'

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

The great gain with this hook is the possibility to pass this promise in any part of your app!