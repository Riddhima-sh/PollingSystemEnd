import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { broadcast, subscribe } from '@/realtime/bus';
import { addMessage } from '@/store/slices/chatSlice';
import { submitAnswer } from '@/store/slices/pollSlice';
import { removeStudent, upsertStudent } from '@/store/slices/studentsSlice';

export function useRealtimeTeacher() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = subscribe((evt) => {
      switch (evt.type) {
        case 'students:upsert':
          dispatch(upsertStudent({ id: evt.payload.id, name: evt.payload.name, isRemoved: false }));
          break;
        case 'students:remove':
          dispatch(removeStudent(evt.payload.id));
          break;
        case 'poll:answer':
          dispatch(submitAnswer({ studentId: evt.payload.studentId, optionId: evt.payload.optionId }));
          break;
        case 'chat:message':
          dispatch(addMessage(evt.payload.from, evt.payload.text, evt.payload.fromId));
          break;
        default:
          break;
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return {
    broadcastCreatePoll: (question: string, options: string[], timeLimitSeconds?: number) =>
      broadcast({ type: 'poll:create', payload: { question, options, timeLimitSeconds } }),
    broadcastClosePoll: () => broadcast({ type: 'poll:close' }),
    broadcastRemoveStudent: (id: string) => broadcast({ type: 'students:remove', payload: { id } }),
    broadcastChat: (text: string) => broadcast({ type: 'chat:message', payload: { from: 'teacher', text } })
  } as const;
}


