import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
    res.json(patientService.getNonConfidentialPatient());
});

patientRouter.get('/:id', (req, res) => {
    const patients = patientService.getPatients();
    const patient = patients.find(patient => patient.id === req.params.id);
    res.json(patient);
});

patientRouter.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientService.addNewPatient(newPatient);
        res.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += 'Error: '+  error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default patientRouter;