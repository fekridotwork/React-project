import ProgressBar from './ProgressBar.jsx';

export default function DeleteConfirmation({ onConfirm, onCancel, timeout }) {
  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <ProgressBar timer={timeout} onTimeout={onConfirm} />
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">No</button>
        <button onClick={onConfirm} className="button">Yes</button>
      </div>
    </div>
  );
}
