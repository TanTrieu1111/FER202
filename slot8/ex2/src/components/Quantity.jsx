import React, { useReducer } from "react";

const initialState = {count: 0,};

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };

    case "DECREMENT":
      return { count: Math.max(0, state.count - 1) };

    default:
      return state;
  }
}

const CapNhatSoLuong = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div style={{ padding: "20px" }}>
      <h3>Ex1: Cập nhật số lượng</h3>

      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>

      <input
        type="number"
        value={state.count}
        readOnly
        style={{ width: "50px", textAlign: "center" }}
      />

      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
    </div>
  );
};

export default CapNhatSoLuong;
