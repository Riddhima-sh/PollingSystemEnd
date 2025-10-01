# Live Polling System (Frontend Only)

This is a deployable React + Vite + TypeScript frontend for a live polling system featuring two roles: Teacher and Student. Realtime is simulated across tabs/windows on the same device using the BroadcastChannel API.

Design reference: [Figma - Intervue Assignment Poll System](https://www.figma.com/design/HV3qQ0nykxle3Rmlxb4xNG/Intervue-Assigment--Poll-system--Copy-?node-id=0-1&p=f&t=YdHTr5zRcPsfsxxW-0)

## Tech
- React 18, TypeScript, Vite 5
- Redux Toolkit, React Router
- Tailwind CSS
- BroadcastChannel (realtime simulation)

## Quick Start

```bash
# from the repository root
cd frontend
npm install
npm run dev
```

Open two browser windows: one as Teacher (`/teacher`), another as Student (`/student`).

## Production Build

```bash
npm run build
npm run preview
```

## Features
- Teacher: create poll (question + options + optional time limit), live results, close poll, remove students, view past polls.
- Student: enter unique name per tab, answer within time limit (defaults to 60s), see live results after submission.
- Chat: simple teacher-student chat popup.
- Realtime: BroadcastChannel simulates Socket.io across tabs.

## Notes
- Without a backend, data exists only per browser session and shares across tabs in the same browser profile.
- Replacing BroadcastChannel with Socket.io would be straightforward by swapping the `src/realtime` layer.
