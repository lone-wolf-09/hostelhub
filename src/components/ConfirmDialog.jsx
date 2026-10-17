
import Button from "./ui/Button";
import Modal from "./ui/Modal";

function ConfirmDialog({
  title = "Are you sure?",
  message = "This action cannot be undone.",
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  danger = false
}) {
  return (
    <Modal title={title} onClose={onCancel}>
      <p className="text-sm leading-6 text-zinc-500">
        {message}
      </p>

      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>

        <Button
          variant={danger ? "danger" : "primary"}
          onClick={onConfirm}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
}

export default ConfirmDialog;
