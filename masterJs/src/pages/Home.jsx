import React, { useState, useRef } from "react";

export default function ControlledVsUncontrolled() {
  // Controlled state
  const [controlledValue, setControlledValue] = useState("");

  // Ref for uncontrolled input
  const uncontrolledRef = useRef(null);

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const uncontrolledValue = uncontrolledRef.current.value;
    alert(`Controlled: ${controlledValue}\nUncontrolled: ${uncontrolledValue}`);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Controlled vs Uncontrolled Example</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Controlled Input */}
        <div>
          <label className="block text-sm font-medium">Controlled Input:</label>
          <input
            type="text"
            value={controlledValue}
            onChange={(e) => setControlledValue(e.target.value)}
            className="border px-3 py-2 w-full rounded"
          />
        </div>

        {/* Uncontrolled Input */}
        <div>
          <label className="block text-sm font-medium">Uncontrolled Input:</label>
          <input
            type="text"
            ref={uncontrolledRef}
            className="border px-3 py-2 w-full rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
