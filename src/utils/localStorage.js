
export const saveEntry = (entry) => {
  const existing = JSON.parse(localStorage.getItem('moodLogs') || '[]');
  localStorage.setItem('moodLogs', JSON.stringify([...existing, entry]));
};

export const getEntries = () => {
  return JSON.parse(localStorage.getItem('moodLogs') || '[]');
};

export const deleteEntry = (index) => {
  const existing = JSON.parse(localStorage.getItem('moodLogs') || '[]');
  existing.splice(index, 1); 
  localStorage.setItem('moodLogs', JSON.stringify(existing));
};
