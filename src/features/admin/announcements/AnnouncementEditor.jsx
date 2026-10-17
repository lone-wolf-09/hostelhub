
import { useState } from "react";
import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

function AnnouncementEditor({ announcement, onSave, onCancel }) {
  const [title, setTitle] = useState(announcement?.title || "");
  const [category, setCategory] = useState(
    announcement?.category || "General"
  );
  const [priority, setPriority] = useState(
    announcement?.priority || "Normal"
  );
  const [audience, setAudience] = useState(
    announcement?.audience || "All Students"
  );
  const [description, setDescription] = useState(
    announcement?.description || ""
  );
  const [expiryDate, setExpiryDate] = useState(
    announcement?.expiryDate || ""
  );

  function handleSubmit(event) {
    event.preventDefault();

    onSave({
      id: announcement?.id || `ANN-${Date.now()}`,
      title: title.trim(),
      category,
      priority,
      audience,
      description: description.trim(),
      expiryDate,
      publishedAt:
        announcement?.publishedAt ||
        new Date().toISOString().slice(0, 10),
      status: "Published"
    });
  }

  return (
    <Card>
      <h2 className="mb-5 text-lg font-semibold">
        {announcement ? "Edit Announcement" : "Create Announcement"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Announcement title"
          value={title}
          onChange={setTitle}
          placeholder="e.g. Hostel maintenance notice"
          required
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              Category
            </label>

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm"
            >
              <option>General</option>
              <option>Maintenance</option>
              <option>Mess</option>
              <option>Discipline</option>
              <option>Event</option>
              <option>Emergency</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              Priority
            </label>

            <select
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm"
            >
              <option>Normal</option>
              <option>Important</option>
              <option>Urgent</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              Audience
            </label>

            <select
              value={audience}
              onChange={(event) => setAudience(event.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm"
            >
              <option>All Students</option>
              <option>Block A</option>
              <option>Block B</option>
              <option>Mess Residents</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              Expiry date
            </label>

            <input
              type="date"
              value={expiryDate}
              onChange={(event) => setExpiryDate(event.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">
            Description
          </label>

          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Write the announcement details..."
            required
            rows={4}
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-zinc-400"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button type="submit">
            {announcement ? "Save Changes" : "Publish Announcement"}
          </Button>

          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default AnnouncementEditor;
