import React from 'react';

const moods = [
  { id: 'happy', emoji: '😊' },
  { id: 'neutral', emoji: '😐' },
  { id: 'sad', emoji: '😢' },
  { id: 'angry', emoji: '😠' },
  { id: 'love', emoji: '😍' },
];

const MoodSelector = ({ selectedMood, onSelect }) => {
  return (
    <div className="flex gap-4 justify-center my-8 ">
      {moods.map((m) => (
        <button
          key={m.id}
          onClick={() => onSelect(m.id)}
          className={`text-xl my-4 p-3  rounded-full shadow-xl transition-transform duration-200 ease-in-out 
            backdrop-blur-md border 
            hover:scale-105 active:scale-95 
            ${
              selectedMood === m.id
                ? 'bg-blue-100 dark:bg-blue-400/20 ring-4 ring-offset-2 ring-blue-400 scale-105'
                : 'bg-white/10 dark:bg-white/5 border-white/20 opacity-80 hover:bg-white/20 dark:hover:bg-white/10'
            }
            text-black dark:text-white`}
        >
          {m.emoji}
        </button>
      ))}
    </div>
  );
};

export default MoodSelector;
