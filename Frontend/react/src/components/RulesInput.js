import React, { useState } from "react";

const RulesInput = ({ rules, setRules }) => {
  const [currentRule, setCurrentRule] = useState("");

  const addRule = () => {
    if (currentRule.trim()) {
      setRules([...rules, currentRule]);
      setCurrentRule("");
    }
  };

  return (
    <div className="rules-container">
      <ul>
        {rules.map((rule, index) => (
          <li key={index}>{rule}</li>
        ))}
      </ul>
      <div className="rules-grid">
        <input
          type="text"
          value={currentRule}
          onChange={(e) => setCurrentRule(e.target.value)}
          placeholder="Enter a rule"
        />
        <button type="button" onClick={addRule}>
          Add Rule
        </button>
      </div>
    </div>
  );
};

export default RulesInput;
