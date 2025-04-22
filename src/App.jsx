import { useEffect, useState } from 'react';
import './App.css'
import EntryLogs from './components/EntryLogs'
import { getWeatherGradient } from './utils/weatherGradientMap';
import { fetchWeather } from './utils/weatherAPI';
import WeatherDisplayScreen from './components/WeatherDisplayScreen';
import { ToastContainer } from 'react-toastify';
import CalendarMoodEntry from './components/CalendarMoodEntry';
import useThemeSwitcher from './hooks/useThemeSwithcer';
import { MoonIcon, SunIcon } from './utils/icons.jsx';

function App() {
  const [weather, setWeather] = useState();
  const [addEntryForm, setAddEntryForm] = useState(true);
  const [mode, setMode] = useThemeSwitcher();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const data = await fetchWeather(
        pos.coords.latitude,
        pos.coords.longitude
      );
      setWeather(data);
    });
  }, []);

  const onOpenLogs = () => {
    setAddEntryForm(!addEntryForm);
  }

  const gradient = getWeatherGradient(weather?.description);

  return (
    <>

    <div className=''>
      <div className='flex relative '>
      <p className="absolute opacity-50 text-3xl sm:text-2xl md:text-2xl lg:text-5xl -rotate-90 top-1/2 -left-16 transform -translate-x-1/2 -translate-y-1/2 font-bold">
    ADD THE JOURNAL . . .
  </p>        <div className={`min-h-[90%]  lg:min-w-[950px] xl:min-w-[1000px] relative rounded-3xl p-6 border-4 border-[#818181] bg-gradient-to-br ${gradient} dark:from-gray-900 dark:to-gray-800 `}>
          <div className="grid-background absolute inset-0 -z-10 opacity-50"></div>

          <div className='flex flex-col hide-scrollbar'>
            <div className='flex justify-between items-center align-middle flex-wrap'>
              <h1 className="text-2xl sm:text-3xl font-bold text-center text-black dark:text-white">
                🌤 Journal
              </h1>

              <div className='flex gap-2'>
                <button
                  onClick={() => setMode(mode === "light" ? "dark" : "light")}
                  className="flex items-center justify-center rounded-full p-2 bg-transparent text-black dark:bg-gray-700 dark:text-white shadow-md transition"
                >
                  {mode === "dark" ? (
                    <SunIcon className="w-5 h-5 fill-yellow-300" />
                  ) : (
                    <MoonIcon className="w-5 h-5 fill-gray-900" />
                  )}
                </button>

                <button
                  className="h-10 flex items-center px-4 rounded-lg text-xs md:text-sm font-semibold bg-black/10 dark:bg-white/10 text-black dark:text-white shadow hover:bg-black/20 dark:hover:bg-white/20 transition"
                  onClick={onOpenLogs}
                >
                  {addEntryForm ? "Previous Logs" : "Add Entry"}
                </button>
              </div>
            </div>

            <div className='flex items-center justify-between py-2 pl-2  md:py-2 md:pt-2   rounded-xl '>
              <p className='text-xs sm:text-sm tracking-wider font-semibold text-black dark:text-white'>
                How's your mood, Wizard?
              </p>
              <WeatherDisplayScreen weather={weather} />
            </div>
          </div>

          {addEntryForm ? <CalendarMoodEntry weather={weather} /> : <EntryLogs />}
        </div>
      </div>
    </div>

      <ToastContainer />
    </>
  );
}

export default App;
