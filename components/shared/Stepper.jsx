import React from "react";
import styled, { keyframes, css } from "styled-components";

const move = keyframes`
    100% {transform:translateX(200%)}
`;

const yellowStyle = css`
  background-color: ${({ theme }) => theme.palette.warning.main};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.palette.warning.main} 0% 20%,
      ${({ theme }) => theme.palette.warning.dark} 50%,
      ${({ theme }) => theme.palette.warning.main} 80% 100%
    );
    animation: ${move} 2s infinite;
  }
`;

const greenStyle = css`
  background-color: ${({ theme }) => theme.palette.success.main};
`;

const StyledStepper = styled.div`
  position: relative;
  width: ${({ step }) => step * 25}%;

  .glimmer {
    position: absolute;
    overflow: hidden;
    bottom: 4px;
    left: 3px;
    width: calc(100% - 3px);
    height: 5px;
    border-radius: 2.5px;
    ${({ step }) => (step < 3 ? yellowStyle : greenStyle)}
  }
`;

const Stepper = ({ step, ...rest }) => {
  return (
    <StyledStepper {...rest} step={step}>
      <span className="glimmer"></span>
    </StyledStepper>
  );
};

export default Stepper;
