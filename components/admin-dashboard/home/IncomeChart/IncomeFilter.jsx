import React, { useState, memo } from "react";
import styled from "styled-components";

const Wraper = styled.form`
  display: flex;
  font-size: 0.8rem;
  border-radius: 0.3rem;
  width: fit-content;
  padding: 0.3rem;
  color: #a5aabd;
  text-align: center;
  z-index: 2;
  @media (min-width: 916px) {
    position: absolute;
    top: 10px;
    right: 20px;
  }
  @media (max-width: 916px) {
    width: 100%;
    justify-content: center;
  }
  .input-container {
    position: relative;
    width: 67px;
  }
  .radio-button {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
  .radio-button-label {
    background-color: transparent;
    margin-bottom: 0;
    width: 100%;
    height: 100%;
    border-radius: 2rem;
    padding: 0.2rem;
    transition: all 0.3s ease;
  }
  .radio-button:checked + .radio-button-label {
    background-color: ${({ theme }) => theme.palette.primary.dark};
    color: ${({ theme }) => theme.palette.text.primary};
  }
`;

const IncomeFilter = ({ val, onChange }) => {
  const handleCheck = (radioBtn) => {
    onChange(radioBtn.target.value);
  };
  const [incomeFilter, setIncomeFilter] = useState("weekly");

  return (
    <Wraper className="income-filter-input">
      <div className="input-container">
        <input
          type="radio"
          id="weekly"
          value="weekly"
          //   name="income-filter-radio-1"
          className="radio-button"
          checked={val === "weekly"}
          onChange={handleCheck}
        />
        <label htmlFor="weekly" className="radio-button-label">
          هفتگی
        </label>
      </div>
      <div className="input-container">
        <input
          type="radio"
          id="monthly"
          value="monthly"
          //   name="income-filter-radio-2"
          className="radio-button"
          checked={val === "monthly"}
          onChange={handleCheck}
        />
        <label htmlFor="monthly" className="radio-button-label">
          ماهانه
        </label>
      </div>
      <div className="input-container">
        <input
          type="radio"
          id="yearly"
          value="yearly"
          //   name="income-filter-radio-3"
          className="radio-button"
          checked={val === "yearly"}
          onChange={handleCheck}
        />
        <label htmlFor="yearly" className="radio-button-label">
          سالانه
        </label>
      </div>
    </Wraper>
  );
};

export default memo(IncomeFilter);
