// Application constants

// API endpoints
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const API_ENDPOINTS = {
  exercises: `${API_URL}/exercises`,
  startSession: `${API_URL}/start_session`,
  completeSession: `${API_URL}/complete_session`,
  suggestions: `${API_URL}/suggestions`,
};

// Exercise video URLs
export const EXERCISE_VIDEOS = {
  shoulderRotation: 'https://www.youtube.com/watch?v=5zGZ1TqRlfw',
  kneeRaises: 'https://www.youtube.com/watch?v=1iD88vHg-8c',
  armLifts: 'https://www.youtube.com/watch?v=FJf4bL6I_2g',
  legExtensions: 'https://www.youtube.com/watch?v=z8NKcRMkE_I',
};

// Dashboard tabs
export const DASHBOARD_TABS = [
  { id: 'overview', label: 'Overview', icon: 'layout-dashboard' },
  { id: 'patients', label: 'Patients', icon: 'users' },
  { id: 'tracking', label: 'Motion Tracking', icon: 'activity' },
  { id: 'exercises', label: "Start Today's Exercise", icon: 'play' },
];

// Exercise difficulty levels
export const DIFFICULTY_LEVELS = {
  easy: { label: 'Easy', color: 'bg-green-100 text-green-800' },
  medium: { label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  hard: { label: 'Hard', color: 'bg-red-100 text-red-800' },
};

// Session status
export const SESSION_STATUS = {
  completed: { label: 'Completed', color: 'bg-green-100 text-green-800' },
  inProgress: { label: 'In Progress', color: 'bg-blue-100 text-blue-800' },
  notStarted: { label: 'Not Started', color: 'bg-gray-100 text-gray-800' },
};

// Default exercises data
export const DEFAULT_EXERCISES = [
  {
    id: 'shoulder-rotation',
    name: 'Shoulder Rotation',
    description: 'Gentle rotation exercise to improve shoulder mobility and reduce stiffness.',
    thumbnailUrl: 'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    videoUrl: 'https://www.youtube.com/embed/5zGZ1TqRlfw',
    difficulty: 'easy',
    bodyPart: 'shoulder',
    estimatedDuration: 5,
    recommendedReps: 10,
    instructions: [
      'Stand or sit with your arms at your sides and elbows bent at 90 degrees',
      'Keeping your elbows close to your body, rotate your forearms outward',
      'Hold briefly, then return to the starting position',
      'Repeat for the recommended number of repetitions'
    ]
  },
  {
    id: 'knee-raises',
    name: 'Knee Raises',
    description: 'Controlled knee lifting exercise to strengthen core and improve lower body mobility.',
    thumbnailUrl: 'https://images.pexels.com/photos/6551144/pexels-photo-6551144.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    videoUrl: 'https://www.youtube.com/embed/1iD88vHg-8c',
    difficulty: 'medium',
    bodyPart: 'knee',
    estimatedDuration: 7,
    recommendedReps: 12,
    instructions: [
      'Stand straight with feet shoulder-width apart',
      'Slowly raise one knee toward your chest, keeping your back straight',
      'Hold for 1-2 seconds, then lower your leg back down',
      'Alternate between legs for the recommended repetitions'
    ]
  },
  {
    id: 'arm-lifts',
    name: 'Arm Lifts',
    description: 'Controlled arm raising exercise to improve shoulder mobility and upper body strength.',
    thumbnailUrl: 'https://images.pexels.com/photos/6551063/pexels-photo-6551063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    videoUrl: 'https://www.youtube.com/embed/FJf4bL6I_2g',
    difficulty: 'easy',
    bodyPart: 'arm',
    estimatedDuration: 5,
    recommendedReps: 10,
    instructions: [
      'Stand or sit with arms at your sides',
      'Slowly raise your arms in front of you until they\'re at shoulder height',
      'Hold briefly, then lower back down with control',
      'Repeat for the recommended number of repetitions'
    ]
  },
  {
    id: 'leg-extensions',
    name: 'Leg Extensions',
    description: 'Seated leg extension exercise to strengthen quadriceps and improve knee stability.',
    thumbnailUrl: 'https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    videoUrl: 'https://www.youtube.com/embed/z8NKcRMkE_I',
    difficulty: 'hard',
    bodyPart: 'leg',
    estimatedDuration: 8,
    recommendedReps: 8,
    instructions: [
      'Sit on a chair with feet flat on the floor',
      'Slowly extend one leg straight out in front of you',
      'Hold for 2-3 seconds, focusing on engaging your quadriceps',
      'Lower your leg back down and repeat with the other leg',
      'Alternate between legs for the recommended repetitions'
    ]
  }
];

// Mock session data
export const MOCK_SESSIONS = [
  {
    id: 'session1',
    userId: 'user1',
    exerciseId: 'shoulder-rotation',
    startTime: new Date('2025-06-01T10:00:00'),
    endTime: new Date('2025-06-01T10:08:00'),
    repsCounted: 8,
    completed: true,
    duration: 480,
    performance: 85,
    notes: 'Felt good, slight discomfort at max rotation'
  },
  {
    id: 'session2',
    userId: 'user1',
    exerciseId: 'knee-raises',
    startTime: new Date('2025-06-02T11:00:00'),
    endTime: new Date('2025-06-02T11:10:00'),
    repsCounted: 10,
    completed: true,
    duration: 600,
    performance: 90,
    notes: 'No pain, completed all reps with good form'
  },
  {
    id: 'session3',
    userId: 'user1',
    exerciseId: 'arm-lifts',
    startTime: new Date('2025-06-03T09:30:00'),
    endTime: new Date('2025-06-03T09:37:00'),
    repsCounted: 12,
    completed: true,
    duration: 420,
    performance: 95,
    notes: 'Very smooth session, increased reps from last time'
  }
];