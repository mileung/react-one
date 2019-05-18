
# react-one
A single store, single action, global state management system for React apps.

## installation

`npm install react-one --save`

or

`yarn add react-one`

## Usage
```js
import { Provider, connect } from 'react-one';
```
Wrap the root of your app with the `Provider` component and pass it an `initialState` object.
```js
const INITIAL_STATE = { num: 0 };
...
render() {
  return (
    <Provider
      initialState={INITIAL_STATE}
      onSetState={newState => console.log('newState', newState)}
      >
      <App />
    </Provider>
  );
}
````

Connect any of your app's child components to the global store with the `connect` higher order component. Any connected component will have `state` and `setState` passed as props. Treat them as a global `this.state` and `this.setState`. This means you can call `setState` in one component and have that update reflected in another connected component without prop drilling or callbacks. This also means the global state will persist even when a connected component is unmounted.

```js
class Example extends React.Component {
  render() {
    let { state, setState } = this.props;
    return (
      <>
      	<button onClick={() => setState({ num: Math.random() })} />
      	<h1>{state.num}</h1>
      </>
    );
  }
}

export default connect(Example);
```

If you want to call multiple `setState`s that rely on the previous state in the same block of code, you will probably have to use a callback or functional `setState` because `setState`, like `this.setState`, updates state asynchronously.

```js
// this one line is equivalent
setState({ num: state.num + 1 }, newState => setState({ num: newState.num + 1 })); // state.num = 2
// to these two
setState(prevState => ({ num: prevState.num + 1 }));
setState(prevState => ({ num: prevState.num + 1 }));  // state.num = 2

// this won't work
setState({ num: state.num + 1 });
setState({ num: state.num + 1 }); // state.num = 1

// this is an exception
setState({ num: ++state.num });
setState({ num: ++state.num }); // state.num = 2
```

## Example

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-one';

const INITIAL_STATE = { num: 0 };

class App extends React.Component {
  render() {
    return (
      <Provider
        initialState={INITIAL_STATE}
        onSetState={newState => console.log('newState', newState)}
        >
        <div>
          <Buttons />
          <Num />
        </div>
      </Provider>
    );
  }
}

class Buttons extends React.Component {
  render() {
    let { state, setState } = this.props;
    return (
      <div>
        <button onClick={() => setState({ num: ++state.num })}>+</button>
        <button onClick={() => setState({ num: --state.num })}>-</button>
      </div>
    );
  }
}

Buttons = connect(Buttons); // if this were in another file, export default connect(Buttons)

class Num extends React.Component {
  render() {
    let { state } = this.props;
    return <h1>{state.num}</h1>;
  }
}

Num = connect(Num); // if this were in another file, export default connect(Num)

ReactDOM.render(<App />, document.getElementById('root'));
```

## Running the example

`git clone https://github.com/MiLeung/react-one.git`

`cd react-one`

`npm i`

`npm start`

Then in another window

`cd react-one/example`

`npm i`

`npm start`