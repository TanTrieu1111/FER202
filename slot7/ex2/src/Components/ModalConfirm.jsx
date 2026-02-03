import React, { useState } from 'react';

const ModalConfirm = () => {
    const [isShowModal, setIsShowModal] = useState(false);

    const handleConfirm = () => {
        alert("Duyệt đơn hàng thành công!");
        setIsShowModal(false);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h3>Ex2: Xử lý đơn hàng</h3>
            <button onClick={() => setIsShowModal(true)}>Xử lý đơn hàng</button>

            {isShowModal && (
                <div style={{ border: '1px solid black', padding: '20px', marginTop: '10px' }}>
                    <p>Bạn có chắc chắn muốn duyệt đơn hàng này để chuyển sang bộ phận kho không?</p>
                    <button onClick={handleConfirm}>Xác nhận</button>
                    <button onClick={() => setIsShowModal(false)}>Hủy</button>
                </div>
            )}
        </div>
    );
};

export default ModalConfirm;