import { useReducer } from "react";

const initialState = {
  name: "",
  price: "",
  category: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.field]: action.value,
      };

    case "RESET_FORM":
      return initialState;

    default:
      return state;
  }
}

export default function ProductForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div style={{ padding: "20px" }}>
      <h3>Ex3: Quản lý sản phẩm</h3>

      <input
        placeholder="Tên sản phẩm"
        value={state.name}
        onChange={(e) =>
          dispatch({
            type: "CHANGE_INPUT",
            field: "name",
            value: e.target.value,
          })
        }
      />

      <br />

      <input
        placeholder="Giá"
        value={state.price}
        onChange={(e) =>
          dispatch({
            type: "CHANGE_INPUT",
            field: "price",
            value: e.target.value,
          })
        }
      />

      <br />

      <input
        placeholder="Danh mục"
        value={state.category}
        onChange={(e) =>
          dispatch({
            type: "CHANGE_INPUT",
            field: "category",
            value: e.target.value,
          })
        }
      />

      <br />
      <br />

      <button onClick={() => dispatch({ type: "RESET_FORM" })}>
        Reset
      </button>

      {/* HIỂN THỊ OBJECT STATE */}
      <div style={{ marginTop: "15px", border: "1px solid gray", padding: "10px" }}>
        <p><b>Thông tin sản phẩm:</b></p>
        <p>Name: {state.name}</p>
        <p>Price: {state.price}</p>
        <p>Category: {state.category}</p>
      </div>
    </div>
  );
}
