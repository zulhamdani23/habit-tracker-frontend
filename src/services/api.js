import axios from "axios";
const API_URL = "http://localhost:5000";
const API_KEY = "kjdhgskjdgfnieubskniu894256520987t8hg9487";

const api = {
  getHabitList: async () => {
    const { data } = await axios.get(`${API_URL}/habits`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return data.data || data;
  },

  putHabit: async (payload) => {
    const { data } = await axios.put(`${API_URL}/update`, payload, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return data.data || data;
  },

  postHabitProgress: async (payload) => {
    try {
      const { data } = await axios.post(`${API_URL}/habit/progress`, payload, {
          headers: {
              "Content-Type": "application/json",
          },
      });
      return data.data || data;
    } catch (error) {
      return error
    }
  }
};

export default api;
