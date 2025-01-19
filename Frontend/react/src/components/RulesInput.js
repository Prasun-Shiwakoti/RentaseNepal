import React, { useState } from "react";

const RulesInput = ({ rules, setRules }) => {
  const [currentRule, setCurrentRule] = useState("");

  const addRule = () => {
    if (currentRule.trim()) {
      setRules([...rules , currentRule]);
      setCurrentRule("");
    }
  };

  const deleteRule = (indexToDelete) => {
    setRules(rules.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="rules-container">
      <ul>
        {rules.map((rule, index) => (
          rule.trim() &&
          <li className="rules-item" key={index}><span>{rule}</span>
            <button
                type="button"
                className="delete-button"
                onClick={() => deleteRule(index)}
                >
                Delete
            </button>  
          </li>
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
