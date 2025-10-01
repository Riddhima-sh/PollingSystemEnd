import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import pollReducer from './slices/pollSlice';
import studentsReducer from './slices/studentsSlice';
import chatReducer from './slices/chatSlice';
import pastPollsReducer from './slices/pastPollsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    poll: pollReducer,
    students: studentsReducer,
    chat: chatReducer,
    pastPolls: pastPollsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


