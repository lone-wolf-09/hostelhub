
import Modal from "../../../components/ui/Modal";
import Badge from "../../../components/ui/Badge";

function NoticeDetails({ notice, onClose }) {
  return (
    <Modal title="Notice Details" onClose={onClose}>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={
              notice.priority === "High"
                ? "danger"
                : notice.priority === "Medium"
                  ? "warning"
                  : "info"
            }
          >
            {notice.priority} Priority
          </Badge>
          <Badge>{notice.category}</Badge>
        </div>

        <h2 className="text-xl font-bold text-zinc-900">
          {notice.title}
        </h2>

        <p className="text-sm leading-7 text-zinc-600">
          {notice.description}
        </p>

        <div className="rounded-lg bg-zinc-50 p-4 text-sm">
          <p>
            <span className="font-medium">Published:</span> {notice.date}
          </p>
          <p className="mt-2">
            <span className="font-medium">Audience:</span> {notice.audience}
          </p>
        </div>
      </div>
    </Modal>
  );
}

export default NoticeDetails;

