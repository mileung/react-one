import React from 'react';
import PropTypes from 'prop-types';

const Context = React.createContext();

export class Provider extends React.Component {
  static propTypes = { initialState: PropTypes.object }

  static defaultPropTypes = { initialState: {} }

  constructor(props) {
    super(props);
    this.state = { ...props.initialState };
  }

  render() {
    return (
      <Context.Provider
        value={{
          state: this.state,
          setState: (data, callback) => this.setState(
            typeof data === 'object' ? { ...this.state, ...data } : data,
            () => typeof callback === 'function' && callback(this.state)
          )
        }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const connect = Component => props => (
  <Context.Consumer>
    {value => <Component {...props} {...value} />}
  </Context.Consumer>
)
