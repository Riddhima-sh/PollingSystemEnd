import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  isOpen: boolean;
  timeLimitSeconds?: number; // optional configurable time limit
  createdAt: number;
  closedAt?: number;
}

interface PollState {
  current: Poll | null;
  answersByStudentId: Record<string, string>; // studentName -> optionId
}

const initialState: PollState = {
  current: null,
  answersByStudentId: {}
};

const pollSlice = createSlice({
  name: 'poll',
  initialState,
  reducers: {
    createPoll: {
      reducer(state, action: PayloadAction<Poll>) {
        state.current = action.payload;
        state.answersByStudentId = {};
      },
      prepare(question: string, options: string[], timeLimitSeconds?: number) {
        return {
          payload: {
            id: nanoid(),
            question,
            options: options.map((text) => ({ id: nanoid(), text, votes: 0 })),
            isOpen: true,
            timeLimitSeconds,
            createdAt: Date.now()
          } as Poll
        };
      }
    },
    closePoll(state) {
      if (state.current) {
        state.current.isOpen = false;
        state.current.closedAt = Date.now();
      }
    },
    submitAnswer(state, action: PayloadAction<{ studentId: string; optionId: string }>) {
      const { studentId, optionId } = action.payload;
      if (!state.current || !state.current.isOpen) return;
      if (state.answersByStudentId[studentId]) return; // one answer per student
      const option = state.current.options.find((o) => o.id === optionId);
      if (option) {
        option.votes += 1;
        state.answersByStudentId[studentId] = optionId;
      }
    },
    resetPollState() {
      return initialState;
    }
  }
});

export const { createPoll, closePoll, submitAnswer, resetPollState } = pollSlice.actions;
export default pollSlice.reducer;


