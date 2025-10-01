import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Student {
  id: string; // per-tab unique identifier
  name: string; // user-provided name
  isRemoved: boolean;
}

interface StudentsState {
  list: Student[];
}

const initialState: StudentsState = {
  list: []
};

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    upsertStudent(state, action: PayloadAction<Student>) {
      const s = action.payload;
      const existingIndex = state.list.findIndex((x) => x.id === s.id);
      if (existingIndex >= 0) state.list[existingIndex] = s;
      else state.list.push(s);
    },
    removeStudent(state, action: PayloadAction<string>) {
      const id = action.payload;
      const student = state.list.find((s) => s.id === id);
      if (student) student.isRemoved = true;
    },
    resetStudents() {
      return initialState;
    }
  }
});

export const { upsertStudent, removeStudent, resetStudents } = studentsSlice.actions;
export default studentsSlice.reducer;


