import { useReducer } from "react";

const initialState = {
  isShowModal: false,
  isConfirmed: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "OPEN_MODAL":
      return { ...state, isShowModal: true };

    case "CLOSE_MODAL":
      return { ...state, isShowModal: false };

    case "CONFIRM_ORDER":
      return { isShowModal: false, isConfirmed: true };

    default:
      return state;
  }
}

export default function OrderModal() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div style={{ padding: "20px" }}>
      <h3>Ex2: Xử lý đơn hàng</h3>

      <button onClick={() => dispatch({ type: "OPEN_MODAL" })}>
        Xử lý đơn hàng
      </button>

      {state.isShowModal && (
        <div
          style={{
            border: "1px solid black",
            padding: "20px",
            marginTop: "10px",
          }}
        >
          <p>
            Bạn có chắc chắn muốn duyệt đơn hàng này để chuyển sang bộ phận kho
            không?
          </p>

          <button onClick={() => dispatch({ type: "CONFIRM_ORDER" })}>
            Xác nhận
          </button>

          <button onClick={() => dispatch({ type: "CLOSE_MODAL" })}>
            Hủy
          </button>
        </div>
      )}

      {state.isConfirmed && <p>Duyệt đơn hàng thành công!</p>}
    </div>
  );
}

