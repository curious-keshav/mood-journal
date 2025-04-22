import { useState } from "react";
import { deleteEntry, getEntries } from "../utils/localStorage";
import { FaFilter } from "react-icons/fa";

const moodEmojis = {
  happy: "😊",
  love: "😍",
  angry: "😠",
  sad: "😢",
  tired: "😴",
  default: "🙂",
};

const EntryLogs = () => {
  const [entries, setEntries] = useState(getEntries());
  const [filteredMood, setFilteredMood] = useState(null);
  const [showEmojiMenu, setShowEmojiMenu] = useState(false);

  const handleDelete = (index) => {
    deleteEntry(index);
    setEntries(getEntries());
  };

  const handleFilterChange = (mood) => {
    if (filteredMood === mood) {
      setFilteredMood(null);
    } else {
      setFilteredMood(mood);
    }
    setShowEmojiMenu(false);
  };

  const filteredEntries = filteredMood
    ? entries.filter((entry) => entry.mood === filteredMood)
    : entries;

  return (
    <div className="p-6 hide-scrollbar min-h-[500px] min-w-[375px]">
      <div className="flex gap-4 justify-center items-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center tracking-wide text-gray-800 dark:text-white">
          Past Entries
        </h2>

        <button
          onClick={() => setShowEmojiMenu(!showEmojiMenu)}
          className="text-lg md:text-sm hover:scale-105 transition ease-in text-gray-600 border-2 border-[#818181] dark:text-white"
        >
          <FaFilter />
        </button>
      </div>

      {showEmojiMenu && (
        <div
          className="absolute top-16 right-10 backdrop-blur-lg dark:bg-gray-800 border border-gray-300 dark:border-white p-4 rounded-xl shadow-lg flex gap-4 flex-wrap z-50"
        >
          {Object.entries(moodEmojis).map(([mood, emoji]) => (
            <button
              key={mood}
              onClick={() => handleFilterChange(mood)}
              className={`${filteredMood === mood ? "bg-white" : ""} text-3xl cursor-pointer transition-colors duration-300 
                ${filteredMood === mood ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-300"} 
                hover:${filteredMood === mood ? "text-blue-700 dark:text-blue-500" : "text-gray-800 dark:text-white"}`}
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      {filteredEntries.length === 0 ? (
        <div className="text-center text-lg text-gray-600 dark:text-gray-400">
          No entries yet. Start adding your mood and thoughts!
        </div>
      ) : (
        <div className="!z-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 hide-scrollbar min-w-[90%]">
          {filteredEntries.map((entry, i) => (
            <div
              key={i}
              className="bg-white/10 dark:bg-white/5 backdrop-blur-lg border border-white/20 dark:border-white/10 
              rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 
              flex flex-col justify-between gap-5"
            >
              <div className="flex justify-between items-center text-sm text-blue-600 dark:text-blue-300 font-medium">
                <span>{entry.date}</span>
                <span>{entry.time}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700 dark:text-white/80">
                    {entry.weather.temperature}°C
                  </span>
                  <img
                    src={entry.weather.icon}
                    alt="weather icon"
                    className="w-7 h-7 rounded-full object-contain"
                  />
                </div>
                <div className="text-3xl">
                  {moodEmojis[entry.mood] || moodEmojis.default}
                </div>
              </div>

              <div className="text-sm text-gray-700 dark:text-white/80">
                <label className="font-medium text-gray-800 dark:text-white">Note:</label>
                <div className="mt-2">
                  <textarea
                    value={entry.note}
                    readOnly
                    className="w-full bg-white/5 dark:bg-white/10 border border-white/20 dark:border-white/10 
                    text-gray-800 dark:text-white/90 p-3 rounded-lg resize-none focus:outline-none"
                    rows={4}
                  />
                </div>
              </div>

              <button
                onClick={() => handleDelete(i)}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg shadow-md transition duration-200"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EntryLogs;
