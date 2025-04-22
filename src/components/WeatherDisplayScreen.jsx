const WeatherDisplayScreen = ({ weather }) => {
  if (!weather) {
    return (
      <p className="text-center mt-4 text-gray-600 dark:text-gray-400">
        Loading weather...
      </p>
    );
  }

  return (
    <div className="flex items-center gap-4 mt-2 p-2 rounded-xl bg-white/20 dark:bg-white/10 backdrop-blur-sm shadow-sm">
      <img
        src={weather.icon}
        alt="Weather Icon"
        className="w-10 h-10 object-contain rounded-full"
      />
      <div>
        <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-300">
          {weather.city}
        </h3>
        <p className="text-sm text-gray-800 dark:text-gray-300 capitalize">
          {weather.description} |{" "}
          <span className="font-bold text-gray-900 dark:text-white">
            {weather.temperature}°C
          </span>
        </p>
      </div>
    </div>
  );
};

export default WeatherDisplayScreen;
