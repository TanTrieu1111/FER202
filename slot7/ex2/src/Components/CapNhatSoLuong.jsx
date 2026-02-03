import React, { useState } from 'react';

const CapNhatSoLuong = () => {
    const [quantity, setQuantity] = useState(0);

    return (
        <div style={{ padding: '20px' }}>
            <h3>Ex1: Cập nhật số lượng</h3>
            <button onClick={() => setQuantity(Math.max(0, quantity - 1))}>-</button>
            <input 
                type="number" 
                value={quantity} 
                readOnly 
                style={{ width: '50px', textAlign: 'center' }} 
            />
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>
    );
};

export default CapNhatSoLuong;