import { useSelector } from "react-redux";
import Navbar from "../components/navbar";
import useGenerateNewOtp from "../hooks/useGenerateNewOtp";
import useVerifyOtp from "../hooks/useVerifyOtp";
const { useState, useEffect } = require("react");

const OtpPage = () => {
  const { email } = useSelector((e) => e.auth);
  const [otp, setOtp] = useState("");
  const { generateNewOtp } = useGenerateNewOtp();
  const { verifyOtp } = useVerifyOtp();

  const handleSubmit = () => {
    if (otp.length < 4) {
      alert("Invalid otp");
    } else {
      const num = parseInt(otp);
      if (num >= 1000 && num <= 9999) {
        verifyOtp(num);
      } else {
        alert("Invalid otp, OTP must be a number");
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
          <div className="otp-column c1" />
          <div className="otp-column c2" />
          <div className="otp-column c3" />
          <div className="otp-column c4" />
        </div>
        <button
          onClick={handleSubmit}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#007bff",
            color: "white",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.3s ease",
            marginTop: "20px",
          }}
        >
          Verify
        </button>
      </div>
    </>
  );
};

export default OtpPage;
