import React, { useState } from "react";

const FeeStructure = ({ feeStructure, setFeeStructure }) => {
  const [field, setField] = useState("");
  const [amount, setAmount] = useState("");

  const feeOptions = [
    "Admission Fee",
    "Single Seater",
    "Two Seater",
    "Three Seater",
    "Four Seater",
  ];

  const handleAddFee = () => {
    if (field.trim() && amount.trim()) {
      const updatedFeeStructure = { ...feeStructure, [field]: amount };
      setFeeStructure(updatedFeeStructure);
      setField("");
      setAmount("");
    }
  };

  const deleteFee = (keyToDelete) => {
    const updatedFeeStructure = { ...feeStructure };
    delete updatedFeeStructure[keyToDelete];
    setFeeStructure(updatedFeeStructure);
  };

  return (
    <div className="fee-structure-grid">
      <div className="input-row">
        {/* <input
          type="text"
          placeholder="Fee Type (e.g., Monthly Rent)"
          value={field}
          onChange={(e) => setField(e.target.value)}
        /> */}
        <select
          value={field}
          onChange={(e) => setField(e.target.value)}
        >
          <option value="">Select Fee Type</option>
          {feeOptions.map((feeType, index) => (
            <option key={index} value={feeType}>
              {feeType}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type ="button" onClick={handleAddFee}>Add</button>
      </div>
      {Object.entries(feeStructure).map(([key, value]) => (
        <div key={key} className="fee-item">
          <span>{key}</span>
          <span>Rs.{value}</span>
          <button
            type="button"
            className="delete-button"
            onClick={() => deleteFee(key)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default FeeStructure;
