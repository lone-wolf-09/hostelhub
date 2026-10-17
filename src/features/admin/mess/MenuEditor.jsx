
import { useState } from "react";
import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

function MenuEditor({ menu, onSave, onCancel }) {
  const [day, setDay] = useState(menu?.day || "Monday");
  const [meal, setMeal] = useState(menu?.meal || "Breakfast");
  const [items, setItems] = useState(menu?.items.join(", ") || "");

  function handleSubmit(event) {
    event.preventDefault();

    const cleanedItems = items
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    if (cleanedItems.length === 0) {
      return;
    }

    onSave({
      id: menu?.id || `MENU-${Date.now()}`,
      day,
      meal,
      items: cleanedItems
    });
  }

  return (
    <Card>
      <h2 className="mb-5 text-lg font-semibold">
        {menu ? "Edit Menu" : "Add Menu"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">
            Day
          </label>

          <select
            value={day}
            onChange={(event) => setDay(event.target.value)}
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm"
          >
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday"
            ].map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">
            Meal
          </label>

          <select
            value={meal}
            onChange={(event) => setMeal(event.target.value)}
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm"
          >
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Snacks</option>
            <option>Dinner</option>
          </select>
        </div>

        <Input
          label="Food items"
          value={items}
          onChange={setItems}
          placeholder="Poha, Tea, Banana"
          required
        />

        <p className="text-xs text-zinc-500">
          Enter items separated by commas.
        </p>

        <div className="flex flex-wrap gap-2">
          <Button type="submit">Save Menu</Button>

          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default MenuEditor;
