import { useState } from "react";

function TestUseState() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Test useState</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}

export default TestUseState;
