
import { useState } from "react";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

function MessFeedbackForm({ mode, onSubmit, onCancel }) {
  const [category, setCategory] = useState("Food Quality");
  const [message, setMessage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  const isRebate = mode === "rebate";
  const today = new Date().toLocaleDateString("en-CA");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!message.trim()) {
      setError(isRebate
        ? "Please enter a reason for your rebate."
        : "Please enter your feedback.");
      return;
    }

    if (isRebate) {
      if (!startDate || !endDate) {
        setError("Please select both dates.");
        return;
      }

      if (startDate < today || endDate < startDate) {
        setError("Please select valid rebate dates.");
        return;
      }
    }

    const submittedAt = new Date().toLocaleDateString();

    const item = isRebate
      ? {
          id: `REB-${Date.now()}`,
          startDate,
          endDate,
          reason: message.trim(),
          status: "Pending",
          submittedAt,
        }
      : {
          id: `FDB-${Date.now()}`,
          category,
          message: message.trim(),
          status: "Submitted",
          submittedAt,
        };

    onSubmit(item);
    setMessage("");
    setStartDate("");
    setEndDate("");
    setCategory("Food Quality");
  }

  return (
    <Card>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-zinc-900">
          {isRebate ? "Apply for Mess Rebate" : "Share Food Feedback"}
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          {isRebate
            ? "Provide the dates and reason for your rebate request."
            : "Tell us about your mess experience."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isRebate && (
          <div>
            <label
              htmlFor="feedback-category"
              className="mb-2 block text-sm font-medium text-zinc-700"
            >
              Feedback category
            </label>

            <select
              id="feedback-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-3 text-sm"
            >
              <option>Food Quality</option>
              <option>Food Taste</option>
              <option>Meal Timing</option>
              <option>Food Variety</option>
              <option>Hygiene</option>
              <option>Other</option>
            </select>
          </div>
        )}

        {isRebate && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="rebate-start"
                className="mb-2 block text-sm font-medium text-zinc-700"
              >
                Start date
              </label>

              <input
                id="rebate-start"
                type="date"
                value={startDate}
                min={today}
                onChange={(event) => {
                  setStartDate(event.target.value);
                  setError("");
                }}
                required
                className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-3 text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="rebate-end"
                className="mb-2 block text-sm font-medium text-zinc-700"
              >
                End date
              </label>

              <input
                id="rebate-end"
                type="date"
                value={endDate}
                min={startDate || today}
                onChange={(event) => {
                  setEndDate(event.target.value);
                  setError("");
                }}
                required
                className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-3 text-sm"
              />
            </div>
          </div>
        )}

        <div>
          <label
            htmlFor="mess-message"
            className="mb-2 block text-sm font-medium text-zinc-700"
          >
            {isRebate ? "Reason for rebate" : "Your feedback"}
          </label>

          <textarea
            id="mess-message"
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
              setError("");
            }}
            placeholder={
              isRebate
                ? "Explain why you need a mess rebate..."
                : "Tell us about food quality, taste, hygiene or meal timings..."
            }
            rows={4}
            required
            className="w-full resize-y rounded-xl border border-zinc-200 bg-white px-3 py-3 text-sm outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-100"
          />
        </div>

        {error && (
          <p className="text-sm font-medium text-red-600" role="alert">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          <Button type="submit">
            {isRebate ? "Submit Rebate Request" : "Submit Feedback"}
          </Button>

          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default MessFeedbackForm;
