export const specialtyData = [
  {
    specialty: "Cardiologist",
    image: "Cardiologist.jpeg",
  },
  {
    specialty: "Dermatologist",
    image: "Dermatologist.jpeg",
  },
  {
    specialty: "Pediatrics",
    image: "Pediatrician.jpeg",
  },
  {
    specialty: "Orthopedics",
    image: "Orthopedic.jpeg",
  },
  {
    specialty: "Neurologist",
    image: "Neurologist.jpeg",
  },
];

export const doctors = [
  {
    _id: "1",
    name: "Dr. John Doe",
    degree: "MBBS",
    address: "c-34, toal plaza",
    specialty: "Cardiologist",
    experience: "10 years",
    fees: "$50",
    image: "/doctor1.png",
    about:
      "Experienced cardiologist specializing in heart diseases and surgeries.",
    availability: [
      {
        day: "Monday",
        slots: [
          { time: "10:00 AM ", available: true },
          { time: "11:00 AM ", available: true },
        ],
      },
      {
        day: "Tuesday",
        slots: [
          { time: "10:00 AM ", available: false },
          { time: "11:00 AM ", available: true },
          { time: "11:30 AM ", available: true },
        ],
      },
      {
        day: "Wednesday",
        slots: [
          { time: "10:00 AM ", available: true },
          { time: "11:00 AM ", available: true },
        ],
      },
    ],
  },
  {
    _id: "2",
    name: "Dr. Emily Clark",
    degree: "MD",
    specialty: "Neurologist",
    experience: "8 years",
    fees: "$40",
    address: "c-34, toal plaza",
    image: "/doctor2.png",
    about: "Specialist in skin care, treatments, and cosmetic procedures.",
    availability: [
      {
        day: "Monday",
        slots: [
          { time: "10:00 AM", available: false },
          { time: "10:30 AM", available: true },
        ],
      },
      {
        day: "Wednesday",
        slots: [
          { time: "10:00 AM", available: false },
          { time: "10:30 AM", available: true },
          { time: "11:00 AM", available: true },
          { time: "11:30 AM", available: true },
        ],
      },
      {
        day: "Friday",
        slots: [
          { time: "10:00 AM", available: false },
          { time: "10:30 AM", available: true },
        ],
      },
    ],
  },
  {
    _id: "3",
    name: "Dr. Sarah Lee",
    degree: "MBBS, MD",
    specialty: "Neurologist",
    address: "c-34, toal plaza",
    experience: "12 years",
    fees: "$55",
    image: "/doctor3.png",
    about:
      "Specialized in children's health and well-being from infancy to adolescence.",
    availability: [
      {
        day: "Friday",
        slots: [
          { time: "10:00 AM", available: false },
          { time: "10:30 AM", available: true },
        ],
      },
    ],
  },
  {
    _id: "4",
    name: "Dr. Michael Brown",
    degree: "MS",
    specialty: "Orthopedic Surgeon",
    experience: "15 years",
    fees: "$60",
    image: "/doctor4.png",
    address: "c-34, toal plaza",
    about:
      "Expert in treating musculoskeletal injuries, joint issues, and surgeries.",
    availability: [
      {
        day: "Wednesday",
        slots: [
          { time: "10:00 AM", available: false },
          { time: "10:30 AM", available: true },
          { time: "11:00 AM", available: true },
          { time: "11:30 AM", available: true },
        ],
      },
    ],
  },
  {
    _id: "5",
    name: "Dr. Jessica Green",
    degree: "MD",
    specialty: "Neurologist",
    experience: "18 years",
    address: "c-34, toal plaza",
    fees: "$70",
    image: "/doctor5.png",
    about: "Specialist in neurological disorders, brain and nerve conditions.",
    availability: [
      {
        day: "Wednesday",
        slots: [
          { time: "10:00 AM", available: false },
          { time: "10:30 AM", available: true },
          { time: "11:00 AM", available: true },
          { time: "11:30 AM", available: true },
        ],
      },
    ],
  },
];

export const latestAppointmentData = [
  {
    _id: "1",
    name: "Dr. John Doe",
    degree: "MBBS",
    experience: "10 years",
    fees: "$50",
    patinetImage: "/doctor1.png",
    doctorImage: "/doctor1.png",
    status: "Completed",
    dateTime: "5 Oct 2024",
  },

  {
    _id: "2",
    name: "Dr. John Doe",
    degree: "MBBS",
    experience: "10 years",
    fees: "$50",
    patinetImage: "/doctor1.png",
    doctorImage: "/doctor1.png",
    status: "Completed",
    dateTime: "4 Oct 2024",
  },
];

export const adminAllAppointmentData = [
  {
    _id: "1",
    doctorName: "Dr. John Doe",
    patientName: "Kaushik",
    degree: "MBBS",
    experience: "10 years",
    fees: "$50",
    patinetImage: "/doctor1.png",
    doctorImage: "/doctor1.png",
    status: "Completed",
    dateTime: "5 Oct 2024",
  },

  {
    _id: "2",
    name: "Dr. John Doe",
    degree: "MBBS",
    patientName: "chaman",
    experience: "10 years",
    fees: "$50",
    patinetImage: "/doctor1.png",
    doctorImage: "/doctor1.png",
    status: "Completed",
    dateTime: "4 Oct 2024",
  },
];

export const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Satured",
];

export const slotTime = [
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
];
