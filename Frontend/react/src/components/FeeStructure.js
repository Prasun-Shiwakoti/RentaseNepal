import React, { useState } from "react";

const FeeStructure = ({ feeStructure, setFeeStructure }) => {
  const [field, setField] = useState("");
  const [amount, setAmount] = useState("");

  const handleAddFee = () => {
    const updatedFeeStructure = { ...feeStructure, [field]: amount };
    setFeeStructure(updatedFeeStructure);
    setField("");
    setAmount("");
  };

  return (
    <div className="fee-structure-grid">
      <div className="input-row">
        <input
          type="text"
          placeholder="Fee Type (e.g., Monthly Rent)"
          value={field}
          onChange={(e) => setField(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={handleAddFee}>Add</button>
      </div>
      {Object.entries(feeStructure).map(([key, value]) => (
        <div key={key} className="fee-item">
          <span>{key}</span>
          <span>₹{value}</span>
        </div>
      ))}
    </div>
  );
};

export default FeeStructure;
