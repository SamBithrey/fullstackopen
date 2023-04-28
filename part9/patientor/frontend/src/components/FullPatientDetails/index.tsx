import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

import patientService from "../../services/patients";
import Entries from "./Entries";

import { Patient } from "../../types";

const FullPatientDetails = () => {
    const id = useParams().id;
    const [ patient, setPatient] = useState<Patient>();

    useEffect(() => {
        patientService
          .getSingle(id)
          .then(data => {
            setPatient(data);
          })
          .catch(Error);
      }, [id]);

    if(!patient) {
        return null;
    }
    const genderIcon = () => {
        switch(patient.gender) {
            case('male'):
                return <MaleIcon />;
            case('female'):
                return <FemaleIcon />;
            case('other'):
                return <TransgenderIcon />;
        }
    };

    return (
        <div>
            <h2>{patient.name} {genderIcon()}</h2>
            <p>SSN: {patient.ssn}</p>
            <p>Occupation: {patient.occupation}</p>
            <h3>Entries</h3>
            {patient.entries.map(entry => {
                return <Entries entry={entry} key={entry.id}/>;
            })}
        </div>
    );    
};

export default FullPatientDetails;