import { NonSensitiveDiaryEntry } from "../types";

interface EntryProps {
    entries: NonSensitiveDiaryEntry[]
}

const Entry = (props: EntryProps) => {
    return (
        <div>
            <h2>Diary Entries</h2>
            {props.entries.map(entry => (
                <div key={entry.id} className="DiaryEntry">
                    <h3>{entry.date}</h3>
                    <p>Weather: {entry.weather}</p>
                    <p>Visibility: {entry.visibility}</p>
                </div>
            ))}
        </div>
    );
};

export default Entry;
