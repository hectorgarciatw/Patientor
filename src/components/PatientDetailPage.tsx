import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import patientService from "../services/patients";
import { Typography, Box, CircularProgress } from "@mui/material";

const PatientDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = useState<Patient | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const fetchedPatient = await patientService.getById(id!);
                setPatient(fetchedPatient);
            } catch (error) {
                console.error("Error fetching patient:", error);
                setPatient(null);
            } finally {
                setLoading(false);
            }
        };

        fetchPatient();
    }, [id]);

    if (loading) {
        return <CircularProgress />;
    }

    if (!patient) {
        return <Typography variant="h6">No se encontró el paciente.</Typography>;
    }

    return (
        <Box>
            <Typography variant="h4">{patient.name}</Typography>
            <Typography variant="subtitle1">Gender: {patient.gender}</Typography>
            <Typography variant="subtitle1">Occupation: {patient.occupation}</Typography>
            <Typography variant="subtitle1">Date of Birth: {patient.dateOfBirth}</Typography>
            <Typography variant="subtitle1">SSN: {patient.ssn}</Typography>
        </Box>
    );
};

export default PatientDetailPage;
