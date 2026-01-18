import { useState } from "react";
import './registerForm.css';
//test google form
//https://docs.google.com/forms/u/0/d/e/1FAIpQLSfTnMFkGoFZ1bQCGAHTP0XAydbNyzlrvFdKuEPi4S_RUY2KWQ/formResponse
//https://docs.google.com/forms/d/e/1FAIpQLScJxB5X1ig6-73qpKK9-PJhJEVCfus9w_YTA0VTDs8z-p_rQQ/formResponse
//ID for name - entry.301235112
//ID for mobile number - entry.1385615279
//ID for Email - entry.1775302109

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [PID, setPID] = useState("");
  const [payment_proof, setPayment_proof] = useState("");

  return (
      <form
        onSubmit={(e) => {
          e.preventDefault();

          //adding data into formData
          const formData = new FormData(e.target);

          //question-1 (name)
          formData.append("entry.451532495", name);

          //question-2 (mobile phone)
          formData.append("entry.380867054", email);

          //question-3 (email)
          formData.append("entry.372789283", PID);

          //question-4 (email)
          formData.append("entry.1598884232", year);

          //question-5 (email)
          formData.append("entry.24007369", branch);

          //question-6 (email)
          formData.append("entry.1901115713", payment_proof);
          //POST req sent to google form.
          fetch(
            "https://docs.google.com/forms/d/e/1FAIpQLScJxB5X1ig6-73qpKK9-PJhJEVCfus9w_YTA0VTDs8z-p_rQQ/formResponse",
            {
              method: "POST",
              mode: "no-cors",
              body: formData,
            },
          );

          //clearing form input
          setName("");
          setEmail("");
          setPID("");
          setYear("");
          setBranch("");
          setPayment_proof("");
          alert("Form Submitted!");
        }}
      >

          {/* Name */}
        <div className="field">
          <label htmlFor="name">Full Name: </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
          />
        </div>

              {/* Email */}
      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
        />
      </div>

      {/* PID */}
      <div className="field">
        <label htmlFor="pid">PID</label>
        <input
          id="pid"
          type="text"
          value={PID}
          onChange={(e) => setPID(e.target.value)}
          placeholder="Enter PID"
        />
      </div>

      {/* Year */}
      <div className="field">
        <label htmlFor="year">Year</label>
        <input
          id="year"
          type="text"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Enter Year"
        />
      </div>

      {/* Branch */}
      <div className="field">
        <label htmlFor="branch">Branch</label>
        <input
          id="branch"
          type="text"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          placeholder="Enter Branch"
        />
      </div>

      {/* Payment Proof */}
      <div className="field">
        <label htmlFor="payment">Payment Proof</label>
        <input
          id="payment"
          type="text"
          value={payment_proof}
          onChange={(e) => setPayment_proof(e.target.value)}
          placeholder="Transaction / UPI Ref ID"
        />
      </div>

        <button
          type="submit"
          className="hover:text-blue-600 mx-5 border border-blue-600 px-3 py-2 rounded-md"
        >
          Submit
        </button>
      </form>
  );
}

export default RegisterForm;
