import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Poll } from './pollSlice';

interface PastPollsState {
  list: Poll[];
}

const initialState: PastPollsState = {
  list: []
};

const pastPollsSlice = createSlice({
  name: 'pastPolls',
  initialState,
  reducers: {
    addPastPoll(state, action: PayloadAction<Poll>) {
      state.list.unshift(action.payload);
    },
    resetPastPolls() {
      return initialState;
    }
  }
});

export const { addPastPoll, resetPastPolls } = pastPollsSlice.actions;
export default pastPollsSlice.reducer;


