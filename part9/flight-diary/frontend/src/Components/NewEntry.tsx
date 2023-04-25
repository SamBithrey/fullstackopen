import { useState } from "react";

interface NewEntryProps {
    entryCreation: (newEntry: unknown) => void
}

const NewEntry = (props: NewEntryProps) => {
    const [newDate, setNewDate] = useState('');
    const [newWeather, setNewWeather] = useState('');
    const [newVisiblity, setNewVisiblity] = useState('');
    const [newComment, setNewComment] = useState('');

    const addNewEntry = (event: React.SyntheticEvent) => {
        event.preventDefault();
        props.entryCreation({
            date: newDate,
            weather: newWeather,
            visibility: newVisiblity,
            comment: newComment
        });
        setNewComment('');
      };

    return (
        <div>
            <h2>Add New Entry</h2>
            <form onSubmit={addNewEntry} id="newEntryForm">
                <span>Date:  <input type="date" onChange={(event) => setNewDate(event.target.value)}/></span><br/>
                <span>
                    Weather:  
                    Sunny <input type="radio" name="weather" onChange={() => setNewWeather('sunny')}/>  
                    Rainy <input type="radio" name="weather" onChange={() => setNewWeather('rainy')}/>  
                    Cloudy <input type="radio" name="weather" onChange={() => setNewWeather('cloudy')}/>  
                    Stormy <input type="radio" name="weather" onChange={() => setNewWeather('stormy')}/>  
                    Windy <input type="radio" name="weather" onChange={() => setNewWeather('windy')}/>  
                </span><br/>
                <span>
                    Visibility:  
                    Great <input type="radio" name="visibility" onChange={() => setNewVisiblity('great')}/>  
                    Good <input type="radio" name="visibility" onChange={() => setNewVisiblity('good')}/>  
                    OK <input type="radio" name="visibility" onChange={() => setNewVisiblity('ok')}/>  
                    Poor <input type="radio" name="visibility" onChange={() => setNewVisiblity('poor')}/>  
                </span><br/>
                <span>Comment:  <input value={newComment} onChange={(event) => setNewComment(event.target.value)}/></span><br/>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default NewEntry;