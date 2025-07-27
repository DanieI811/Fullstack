import './ConfirmModal.css';
export default function ConfirmModal({ show, onClose, onConfirm, message }) {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Confirm Action</h3>
        <p>{message}</p>
        <div className="modal-buttons">
          <button onClick={onClose} className="btn cancel">
            Cancel
          </button>
          <button onClick={onConfirm} className="btn confirm">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}