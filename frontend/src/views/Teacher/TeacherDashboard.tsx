import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { addPastPoll } from "@/store/slices/pastPollsSlice";
import { closePoll, createPoll } from "@/store/slices/pollSlice";
import { removeStudent } from "@/store/slices/studentsSlice";
import { useMemo, useState } from "react";
import TeacherResults from "./components/TeacherResults";
import ChatWidget from "./components/ChatWidget";
import { useRealtimeTeacher } from "./hooks/useRealtimeTeacher";
import PastPolls from "./components/PastPolls";
import Header from "@/components/ui/Header";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function TeacherDashboard() {
  const dispatch = useDispatch();
  const current = useSelector((s: RootState) => s.poll.current);
  const students = useSelector((s: RootState) => s.students.list);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<string[]>(["", ""]);
  const [timeLimit, setTimeLimit] = useState<number | undefined>(60);
  const { broadcastCreatePoll, broadcastClosePoll, broadcastRemoveStudent } =
    useRealtimeTeacher();

  const canCreate = useMemo(() => {
    return (
      question.trim().length > 0 &&
      options.filter((o) => o.trim()).length >= 2 &&
      !current?.isOpen
    );
  }, [question, options, current]);

  function onCreate() {
    if (!canCreate) return;
    dispatch(
      createPoll(
        question.trim(),
        options.filter(Boolean).map((s) => s.trim()),
        timeLimit
      )
    );
    broadcastCreatePoll(
      question.trim(),
      options.filter(Boolean).map((s) => s.trim()),
      timeLimit
    );
    setQuestion("");
    setOptions(["", ""]);
  }

  function onClose() {
    if (!current) return;
    dispatch(closePoll());
    broadcastClosePoll();
    dispatch(addPastPoll({ ...current, isOpen: false, closedAt: Date.now() }));
  }

  return (
    <div className="min-h-screen p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        <Header title="Teacher Dashboard" />

        <section className="grid md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 space-y-4">
            <h2 className="text-lg font-medium">Create Poll</h2>
            <Input
              placeholder="Enter your question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={!!current?.isOpen}
            />
            <div className="space-y-2">
              {options.map((opt, idx) => (
                <Input
                  key={idx}
                  placeholder={`Option ${idx + 1}`}
                  value={opt}
                  onChange={(e) => {
                    const next = [...options];
                    next[idx] = e.target.value;
                    setOptions(next);
                  }}
                  disabled={!!current?.isOpen}
                />
              ))}
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setOptions((o) => [...o, ""])}
                  disabled={!!current?.isOpen}
                >
                  Add option
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setOptions((o) => (o.length > 2 ? o.slice(0, -1) : o))
                  }
                  disabled={!!current?.isOpen || options.length <= 2}
                >
                  Remove last
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-600">
                Time limit (seconds)
              </label>
              <Input
                type="number"
                min={10}
                step={5}
                value={timeLimit ?? 60}
                onChange={(e) =>
                  setTimeLimit(Number(e.target.value) || undefined)
                }
                disabled={!!current?.isOpen}
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={onCreate} disabled={!canCreate}>
                Start Poll
              </Button>
              {current?.isOpen && (
                <Button variant="ghost" onClick={onClose}>
                  Close Poll
                </Button>
              )}
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-medium mb-3">Students</h2>
            <ul className="space-y-2 max-h-60 overflow-auto pr-2">
              {students.map((s) => (
                <li
                  key={s.id}
                  className="flex items-center justify-between gap-3"
                >
                  <span
                    className={s.isRemoved ? "line-through text-gray-400" : ""}
                  >
                    {s.name}
                  </span>
                  {!s.isRemoved && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        dispatch(removeStudent(s.id));
                        broadcastRemoveStudent(s.id);
                      }}
                    >
                      Remove
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          </Card>
        </section>

        <TeacherResults />
        <PastPolls />
        <ChatWidget />
      </div>
    </div>
  );
}
