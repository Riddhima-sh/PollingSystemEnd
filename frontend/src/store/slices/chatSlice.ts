import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

export interface ChatMessage {
  id: string;
  from: 'teacher' | 'student';
  fromId?: string; // student id when from student
  text: string;
  createdAt: number;
}

interface ChatState {
  messages: ChatMessage[];
}

const initialState: ChatState = {
  messages: []
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: {
      reducer(state, action: PayloadAction<ChatMessage>) {
        state.messages.push(action.payload);
      },
      prepare(from: 'teacher' | 'student', text: string, fromId?: string) {
        return { payload: { id: nanoid(), from, text, createdAt: Date.now(), fromId } as ChatMessage };
      }
    },
    resetChat() {
      return initialState;
    }
  }
});

export const { addMessage, resetChat } = chatSlice.actions;
export default chatSlice.reducer;


