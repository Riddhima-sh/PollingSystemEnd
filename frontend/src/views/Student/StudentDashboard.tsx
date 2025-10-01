import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { useEffect, useMemo, useRef, useState } from "react";
import { submitAnswer } from "@/store/slices/pollSlice";
import { upsertStudent } from "@/store/slices/studentsSlice";
import ChatWidget from "./components/ChatWidget";
import { useRealtimeStudent } from "./hooks/useRealtimeStudent";
import Header from "@/components/ui/Header";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

function getOrCreateTabId(): string {
  const key = "poll_tab_id";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
}

export default function StudentDashboard() {
  const dispatch = useDispatch();
  const poll = useSelector((s: RootState) => s.poll.current);
  const [name, setName] = useState<string>(
    () => sessionStorage.getItem("student_name") || ""
  );
  const [submitted, setSubmitted] = useState(false);
  const timerRef = useRef<number>(0);
  const intervalRef = useRef<number | null>(null);

  const tabId = useMemo(() => getOrCreateTabId(), []);
  const { sendAnswer } = useRealtimeStudent(tabId, name);

  useEffect(() => {
    if (name) {
      sessionStorage.setItem("student_name", name);
      dispatch(upsertStudent({ id: tabId, name, isRemoved: false }));
    }
  }, [name, tabId, dispatch]);

  useEffect(() => {
    if (poll?.isOpen) {
      const limit = poll.timeLimitSeconds ?? 60;
      timerRef.current = limit;
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      intervalRef.current = window.setInterval(() => {
        timerRef.current -= 1;
        if (timerRef.current <= 0) {
          window.clearInterval(intervalRef.current!);
          intervalRef.current = null;
        }
      }, 1000);
      setSubmitted(false);
    }
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [poll?.id, poll?.isOpen, poll?.timeLimitSeconds]);

  function onSubmit(optionId: string) {
    if (!poll?.isOpen || submitted || !name) return;
    dispatch(submitAnswer({ studentId: tabId, optionId }));
    sendAnswer(optionId);
    setSubmitted(true);
  }

  if (!name) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md space-y-4">
          <h1 className="text-xl font-semibold text-center">Enter your name</h1>
          <Input
            placeholder="e.g. Alex"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button disabled={!name.trim()} onClick={() => setName(name.trim())}>
            Continue
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-10">
      <div className="max-w-2xl mx-auto space-y-6">
        <Header title={`Hi, ${name}`} />
        {poll?.isOpen && (
          <div className="text-sm text-gray-600">
            Time left: {Math.max(timerRef.current, 0)}s
          </div>
        )}

        {!poll && (
          <Card className="text-gray-500">
            Waiting for the teacher to start a poll...
          </Card>
        )}

        {poll && (
          <Card className="space-y-4">
            <h2 className="text-xl font-semibold">{poll.question}</h2>
            <div className="grid gap-3">
              {poll.options.map((o) => (
                <Button
                  key={o.id}
                  variant="ghost"
                  disabled={!poll.isOpen || submitted || timerRef.current <= 0}
                  onClick={() => onSubmit(o.id)}
                >
                  {o.text}
                </Button>
              ))}
            </div>

            {(submitted || !poll.isOpen) && (
              <div className="pt-2 border-t mt-2">
                <p className="text-sm text-gray-600 mb-2">Live results</p>
                <div className="space-y-2">
                  {poll.options.map((o) => {
                    const total =
                      poll.options.reduce((a, b) => a + b.votes, 0) || 1;
                    const pct = Math.round((o.votes / total) * 100);
                    return (
                      <div key={o.id}>
                        <div className="flex justify-between text-sm">
                          <span>{o.text}</span>
                          <span>{pct}%</span>
                        </div>
                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-brand-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </Card>
        )}
        <ChatWidget studentId={tabId} name={name} />
      </div>
    </div>
  );
}
