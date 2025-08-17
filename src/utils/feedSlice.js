import { createSlice } from '@reduxjs/toolkit';

const feedSlice = createSlice({
  name: 'feed',
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeRequestFeed: (state, action) => {
      const newFeed = state.filter((feed) => feed.id !== action.payload);
      return newFeed;
    },
  },
});

export const { addFeed, removeRequestFeed } = feedSlice.actions;

export default feedSlice.reducer;
