
import { useState } from "react";
import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import EmptyState from "../../../components/ui/EmptyState";
import ContactCard from "./ContactCard";

const contacts = [
  {
    id: 1,
    name: "Hostel Warden",
    role: "Administration",
    icon: "👨‍💼",
    description: "For hostel rules, permissions, discipline and major concerns.",
    availability: "Check hostel office timings",
    emergency: false,
  },
  {
    id: 2,
    name: "BHS / Boys Hostel Servant",
    role: "Hostel Assistance",
    icon: "🧑‍🔧",
    description: "For routine hostel assistance and day-to-day requirements.",
    availability: "Confirm availability at your hostel",
    emergency: false,
  },
  {
    id: 3,
    name: "Hostel Caretaker",
    role: "Maintenance",
    icon: "🛠️",
    description: "For room maintenance, damaged fixtures and repair requests.",
    availability: "Check local duty timings",
    emergency: false,
  },
  {
    id: 4,
    name: "Mess In-charge",
    role: "Mess Services",
    icon: "🍽️",
    description: "For food quality, meal timings, menu issues and mess concerns.",
    availability: "Check mess office timings",
    emergency: false,
  },
  {
    id: 5,
    name: "Student Representative",
    role: "Student Support",
    icon: "🙋",
    description: "For student concerns, suggestions and help contacting hostel staff.",
    availability: "Contact during student representative's availability",
    emergency: false,
  },
  {
    id: 6,
    name: "Security Guard",
    role: "Security",
    icon: "🛡️",
    description: "For security concerns, suspicious activity and urgent campus assistance.",
    availability: "Confirm your hostel security desk details",
    emergency: true,
  },
  {
    id: 7,
    name: "Ambulance Helpline",
    role: "Medical Emergency",
    icon: "🚑",
    description: "For urgent medical emergencies requiring an ambulance.",
    availability: "Use your verified local emergency number",
    emergency: true,
  },
];

function ImportantContacts() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    "Administration",
    "Hostel Assistance",
    "Maintenance",
    "Mess Services",
    "Student Support",
    "Security",
    "Medical Emergency",
  ];

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(search.toLowerCase()) ||
      contact.role.toLowerCase().includes(search.toLowerCase()) ||
      contact.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || contact.role === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">
          Important Contacts
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Find the right person for hostel assistance and emergencies.
        </p>
      </div>

      <Card>
        <div className="flex items-start gap-3">
          <span className="text-2xl">ℹ️</span>
          <div>
            <h2 className="font-semibold text-zinc-900">
              Keep contact details updated
            </h2>
            <p className="mt-1 text-sm leading-6 text-zinc-600">
              Contact numbers are not configured yet. Add verified hostel
              contact details before using this page in a real emergency.
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Search contacts"
            value={search}
            onChange={setSearch}
            placeholder="Search by name or role"
          />

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              Contact Category
            </label>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 outline-none focus:border-zinc-500"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All Categories" : item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-900">
          Contact Directory
        </h2>
        <span className="text-sm text-zinc-500">
          {filteredContacts.length} contacts
        </span>
      </div>

      {filteredContacts.length === 0 ? (
        <EmptyState
          title="No contacts found"
          message="Try a different name or category."
        />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {filteredContacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ImportantContacts;
