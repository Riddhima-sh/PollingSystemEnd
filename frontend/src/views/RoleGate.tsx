import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setRole } from "@/store/slices/authSlice";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function RoleGate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Select Role - Live Polling";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Card className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-semibold text-center">Choose your role</h1>
        <div className="grid grid-cols-1 gap-4">
          <Button
            onClick={() => {
              dispatch(setRole("teacher"));
              navigate("/teacher");
            }}
          >
            Continue as Teacher
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              dispatch(setRole("student"));
              navigate("/student");
            }}
          >
            Continue as Student
          </Button>
        </div>
      </Card>
    </div>
  );
}
