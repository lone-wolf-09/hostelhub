
import { useEffect, useRef, useState } from "react";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import EmptyState from "../../../components/ui/EmptyState";
import MessFeedbackForm from "./MessFeedbackForm";

const weeklyMenu = [
  {
    day: "Monday",
    meals: [
      { name: "Breakfast", items: ["Poha", "Tea", "Banana"] },
      { name: "Lunch", items: ["Rice", "Dal", "Roti", "Salad"] },
      { name: "Snacks", items: ["Samosa", "Tea"] },
      { name: "Dinner", items: ["Paneer", "Roti", "Rice"] },
    ],
  },
  {
    day: "Tuesday",
    meals: [
      { name: "Breakfast", items: ["Aloo Paratha", "Curd", "Tea"] },
      { name: "Lunch", items: ["Rajma", "Rice", "Roti"] },
      { name: "Snacks", items: ["Sandwich", "Juice"] },
      { name: "Dinner", items: ["Mix Veg", "Dal", "Roti"] },
    ],
  },
  {
    day: "Wednesday",
    meals: [
      { name: "Breakfast", items: ["Idli", "Sambar", "Tea"] },
      { name: "Lunch", items: ["Chole", "Rice", "Roti"] },
      { name: "Snacks", items: ["Biscuits", "Milk"] },
      { name: "Dinner", items: ["Kadhi", "Rice", "Roti"] },
    ],
  },
  {
    day: "Thursday",
    meals: [
      { name: "Breakfast", items: ["Bread", "Butter", "Milk"] },
      { name: "Lunch", items: ["Kadhi Pakora", "Rice", "Roti"] },
      { name: "Snacks", items: ["Pakora", "Tea"] },
      { name: "Dinner", items: ["Aloo Gobi", "Dal", "Roti"] },
    ],
  },
  {
    day: "Friday",
    meals: [
      { name: "Breakfast", items: ["Upma", "Tea", "Fruit"] },
      { name: "Lunch", items: ["Kadhi", "Rice", "Salad"] },
      { name: "Snacks", items: ["Pav Bhaji"] },
      { name: "Dinner", items: ["Soyabean", "Roti", "Rice"] },
    ],
  },
  {
    day: "Saturday",
    meals: [
      { name: "Breakfast", items: ["Chole Bhature", "Tea"] },
      { name: "Lunch", items: ["Dal Makhani", "Rice", "Roti"] },
      { name: "Snacks", items: ["Noodles", "Juice"] },
      { name: "Dinner", items: ["Pulao", "Raita", "Papad"] },
    ],
  },
  {
    day: "Sunday",
    meals: [
      { name: "Breakfast", items: ["Puri", "Aloo Sabzi", "Tea"] },
      { name: "Lunch", items: ["Special Thali", "Sweet"] },
      { name: "Snacks", items: ["Cake", "Milk"] },
      { name: "Dinner", items: ["Fried Rice", "Manchurian"] },
    ],
  },
];

const mealIcons = {
  Breakfast: "🌅",
  Lunch: "🍛",
  Snacks: "☕",
  Dinner: "🌙",
};

const rebateVariant = {
  Pending: "warning",
  Approved: "success",
  Rejected: "danger",
};

