import { useState } from "react";
import RegisterForm from "./components/register-form/registerForm";
import "./App.css";

function App() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="app">
      {/* Trigger button */}
      <button
        className="open-btn"
        onClick={() => setShowRegister(true)}
      >
        Register Now
      </button>

      {/* Popup */}
      {showRegister && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="close-btn"
              onClick={() => setShowRegister(false)}
            >
              ✕
            </button>

            <RegisterForm />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
