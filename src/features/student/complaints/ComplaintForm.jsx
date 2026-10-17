
import { useState } from "react";
import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

function ComplaintForm({ onSubmit, onCancel }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Electrical");
  const [priority, setPriority] = useState("Medium");
  const [description, setDescription] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit({
      id: `CMP-${Date.now()}`,
      title: title.trim(),
      category,
      priority,
      description: description.trim(),
      status: "Pending",
      createdAt: new Date().toISOString().slice(0, 10)
    });
  }

  return (
    <Card>
      <h2 className="mb-1 text-lg font-semibold">
        Submit a Complaint
      </h2>

      <p className="mb-5 text-sm text-zinc-500">
        Describe the issue so the hostel team can investigate it.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Complaint title"
          value={title}
          onChange={setTitle}
          placeholder="e.g. Fan not working"
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
              <option>Electrical</option>
              <option>Bathroom Cleanliness</option>
              <option>Plumbing</option>
              <option>Furniture</option>
              <option>Noise</option>
              <option>Mess / Food</option>
              <option>Other</option>
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
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">
            Describe the issue
          </label>

          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="When did it happen? What needs attention?"
            required
            rows={4}
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-zinc-400"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button type="submit">Submit Complaint</Button>

          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default ComplaintForm;
