import { useState, useEffect} from 'react';

import diagnosisService from '../../services/diagnosis';
import { Diagnosis } from '../../types';

interface Props {
    codes: string[] | undefined
}

const DiagnosisCodes = ({ codes }: Props) => {
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
    
    useEffect(() => {
        diagnosisService
          .getAll()
          .then(data => {
            setDiagnoses(data);
          })
          .catch(Error);
      }, []);

    if (!codes) {
        return null;
    }
    return (
        <ul>
            {codes.map(code => {
                return diagnoses.map((diagnoses, i) => {
                    if(diagnoses.code === code) {
                        return <li key={i}>{diagnoses.code}: {diagnoses.name}</li>;
                    } else return null;
                });
            })}
        </ul>
    );
};

export default DiagnosisCodes;