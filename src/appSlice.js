import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  responses: [],
  currentPage: '',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addResponse: (state, action) => {
      const newResponse = {
        question: action.payload.question || "",
        summary: action.payload.summary || "",
        result_text: action.payload.result_text || "",
        result_table_path: action.payload.result_table_path || "",
        result_visualization_path: action.payload.result_visualization_path || "",
        error: action.payload.error || ""
      };
      state.responses.push(newResponse);
    },
    setResponses: (state, action) => {
      state.responses = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    clearResponses: (state) => {
      state.responses = [];
    },
  },
});

export const { addResponse, setResponses, setCurrentPage, clearResponses } = appSlice.actions;

export default appSlice.reducer;
