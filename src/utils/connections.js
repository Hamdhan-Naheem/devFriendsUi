import { createSlice } from '@reduxjs/toolkit';

const connectionSlice = createSlice({
  name: 'connections',
  initialState: null,
  reducers: {
    addConnection: (state, action) => {
      return action.payload;
    },

    removeConnections: () => null,
  },
});

export const { addConnection, removeConnections } = connectionSlice.actions;

export const connectionReducer = connectionSlice.reducer;
