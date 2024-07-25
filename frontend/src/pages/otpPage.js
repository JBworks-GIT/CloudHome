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
      <div style={{
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center"
      }}>
        <p style={{ fontSize: "18px", color: "#333", margin: "10px 0" }}>Email: {email}</p>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "20px 0"
        }}>
          <input
            maxLength={4}
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{
              fontSize: "24px",
              width: "60px",
              textAlign: "center",
              marginRight: "10px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px"
            }}
          />
          <div style={{
            display: "flex",
            gap: "10px"
          }}>
            <div style={{
              width: "60px",
              height: "60px",
              border: "1px solid #007bff",
              borderRadius: "5px",
              backgroundColor: "#e7f1ff"
            }}></div>
            <div style={{
              width: "60px",
              height: "60px",
              border: "1px solid #007bff",
              borderRadius: "5px",
              backgroundColor: "#e7f1ff"
            }}></div>
            <div style={{
              width: "60px",
              height: "60px",
              border: "1px solid #007bff",
              borderRadius: "5px",
              backgroundColor: "#e7f1ff"
            }}></div>
            <div style={{
              width: "60px",
              height: "60px",
              border: "1px solid #007bff",
              borderRadius: "5px",
              backgroundColor: "#e7f1ff"
            }}></div>
          </div>
        </div>
        <button onClick={handleSubmit} style={{
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          backgroundColor: "#007bff",
          color: "white",
          cursor: "pointer",
          fontSize: "16px",
          transition: "background-color 0.3s ease",
          marginTop: "20px"
        }}>
          Verify
        </button>
      </div>
    </>
  );
};

export default OtpPage;
