export const patientData = {
  name: 'Hendrita Hayes',
  id: 'PT254654',
  age: 32,
  gender: 'Female',
  lastVisit: '25 Mar 2024'
};

export const healthRecords = [
  { name: 'Heart Rate', value: '140 Bpm', change: '2%', icon: 'fa-solid fa-heart', color: 'icon-orange' },
  { name: 'Body Temperature', value: '37.5 C', change: '', icon: 'fa-solid fa-temperature-high', color: 'icon-amber' },
  { name: 'Glucose Level', value: '70 - 90', change: '8%', icon: 'fa-solid fa-notes-medical', color: 'icon-dark-blue' },
  { name: 'SPo2', value: '96%', change: '', icon: 'fa-solid fa-highlighter', color: 'icon-blue' },
  { name: 'Blood Pressure', value: '100 mg/dl', change: '2%', icon: 'fa-solid fa-syringe', color: 'icon-red' },
  { name: 'BMI', value: '20.1 kg/m2', change: '', icon: 'fa-solid fa-user-pen', color: 'icon-purple' }
];

export const notifications = [
  { 
    id: 1, 
    message: 'Booking Confirmed on 21 Mar 2024', 
    time: 'Just Now',
    icon: 'fa-solid fa-bell',
    color: 'color-violet'
  },
  { 
    id: 2, 
    message: 'You have a New Review for your Appointment', 
    time: '5 Days ago',
    icon: 'fa-solid fa-star',
    color: 'color-blue'
  },
  { 
    id: 3, 
    message: 'You have Appointment with Ahmed', 
    time: '12:55 PM',
    icon: 'isax isax-calendar-tick5',
    color: 'color-red'
  },
  { 
    id: 4, 
    message: 'Sent an amount of $200 for an Appointment', 
    time: '2 Days ago',
    icon: 'fa-solid fa-money-bill-1-wave',
    color: 'color-yellow'
  }
];

export const appointments = [
  {
    id: 1,
    doctor: 'Dr. Edalin Hendry',
    specialty: 'Dental Specialist',
    date: 'Thursday, Mar 2024',
    time: '04:00 PM - 04:30 PM (30 Min)',
    location: 'Newyork, United States',
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMjQiIGZpbGw9IiM2NjdFRUEiLz4KPGNpcmNsZSBjeD0iMjUiIGN5PSIxOCIgcj0iOCIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTggMzVjMC0xMC41IDcuNS0xOSAxNy0xOWgxMEMzNC41IDE2IDQyIDI0LjUgNDIgMzVWNDJIOFYzNVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo='
  }
];

export const dependents = [
  {
    id: 1,
    name: 'Laura',
    relationship: 'Mother',
    age: '58 years 20 days',
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMjQiIGZpbGw9IiM2NjdFRUEiLz4KPGNpcmNsZSBjeD0iMjUiIGN5PSIxOCIgcj0iOCIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTggMzVjMC0xMC41IDcuNS0xOSAxNy0xOWgxMEMzNC41IDE2IDQyIDI0LjUgNDIgMzVWNDJIOFYzNVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo='
  },
  {
    id: 2,
    name: 'Mathew',
    relationship: 'Father',
    age: '59 years 15 days',
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMjQiIGZpbGw9IiM2NjdFRUEiLz4KPGNpcmNsZSBjeD0iMjUiIGN5PSIxOCIgcj0iOCIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTggMzVjMC0xMC41IDcuNS0xOSAxNy0xOWgxMEMzNC41IDE2IDQyIDI0LjUgNDIgMzVWNDJIOFYzNVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo='
  }
];
