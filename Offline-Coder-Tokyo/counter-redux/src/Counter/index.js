import React from 'react';
import { connect } from 'react-redux';

const Counter = props => {
  const { reducerCount, increment, decrement } = props;

  return (
    <div style={{ textAlign: 'center' }}>
      <button onClick={increment}>+</button>
      <p>{reducerCount}</p>
      <button onClick={decrement}>-</button>
    </div>
  );
};

const mapStateToProps = ({ count }) => ({
  reducerCount: count,
});

const mapDispatchToProps = dispatch => {
  return {
    increment: () => dispatch({ type: 'INCREMENT' }),
    decrement: () => dispatch({ type: 'DECREMENT' }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Counter);
