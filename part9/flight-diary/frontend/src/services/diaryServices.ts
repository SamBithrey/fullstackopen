import axios from "axios";

import { baseURL } from "../constants";

import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from "../types";

const getAll = () => {
  return axios
    .get<NonSensitiveDiaryEntry[]>(`${baseURL}/diaries`)
    .then(res => res.data);
};

const createNewEntry = async (newEntry: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>(`${baseURL}/diaries`, newEntry)
    .then(res => res.data);
};

export default {
    getAll,
    createNewEntry,
};