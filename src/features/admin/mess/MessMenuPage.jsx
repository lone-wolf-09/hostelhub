
import { useState } from "react";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import EmptyState from "../../../components/ui/EmptyState";
import MenuEditor from "./MenuEditor";

const initialMenu = [
  { id: "M1", day: "Monday", meal: "Breakfast", items: ["Poha", "Tea", "Banana"] },
  { id: "M2", day: "Monday", meal: "Lunch", items: ["Rice", "Dal", "Roti", "Salad"] },
  { id: "M3", day: "Monday", meal: "Snacks", items: ["Samosa", "Tea"] },
  { id: "M4", day: "Monday", meal: "Dinner", items: ["Paneer", "Roti", "Rice"] },
  { id: "M5", day: "Tuesday", meal: "Breakfast", items: ["Aloo Paratha", "Curd", "Tea"] },
  { id: "M6", day: "Tuesday", meal: "Lunch", items: ["Rajma", "Rice", "Roti"] },
  { id: "M7", day: "Tuesday", meal: "Snacks", items: ["Sandwich", "Juice"] },
  { id: "M8", day: "Tuesday", meal: "Dinner", items: ["Mix Veg", "Dal", "Roti"] },
  { id: "M9", day: "Wednesday", meal: "Breakfast", items: ["Idli", "Sambar", "Tea"] },
  { id: "M10", day: "Wednesday", meal: "Lunch", items: ["Chole", "Rice", "Roti"] },
  { id: "M11", day: "Wednesday", meal: "Snacks", items: ["Biscuits", "Milk"] },
  { id: "M12", day: "Wednesday", meal: "Dinner", items: ["Kadhi", "Rice", "Roti"] },
  { id: "M13", day: "Thursday", meal: "Breakfast", items: ["Bread", "Butter", "Milk"] },
  { id: "M14", day: "Thursday", meal: "Lunch", items: ["Kadhi Pakora", "Rice", "Roti"] },
  { id: "M15", day: "Thursday", meal: "Snacks", items: ["Pakora", "Tea"] },
  { id: "M16", day: "Thursday", meal: "Dinner", items: ["Aloo Gobi", "Dal", "Roti"] },
  { id: "M17", day: "Friday", meal: "Breakfast", items: ["Upma", "Tea", "Fruit"] },
  { id: "M18", day: "Friday", meal: "Lunch", items: ["Kadhi", "Rice", "Salad"] },
  { id: "M19", day: "Friday", meal: "Snacks", items: ["Pav Bhaji"] },
  { id: "M20", day: "Friday", meal: "Dinner", items: ["Soyabean", "Roti", "Rice"] },
  { id: "M21", day: "Saturday", meal: "Breakfast", items: ["Chole Bhature", "Tea"] },
  { id: "M22", day: "Saturday", meal: "Lunch", items: ["Dal Makhani", "Rice", "Roti"] },
  { id: "M23", day: "Saturday", meal: "Snacks", items: ["Noodles", "Juice"] },
  { id: "M24", day: "Saturday", meal: "Dinner", items: ["Pulao", "Raita", "Papad"] },
  { id: "M25", day: "Sunday", meal: "Breakfast", items: ["Puri", "Aloo Sabzi", "Tea"] },
  { id: "M26", day: "Sunday", meal: "Lunch", items: ["Special Thali", "Sweet"] },
  { id: "M27", day: "Sunday", meal: "Snacks", items: ["Cake", "Milk"] },
  { id: "M28", day: "Sunday", meal: "Dinner", items: ["Fried Rice", "Manchurian"] }
];

const feedbackData = [
  { id: 1, category: "Food quality", message: "Dinner was too oily.", date: "Today", status: "Open" },
  { id: 2, category: "Meal timing", message: "Please extend breakfast timing.", date: "Yesterday", status: "Reviewed" },
  { id: 3, category: "Food variety", message: "Add more seasonal fruits.", date: "Yesterday", status: "Open" }
];

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

const mealIcons = {
  Breakfast: "🌅",
  Lunch: "🍛",
  Snacks: "☕",
  Dinner: "🌙"
};

