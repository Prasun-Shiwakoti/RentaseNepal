import React, { useState } from "react";

const FeeStructure = ({ feeStructure, setFeeStructure }) => {
  const [field, setField] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [singleAmount, setSingleAmount] = useState("");

  const feeOptions = [
    { value: "Admission Fee", name: "admission_price", isSingle: true },
    { value: "Single Seater", name: "single_seater_price" },
    { value: "Two Seater", name: "two_seater_price" },
    { value: "Three Seater", name: "three_seater_price" },
    { value: "Four Seater", name: "four_seater_price" },
  ];

  const selectedFee = feeOptions.find((fee) => fee.name === field);

  const handleAddFee = () => {
    if (!field.trim()) {
      alert("Please select a fee type");
      return;
    }

    const updatedFeeStructure = { ...feeStructure };

    if (selectedFee.isSingle) {
      // Handling Admission Fee (single value)
      if (!singleAmount.trim()) {
        alert("Please enter the amount for Admission Fee");
        return;
      }
      updatedFeeStructure[field] = singleAmount;
      setSingleAmount("");
    } else {
      // Handling Other Fees (min-max values)
      if (!minAmount.trim() || !maxAmount.trim() || parseInt(minAmount) > parseInt(maxAmount)) {
        alert("Invalid min-max values");
        return;
      }
      updatedFeeStructure[`${field}_min`] = minAmount;
      updatedFeeStructure[`${field}_max`] = maxAmount;
      setMinAmount("");
      setMaxAmount("");
    }

    setFeeStructure(updatedFeeStructure);
    setField("");
  };

  const deleteFee = (keyToDelete) => {
    const updatedFeeStructure = { ...feeStructure };
    if (keyToDelete === "admission_price") {
      delete updatedFeeStructure[keyToDelete];
    } else {
      delete updatedFeeStructure[`${keyToDelete}_min`];
      delete updatedFeeStructure[`${keyToDelete}_max`];
    }
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

        {selectedFee?.isSingle ? (
          <input
            type="number"
            placeholder="Amount"
            value={singleAmount}
            onChange={(e) => setSingleAmount(e.target.value)}
          />
        ) : (
          <>
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
          </>
        )}

        <button type="button" onClick={handleAddFee}>Add</button>
      </div>

      {feeOptions.map(({ name, value, isSingle }) => (
        feeStructure[name] || feeStructure[`${name}_min`] ? (
          <div key={name} className="fee-item">
            <span>{value}</span>
            {isSingle || (feeStructure[`${name}_min`] === feeStructure[`${name}_max`])? (
              <span>Rs.{feeStructure[name] || feeStructure[`${name}_min`]}</span>
            ) : (
              <span>Rs.{feeStructure[`${name}_min`]} - Rs.{feeStructure[`${name}_max`]}</span>
            )}
            <button type="button" className="delete-button" onClick={() => deleteFee(name)}>
              Delete
            </button>
          </div>
        ) : null
      ))}
    </div>
  );
};

export default FeeStructure;
