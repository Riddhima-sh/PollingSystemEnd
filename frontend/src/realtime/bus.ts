type EventMap =
  | { type: 'students:upsert'; payload: { id: string; name: string } }
  | { type: 'students:remove'; payload: { id: string } }
  | { type: 'poll:create'; payload: { question: string; options: string[]; timeLimitSeconds?: number } }
  | { type: 'poll:close' }
  | { type: 'poll:answer'; payload: { studentId: string; optionId: string } }
  | { type: 'chat:message'; payload: { from: 'teacher' | 'student'; fromId?: string; text: string } };

const CHANNEL = 'polling_realtime_channel_v1';

export function broadcast(event: EventMap) {
  const bc = new BroadcastChannel(CHANNEL);
  bc.postMessage(event);
  bc.close();
}

export function subscribe(handler: (event: EventMap) => void) {
  const bc = new BroadcastChannel(CHANNEL);
  bc.onmessage = (e) => handler(e.data as EventMap);
  return () => bc.close();
}


