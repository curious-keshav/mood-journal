export const getWeatherGradient = (description) => {
  const map = {
    "Sunny": "from-yellow-300/70 to-orange-400/70",
    "Clear": "from-sky-300/70 to-blue-700/70",
    "Partly cloudy": "from-gray-200/70 to-gray-300/70",
    "Overcast": "from-gray-300/70 to-gray-400/70",
    "Mist": "from-gray-100/70 to-gray-200/70",
    "Haze": "from-yellow-100/70 to-gray-300/70",
    "Patchy rain nearby": "from-indigo-300/70 to-gray-400/70",
    "Light rain": "from-blue-300/70 to-blue-400/70",
    "Light rain shower": "from-blue-400/70 to-gray-300/70",
    "Moderate rain": "from-blue-700/70 to-blue-700/70",
    "Thunderstorm": "from-indigo-600/70 to-blue-800/70",
    "Snow": "from-white/70 to-lightblue-200/70",
  };

  return map[description] || "from-gray-200/70 to-gray-300/70";
};
