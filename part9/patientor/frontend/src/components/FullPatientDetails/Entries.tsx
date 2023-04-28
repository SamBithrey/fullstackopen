import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

import DiagnosisCodes from "./DiagnosisCodes";

import { Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from "../../types";

const styles = {border:"2px solid black", margin:"5px", borderRadius:"15px 50px 30px", paddingLeft: "20px"};

interface Props {
    entry: Entry
}

interface HopstialProps {
    entry: HospitalEntry
}

const HospitalEntries = ({ entry }: HopstialProps) => {
    return (
        <div style={styles}>
            <p>{entry.date} <LocalHospitalIcon /></p>
            <p><i>{entry.description}</i></p>
            <DiagnosisCodes codes={entry.diagnosisCodes} />
            <p>Discharged: {entry.discharge.date}</p>
            <p>Seen by {entry.specialist}</p>
        </div>
    );
};

interface OccupationalProps {
    entry: OccupationalHealthcareEntry
}

const OccupationalHealthcareEntries = ({ entry }: OccupationalProps) => {
    return (
        <div style={styles}>
            <p>{entry.date} <WorkIcon /> {entry.employerName}</p>
            <p><i>{entry.description}</i></p>
            <DiagnosisCodes codes={entry.diagnosisCodes} />
            <p>Sick Leave: {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}</p>
            <p>Seen by {entry.specialist}</p>
        </div>
    );
};

interface CheckProps {
    entry: HealthCheckEntry
}


const HealthCheckEntries = ({ entry }: CheckProps) => {
    return (
        <div style={styles}>
            <p>{entry.date} <MonitorHeartIcon /></p>
            <p><i>{entry.description}</i></p>
            <DiagnosisCodes codes={entry.diagnosisCodes} />
            <p>Health Check Rating: {entry.healthCheckRating}</p>
            <p>Seen by {entry.specialist}</p>
        </div>
    );
};

const Entries = ({ entry }: Props) => {
    switch (entry.type) {
        case ('Hospital'):
            return <HospitalEntries entry={entry} />;
        case ('OccupationalHealthcare'):
            return <OccupationalHealthcareEntries entry={entry} />;
        case ('HealthCheck'):
            return <HealthCheckEntries entry={entry} />;
    }
};

export default Entries;