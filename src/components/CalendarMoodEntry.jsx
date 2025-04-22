import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/CalendarEntry.css"; 
import { toast } from "react-toastify";
import MoodSelector from "./MoodSelector";
import { saveEntry } from "../utils/localStorage";

const CalendarMoodEntry = ({ weather }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMood, setSelectedMood] = useState("happy");
  const [note, setNote] = useState("");

  const handleSave = () => {
    if (!note.trim()) {
      toast.error("Please enter a note.");
      return;
    }

    const newEntry = {
      date: selectedDate.toISOString().split("T")[0],
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }),
      mood: selectedMood,
      note,
      weather,
    };

    saveEntry(newEntry);
    toast.success("Entry saved successfully!");
    setNote("");
  };

  return (
    <div className="flex flex-col md:flex-row max-w-5xl mx-auto rounded-3xl shadow-lg overflow-hidden mt-10 
      backdrop-blur-xl border border-white/20 bg-white/30 dark:bg-white/10 transition-all duration-300">

      <div className="w-full md:w-1/2 md:p-4 p-2">
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-white">
          📅 Pick a Date
        </h2>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          className="mx-auto flex-1 calendar-custom"
        />
        <p className="text-sm text-center mt-2 text-gray-700 dark:text-gray-300">
          {selectedDate.toDateString()}
        </p>
      </div>

      {/* Mood & Note Section */}
      <div className="w-full md:w-1/2 p-6 space-y-4">
        <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-white">
          📝 Add Your Mood & Note
        </h3>

        <MoodSelector selectedMood={selectedMood} onSelect={setSelectedMood} />

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={6}
          placeholder="Write about your day..."
          className="w-full bg-white/10 dark:bg-white/20 border border-white/30 text-gray-800 dark:text-white 
            rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 
            placeholder:text-gray-500 dark:placeholder:text-gray-300"
        />

        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg 
            hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all"
        >
          💾 Save Entry
        </button>
      </div>
    </div>
  );
};

export default CalendarMoodEntry;
