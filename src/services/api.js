import axios from "axios";
const API_URL = "http://localhost:5000/api";
const API_KEY = "kjdhgskjdgfnieubskniu894256520987t8hg9487";

const api = {
  getHabitList: async () => {
    const { data } = await axios.get(`${API_URL}/habit/list`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return data.data || data;
  },

  putHabit: async (p) => {
    const body = {
      id: p.id,
      idHabit: p.idHabit,
      isDone: p.isDone,
      year: String(p.year),
      month: String(p.month),
      day: String(p.day)
    }
    const { data } = await axios.post(`${API_URL}/habitTracker/progress`, body, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return data.data || data;
  },

  postHabitProgress: async (payload) => {
    try {
      const result = await axios.post(`${API_URL}/habitTracker/summary`, payload, {
          headers: {
              "Content-Type": "application/json",
          },
      });

      return result.data.data
    } catch (error) {
      return error
    }
  }
};

export default api;
