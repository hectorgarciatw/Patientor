import axios from "axios";
import { Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

//Get all the patients
const getAll = async () => {
    const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
    return data;
};

// Get a specific patient by id
const getById = async (id: string) => {
    const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
    return data;
};

//Creates a new patient
const create = async (object: PatientFormValues) => {
    const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

    return data;
};

export default {
    getAll,
    getById,
    create,
};
