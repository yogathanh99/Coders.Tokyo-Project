import React from 'react';
import { connect } from 'react-redux';

class Counter extends React.Component {
  increValue = () => {
    this.props.dispatch({ type: 'INCREMENT' });
  };

  decreValue = () => {
    this.props.dispatch({ type: 'DECREMENT' });
  };

  render() {
    const {
      props: { reducerCount },
      increValue,
      decreValue,
    } = this;

    return (
      <div style={{ textAlign: 'center' }}>
        <button onClick={increValue}>+</button>
        <p>{reducerCount}</p>
        <button onClick={decreValue}>-</button>
      </div>
    );
  }
}
const mapStateToProps = ({ count }) => ({
  reducerCount: count,
});

export default connect(mapStateToProps)(Counter);
