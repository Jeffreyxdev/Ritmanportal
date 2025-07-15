import API from './authAPI'; // Axios instance with token

export const getStudentResults = (level: string, semester: string) =>
  API.get(`/results/me?level=${level}&semester=${semester}`);
