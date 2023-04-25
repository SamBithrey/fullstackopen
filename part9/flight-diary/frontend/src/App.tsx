import { useEffect, useState } from "react";

import diaryServices from "./services/diaryServices";
import Entry from "./Components/Entry";
import NewEntry from "./Components/NewEntry";

import { NonSensitiveDiaryEntry } from "./types";
import toNewDiaryEntry from "./utils";
import NotificationMessage from "./Components/NotificationMessage";


const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    diaryServices
      .getAll()
      .then(data => {
        setDiaries(data);
      })
      .catch(Error);
  }, []);

  const entryCreation = (newEntry: unknown) => {
    try {
      const newDiaryEntry = toNewDiaryEntry(newEntry);
      void diaryServices
      .createNewEntry(newDiaryEntry)
      .then(data => {
        setDiaries(diaries.concat(data));
      });
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
          errorMessage += ' Error: ' + error.message;
        }
        setNotification(errorMessage);
        setTimeout(() => setNotification(''), 5000);
      }
  };

  return (
    <div className="app">
      <NotificationMessage notification={notification} />
      <NewEntry entryCreation={entryCreation}/>
      <Entry entries={diaries}/>
    </div>
  );
};

export default App;
