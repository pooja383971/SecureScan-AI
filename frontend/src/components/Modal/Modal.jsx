import "./Modal.css";

function Modal({ show, title, children, onClose }) {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">

        <h2>{title}</h2>

        {children}

        <button onClick={onClose}>
          Close
        </button>

      </div>
    </div>
  );
}

export default Modal;