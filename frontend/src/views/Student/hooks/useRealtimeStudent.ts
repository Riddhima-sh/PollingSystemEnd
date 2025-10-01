import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { broadcast, subscribe } from '@/realtime/bus';
import { addMessage } from '@/store/slices/chatSlice';
import { closePoll, createPoll } from '@/store/slices/pollSlice';

export function useRealtimeStudent(studentId: string, name: string) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (name) {
      broadcast({ type: 'students:upsert', payload: { id: studentId, name } });
    }
  }, [studentId, name]);

  useEffect(() => {
    const unsubscribe = subscribe((evt) => {
      switch (evt.type) {
        case 'poll:create':
          dispatch(createPoll(evt.payload.question, evt.payload.options, evt.payload.timeLimitSeconds));
          break;
        case 'poll:close':
          dispatch(closePoll());
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
    sendAnswer: (optionId: string) => broadcast({ type: 'poll:answer', payload: { studentId, optionId } }),
    sendChat: (text: string) => broadcast({ type: 'chat:message', payload: { from: 'student', text, fromId: studentId } })
  } as const;
}


