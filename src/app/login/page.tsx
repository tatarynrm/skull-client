import React from "react";
import TelegramButton from "./TelegramButton";

const LoginPage = async () => {
  return (
    <div className="login page">
      <div className="login__wrapper flex justify-center items-center">
        <TelegramButton />
      </div>
    </div>
  );
};

export default LoginPage;
