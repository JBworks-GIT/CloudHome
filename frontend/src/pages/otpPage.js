import { useSelector } from "react-redux";
import Navbar from "../components/navbar";
import useGenerateNewOtp from "../hooks/useGenerateNewOtp";
const { useState, useEffect } = require("react");

const OtpPage = () => {
  const { email } = useSelector((e) => e.auth);
  const [otp, setOtp] = useState();
  const { generateNewOtp } = useGenerateNewOtp();
  const handleSubmit = () => {
    if (otp.length < 4) {
      alert("Invalid otp");
    } else {
      const num = parseInt(otp);
      if (num >= 1000 && num <= 9999) {
        // generateNewOtp();
      } else {
        alert("Invalid otp, OTP mush be a number");
      }
    }
  };
  useEffect(() => {
    generateNewOtp();
  }, []);

  return (
    <>
      <Navbar />
      <div className="otp-page-container">
        <p>Email : {email}</p>
        <div className="otp-input-container">
          <input
            maxLength={4}
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <div className="otp-column c1"></div>
          <div className="otp-column c2"></div>
          <div className="otp-column c3"></div>
          <div className="otp-column c4"></div>
        </div>
        <button onClick={handleSubmit}>Verify</button>
      </div>
    </>
  );
};

export default OtpPage;
