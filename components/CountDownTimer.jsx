import React, { useState } from "react";

import Countdown, { zeroPad } from "react-countdown";

import Icon from "components/shared/Icon";

const CountDownTimer = ({ handleResendVerificationCode }) => {
  const [key, setKey] = useState(1);

  return (
    <Countdown
      key={key}
      date={Date.now() + 1000 * 60 * 3}
      renderer={(props) => (
        <Renderer
          setKey={setKey}
          {...props}
          handleResendVerificationCode={handleResendVerificationCode}
        />
      )}
    />
  );
};

const Renderer = (props) => {
  const { minutes, seconds, completed } = props;
  if (completed) {
    return (
      <div className="d-flex justify-content-center mt-2">
        <Completionist {...props} />
      </div>
    );
  } else {
    return (
      <div className="d-flex justify-content-center ltr timer-container mt-2">
        <span>{zeroPad(minutes)}:</span>
        <span>{zeroPad(seconds)}</span>
      </div>
    );
  }
};

const Completionist = ({ setKey, handleResendVerificationCode }) => {
  const handleOnClick = () => {
    setKey((prev) => prev + 1);
    handleResendVerificationCode();
  };
  return (
    <button className="m-btn cta-btn resend-btn" onClick={handleOnClick}>
      ارسال مجدد
      <Icon className="ms-2" icon="resend" size={18} />
    </button>
  );
};

export default React.memo(CountDownTimer);