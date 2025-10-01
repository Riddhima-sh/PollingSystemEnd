import { createBrowserRouter } from 'react-router-dom';
import RoleGate from './views/RoleGate';
import TeacherDashboard from './views/Teacher/TeacherDashboard';
import StudentDashboard from './views/Student/StudentDashboard';

export const router = createBrowserRouter([
  { path: '/', element: <RoleGate /> },
  { path: '/teacher', element: <TeacherDashboard /> },
  { path: '/student', element: <StudentDashboard /> }
]);


