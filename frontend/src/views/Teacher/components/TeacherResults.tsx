import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function TeacherResults() {
  const poll = useSelector((s: RootState) => s.poll.current);

  if (!poll) {
    return (
      <section className="p-6 rounded-2xl border bg-white">
        <p className="text-gray-500">No active poll. Create one to see live results.</p>
      </section>
    );
  }

  const totalVotes = poll.options.reduce((acc, o) => acc + o.votes, 0) || 1;

  return (
    <section className="p-6 rounded-2xl border bg-white space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Live Results</h2>
        <span className="text-sm text-gray-500">{poll.isOpen ? 'Open' : 'Closed'}</span>
      </div>
      <h3 className="text-xl font-semibold">{poll.question}</h3>
      <div className="space-y-3">
        {poll.options.map((o) => {
          const pct = Math.round((o.votes / totalVotes) * 100);
          return (
            <div key={o.id} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{o.text}</span>
                <span>{pct}%</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-brand-500" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}


