import { v1 as uuid } from 'uuid';

import patientData from "../../data/patients";
import { Patient, NonConfidentialPatient, NewPatient } from "../types";

const patients: Patient[] = patientData;

const getPatients = (): Patient[] => {
    return patients;
};

const getNonConfidentialPatient = (): NonConfidentialPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addNewPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient
    };

    patients.push(newPatient);
    return newPatient;
};

export default {
    getPatients,
    getNonConfidentialPatient,
    addNewPatient
};