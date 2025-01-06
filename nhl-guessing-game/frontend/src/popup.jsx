import React from 'react';
import './popup.css';
import { Link } from 'react-router-dom';

const Modal = ({ isOpen, playerName, careerPoints, playerScore, totalPoints, onClose }) => {
    if (!isOpen) return null; // Don't render if the modal is not open
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Score Summary</h2>
          {/* <p><strong>Player:</strong> {playerName}</p>
          <p><strong>Career Points:</strong> {careerPoints}</p>
          <p><strong>Your Score:</strong> {playerScore}</p> */}
          <p><strong>Your Total Score:</strong> {totalPoints+playerScore}</p>
          <Link to="/">
          <button onClick={onClose}>Back To Home</button>
          </Link>
          
        </div>
      </div>
    );
  };

  export default Modal;