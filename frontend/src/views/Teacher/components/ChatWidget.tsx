import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { addMessage } from '@/store/slices/chatSlice';
import { useRealtimeTeacher } from '../hooks/useRealtimeTeacher';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const messages = useSelector((s: RootState) => s.chat.messages);
  const { broadcastChat } = useRealtimeTeacher();

  function onSend(e: FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(addMessage('teacher', text.trim()));
    broadcastChat(text.trim());
    setText('');
  }

  return (
    <div className="fixed bottom-4 right-4">
      <button
        className="h-12 px-4 rounded-full bg-brand-600 text-white shadow-lg"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? 'Close Chat' : 'Chat'}
      </button>
      {open && (
        <div className="mt-3 w-80 rounded-2xl border bg-white shadow-xl flex flex-col max-h-96">
          <div className="p-3 border-b font-medium">Class Chat</div>
          <div className="flex-1 overflow-auto p-3 space-y-2">
            {messages.map((m) => (
              <div key={m.id} className={m.from === 'teacher' ? 'text-right' : 'text-left'}>
                <span className="inline-block px-3 py-2 rounded-xl bg-gray-100">{m.text}</span>
              </div>
            ))}
          </div>
          <form onSubmit={onSend} className="p-3 border-t flex gap-2">
            <input
              className="flex-1 h-10 px-3 rounded-lg border"
              placeholder="Type a message"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button className="px-4 h-10 rounded-lg bg-brand-600 text-white">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}


