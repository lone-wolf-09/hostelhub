
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";

function ContactCard({ contact }) {
  return (
    <Card>
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-xl">
          {contact.icon}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-zinc-900">
              {contact.name}
            </h3>

            {contact.emergency && (
              <Badge variant="danger">Emergency</Badge>
            )}
          </div>

          <p className="mt-1 text-sm text-zinc-500">
            {contact.role}
          </p>

          <p className="mt-3 text-sm leading-6 text-zinc-600">
            {contact.description}
          </p>

          <div className="mt-4 rounded-lg bg-zinc-50 p-3">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Contact Details
            </p>
            <p className="mt-1 text-sm font-medium text-zinc-800">
              {contact.phone || "Contact details to be added"}
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              {contact.availability}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ContactCard;