function MessMenuPage() {
  const [menu, setMenu] = useState(initialMenu);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [editingMenu, setEditingMenu] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [feedback, setFeedback] = useState(feedbackData);

  const dayMenu = menu.filter((item) => item.day === selectedDay);

  function saveMenu(updatedMenu) {
    setMenu((current) => {
      const exists = current.some((item) => item.id === updatedMenu.id);

      if (exists) {
        return current.map((item) =>
          item.id === updatedMenu.id ? updatedMenu : item
        );
      }

      return [...current, updatedMenu];
    });

    setSelectedDay(updatedMenu.day);
    setShowEditor(false);
    setEditingMenu(null);
  }

  function deleteMenu(id) {
    setMenu((current) => current.filter((item) => item.id !== id));
  }

  function openAddForm() {
    setEditingMenu(null);
    setShowEditor(true);
  }

  function openEditForm(item) {
    setEditingMenu(item);
    setShowEditor(true);
  }

  function toggleFeedback(id) {
    setFeedback((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, status: item.status === "Open" ? "Reviewed" : "Open" }
          : item
      )
    );
  }

  const openFeedback = feedback.filter(
    (item) => item.status === "Open"
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <p className="mb-1 text-sm text-zinc-500">
            Hostel Management / Mess Menu
          </p>

          <h1 className="text-2xl font-semibold tracking-tight">
            Mess Management
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            Plan meals and review student feedback.
          </p>
        </div>

        <Button onClick={openAddForm}>+ Add Menu</Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-sm text-zinc-500">Menu Entries</p>
          <p className="mt-2 text-3xl font-semibold">{menu.length}</p>
          <p className="mt-1 text-xs text-zinc-500">Across the week</p>
        </Card>

        <Card>
          <p className="text-sm text-zinc-500">Meals Per Day</p>
          <p className="mt-2 text-3xl font-semibold">4</p>
          <p className="mt-1 text-xs text-zinc-500">Breakfast to dinner</p>
        </Card>

        <Card>
          <p className="text-sm text-zinc-500">Open Feedback</p>
          <p className="mt-2 text-3xl font-semibold">{openFeedback}</p>
          <p className="mt-1 text-xs text-zinc-500">Awaiting review</p>
        </Card>
      </div>

      {showEditor && (
        <MenuEditor
          menu={editingMenu}
          onSave={saveMenu}
          onCancel={() => {
            setShowEditor(false);
            setEditingMenu(null);
          }}
        />
      )}

      <Card>
        <div className="mb-5">
          <h2 className="text-lg font-semibold">Weekly Menu</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Select a day to view or update its meals.
          </p>
        </div>

        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {days.map((day) => (
            <Button
              key={day}
              variant={selectedDay === day ? "primary" : "outline"}
              className="shrink-0"
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </Button>
          ))}
        </div>

        {dayMenu.length === 0 ? (
          <EmptyState
            title="No meals added"
            message={`There are no menu entries for ${selectedDay}. Add a meal to get started.`}
            action={
              <Button onClick={openAddForm}>Add a meal</Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {dayMenu.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-zinc-200 p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-2xl">
                      {mealIcons[item.meal] || "🍽️"}
                    </div>

                    <div>
                      <h3 className="font-semibold">{item.meal}</h3>
                      <p className="mt-1 text-sm text-zinc-500">
                        {item.day}
                      </p>
                    </div>
                  </div>

                  <Badge>Planned</Badge>
                </div>

                <div className="my-5 flex flex-wrap gap-2">
                  {item.items.map((food) => (
                    <span
                      key={food}
                      className="rounded-lg bg-zinc-50 px-3 py-2 text-sm text-zinc-700"
                    >
                      {food}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2 border-t border-zinc-100 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => openEditForm(item)}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() => deleteMenu(item.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card>
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Student Food Feedback</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Review suggestions and mess-related concerns.
            </p>
          </div>

          <Badge variant={openFeedback > 0 ? "warning" : "success"}>
            {openFeedback} open
          </Badge>
        </div>

        <div className="space-y-3">
          {feedback.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between gap-3 rounded-xl border border-zinc-200 p-4 sm:flex-row sm:items-center"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-medium">{item.category}</h3>
                  <Badge
                    variant={item.status === "Open" ? "warning" : "success"}
                  >
                    {item.status}
                  </Badge>
                </div>

                <p className="mt-1 text-sm text-zinc-600">
                  {item.message}
                </p>

                <p className="mt-2 text-xs text-zinc-400">{item.date}</p>
              </div>

              <Button
                variant="outline"
                onClick={() => toggleFeedback(item.id)}
              >
                {item.status === "Open" ? "Mark reviewed" : "Reopen"}
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default MessMenuPage;
