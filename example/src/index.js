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
