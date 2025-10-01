import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function PastPolls() {
  const past = useSelector((s: RootState) => s.pastPolls.list);

  if (!past.length) {
    return (
      <section className="p-6 rounded-2xl border bg-white">
        <h2 className="text-lg font-medium mb-2">Past Polls</h2>
        <p className="text-gray-500">No past polls yet.</p>
      </section>
    );
  }

  return (
    <section className="p-6 rounded-2xl border bg-white">
      <h2 className="text-lg font-medium mb-4">Past Polls</h2>
      <ul className="space-y-4">
        {past.map((p) => (
          <li key={p.id} className="space-y-2">
            <div className="font-semibold">{p.question}</div>
            <div className="grid gap-2">
              {p.options.map((o) => {
                const total = p.options.reduce((a, b) => a + b.votes, 0) || 1;
                const pct = Math.round((o.votes / total) * 100);
                return (
                  <div key={o.id}>
                    <div className="flex justify-between text-sm">
                      <span>{o.text}</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-500" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}


