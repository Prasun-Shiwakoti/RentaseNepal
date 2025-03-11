import React, { useState } from "react";

const FeeStructure = ({ feeStructure, setFeeStructure }) => {
  const [field, setField] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  const feeOptions = [
    { value: "Admission Fee", name: "admission_price" },
    { value: "Single Seater", name: "single_seater_price" },
    { value: "Two Seater", name: "two_seater_price" },
    { value: "Three Seater", name: "three_seater_price" },
    { value: "Four Seater", name: "four_seater_price" },
  ];

  const handleAddFee = () => {
    if (field.trim() && minAmount.trim() && maxAmount.trim() && parseInt(minAmount)<=parseInt(maxAmount)) {
      const updatedFeeStructure = {
        ...feeStructure,
        [`${field}_min`]: minAmount,
        [`${field}_max`]: maxAmount,
      };
      setFeeStructure(updatedFeeStructure);
      setField("");
      setMinAmount("");
      setMaxAmount("");
    }
    else{
      alert('Invalid input');
    }
  };

  const deleteFee = (keyToDelete) => {
    const updatedFeeStructure = { ...feeStructure };
    delete updatedFeeStructure[`${keyToDelete}_min`];
    delete updatedFeeStructure[`${keyToDelete}_max`];
    setFeeStructure(updatedFeeStructure);
  };

  return (
    <div className="fee-structure-grid">
      <div className="input-row">
        <select value={field} onChange={(e) => setField(e.target.value)}>
          <option value="">Select Fee Type</option>
          {feeOptions.map((feeType, index) => (
            <option key={index} value={feeType.name}>
              {feeType.value}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Min"
          value={minAmount}
          onChange={(e) => setMinAmount(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max"
          value={maxAmount}
          onChange={(e) => setMaxAmount(e.target.value)}
        />
        <button type="button" onClick={handleAddFee}>Add</button>
      </div>
      {feeOptions.map(({ name, value }) => (
        feeStructure[`${name}_min`] && feeStructure[`${name}_max`] ? (
          <div key={name} className="fee-item">
            <span>{value}</span>
            {(feeStructure[`${name}_min`] !== feeStructure[`${name}_max`]) ? (
            <span>Rs.{feeStructure[`${name}_min`]} - Rs.{feeStructure[`${name}_max`]}</span>
            ) : (
            <span>Rs.{feeStructure[`${name}_min`]}</span>
            )}
            <button
              type="button"
              className="delete-button"
              onClick={() => deleteFee(name)}
            >
              Delete
            </button>
          </div>
        ) : null
      ))}
    </div>
  );
};

export default FeeStructure;