function readStoredList(key) {
  try {
    const stored = localStorage.getItem(key);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function StudentMessPage() {
  const [selectedDay, setSelectedDay] = useState(
    new Date().toLocaleDateString("en-US", { weekday: "long" })
  );

  const [formMode, setFormMode] = useState(null);

  const [feedback, setFeedback] = useState(() =>
    readStoredList("hostelhub_mess_feedback")
  );

  const [rebates, setRebates] = useState(() =>
    readStoredList("hostelhub_mess_rebates")
  );

  const formRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem("hostelhub_mess_feedback", JSON.stringify(feedback));
    } catch (error) {
      console.error("Could not save mess feedback:", error);
    }
  }, [feedback]);

  useEffect(() => {
    try {
      localStorage.setItem("hostelhub_mess_rebates", JSON.stringify(rebates));
    } catch (error) {
      console.error("Could not save mess rebates:", error);
    }
  }, [rebates]);

  useEffect(() => {
    if (formMode && formRef.current) {
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [formMode]);

  const currentMenu = weeklyMenu.find((item) => item.day === selectedDay);

  function openForm(mode) {
    setFormMode(mode);
  }

  function submitFeedback(item) {
    setFeedback((current) => [item, ...current]);
    setFormMode(null);
  }

  function submitRebate(item) {
    setRebates((current) => [item, ...current]);
    setFormMode(null);
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-1 text-sm text-zinc-500">Student Portal / Mess</p>

        <h1 className="text-2xl font-semibold tracking-tight">Mess & Dining</h1>

        <p className="mt-1 text-sm text-zinc-500">
          Check your meals, share feedback and manage rebate requests.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-sm text-zinc-500">Weekly Menu</p>
          <p className="mt-2 text-3xl font-semibold">7 Days</p>
          <p className="mt-1 text-xs text-zinc-500">Planned meals</p>
        </Card>

        <Card>
          <p className="text-sm text-zinc-500">My Feedback</p>
          <p className="mt-2 text-3xl font-semibold">{feedback.length}</p>
          <p className="mt-1 text-xs text-zinc-500">Saved submissions</p>
        </Card>

        <Card>
          <p className="text-sm text-zinc-500">Rebate Requests</p>
          <p className="mt-2 text-3xl font-semibold">{rebates.length}</p>
          <p className="mt-1 text-xs text-zinc-500">Saved applications</p>
        </Card>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => openForm("feedback")}
          variant={formMode === "feedback" ? "primary" : "outline"}
        >
          ✍️ Give Feedback
        </Button>

        <Button
          onClick={() => openForm("rebate")}
          variant={formMode === "rebate" ? "primary" : "outline"}
        >
          📄 Apply for Rebate
        </Button>
      </div>

      {formMode && (
        <div ref={formRef} className="scroll-mt-6">
          <MessFeedbackForm
            key={formMode}
            mode={formMode}
            onSubmit={formMode === "rebate" ? submitRebate : submitFeedback}
            onCancel={() => setFormMode(null)}
          />
        </div>
      )}

      <Card>
        <div className="mb-5">
          <h2 className="text-lg font-semibold">Weekly Mess Menu</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Select a day to check the planned meals.
          </p>
        </div>

        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {weeklyMenu.map((item) => (
            <Button
              key={item.day}
              variant={selectedDay === item.day ? "primary" : "outline"}
              onClick={() => setSelectedDay(item.day)}
            >
              {item.day}
            </Button>
          ))}
        </div>

        {currentMenu ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {currentMenu.meals.map((meal) => (
              <div
                key={meal.name}
                className="rounded-2xl border border-zinc-200 p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-2xl">
                    {mealIcons[meal.name]}
                  </div>

                  <div>
                    <h3 className="font-semibold">{meal.name}</h3>
                    <p className="mt-1 text-sm text-zinc-500">
                      {currentMenu.day}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {meal.items.map((food) => (
                    <span
                      key={food}
                      className="rounded-lg bg-zinc-50 px-3 py-2 text-sm text-zinc-700"
                    >
                      {food}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="Menu unavailable"
            message="There is no menu available for this day."
          />
        )}
      </Card>

      <Card>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">My Food Feedback</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Your submissions remain saved after refreshing the page.
            </p>
          </div>

          {/* <Button onClick={() => openForm("feedback")}>
            + Give Feedback
          </Button> */}
        </div>

        {feedback.length === 0 ? (
          <EmptyState
            title="No feedback submitted"
            message="Share your experience to help improve mess services."
            action={
              <Button onClick={() => openForm("feedback")}>
                Give Feedback
              </Button>
            }
          />
        ) : (
          <div className="space-y-3">
            {feedback.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-zinc-200 p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-medium">{item.category}</h3>
                  <Badge variant="success">{item.status}</Badge>
                </div>

                <p className="mt-2 whitespace-pre-wrap break-words text-sm text-zinc-600">
                  {item.message}
                </p>

                <p className="mt-2 text-xs text-zinc-400">
                  Submitted: {item.submittedAt}
                </p>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">My Rebate Applications</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Track the status of your mess rebate requests.
            </p>
          </div>

          {/* <Button onClick={() => openForm("rebate")}>
            + Apply for Rebate
          </Button> */}
        </div>

        {rebates.length === 0 ? (
          <EmptyState
            title="No rebate applications"
            message="If you will be away from the hostel, you can apply for a rebate."
            action={
              <Button onClick={() => openForm("rebate")}>
                Apply for Rebate
              </Button>
            }
          />
        ) : (
          <div className="space-y-3">
            {rebates.map((rebate) => (
              <div
                key={rebate.id}
                className="rounded-xl border border-zinc-200 p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-medium">{rebate.id}</h3>
                  <Badge variant={rebateVariant[rebate.status] || "default"}>
                    {rebate.status}
                  </Badge>
                </div>

                <p className="mt-2 text-sm text-zinc-600">
                  {rebate.startDate} to {rebate.endDate}
                </p>

                <p className="mt-2 whitespace-pre-wrap break-words text-sm text-zinc-500">
                  Reason: {rebate.reason}
                </p>

                <p className="mt-2 text-xs text-zinc-400">
                  Submitted: {rebate.submittedAt}
                </p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

export default StudentMessPage;
