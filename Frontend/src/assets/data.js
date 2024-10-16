export const specialtyData = [
  {
    specialty: "Cardiologist",
    image: "https://example.com/images/doctor1.jpg",
  },
  {
    specialty: "Dermatologist",
    image: "https://example.com/images/doctor2.jpg",
  },
  {
    specialty: "Pediatrician",
    image: "https://example.com/images/doctor3.jpg",
  },
  {
    specialty: "Orthopedic",
    image: "https://example.com/images/doctor4.jpg",
  },
  {
    specialty: "Neurologist",
    image: "https://example.com/images/doctor5.jpg",
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
          { time: "10:00 AM - 11:00 AM", available: true },
          { time: "12:00 PM - 1:00 PM", available: false },
          { time: "2:00 PM - 3:00 PM", available: true },
        ],
      },
      {
        day: "Tuesday",
        slots: [
          { time: "11:00 AM - 12:00 PM", available: true },
          { time: "1:00 PM - 2:00 PM", available: false },
          { time: "3:00 PM - 4:00 PM", available: true },
        ],
      },
      {
        day: "Wednesday",
        slots: [
          { time: "9:00 AM - 10:00 AM", available: true },
          { time: "11:00 AM - 12:00 PM", available: true },
        ],
      },
    ],
  },
  {
    _id: "2",
    name: "Dr. Emily Clark",
    degree: "MD",
    specialty: "Dermatologist",
    experience: "8 years",
    fees: "$40",
    address: "c-34, toal plaza",
    image: "/doctor2.png",
    about: "Specialist in skin care, treatments, and cosmetic procedures.",
    availability: [
      {
        day: "Monday",
        slots: [
          { time: "9:00 AM - 10:00 AM", available: true },
          { time: "11:00 AM - 12:00 PM", available: false },
          { time: "1:00 PM - 2:00 PM", available: true },
        ],
      },
      {
        day: "Wednesday",
        slots: [
          { time: "10:00 AM - 11:00 AM", available: true },
          { time: "12:00 PM - 1:00 PM", available: false },
          { time: "2:00 PM - 3:00 PM", available: true },
        ],
      },
      {
        day: "Friday",
        slots: [
          { time: "9:00 AM - 10:00 AM", available: true },
          { time: "11:00 AM - 12:00 PM", available: true },
          { time: "1:00 PM - 2:00 PM", available: false },
        ],
      },
    ],
  },
  {
    _id: "3",
    name: "Dr. Sarah Lee",
    degree: "MBBS, MD",
    specialty: "Pediatrician",
    address: "c-34, toal plaza",
    experience: "12 years",
    fees: "$55",
    image: "/doctor3.png",
    about:
      "Specialized in children's health and well-being from infancy to adolescence.",
    availability: [
      {
        day: "Tuesday",
        slots: [
          { time: "10:00 AM - 11:00 AM", available: true },
          { time: "12:00 PM - 1:00 PM", available: true },
        ],
      },
      {
        day: "Thursday",
        slots: [
          { time: "11:00 AM - 12:00 PM", available: false },
          { time: "1:00 PM - 2:00 PM", available: true },
          { time: "3:00 PM - 4:00 PM", available: true },
        ],
      },
      {
        day: "Saturday",
        slots: [
          { time: "9:00 AM - 10:00 AM", available: true },
          { time: "11:00 AM - 12:00 PM", available: true },
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
          { time: "10:00 AM - 11:00 AM", available: true },
          { time: "12:00 PM - 1:00 PM", available: true },
          { time: "2:00 PM - 3:00 PM", available: false },
        ],
      },
      {
        day: "Thursday",
        slots: [
          { time: "9:00 AM - 10:00 AM", available: true },
          { time: "11:00 AM - 12:00 PM", available: false },
        ],
      },
      {
        day: "Friday",
        slots: [
          { time: "10:00 AM - 11:00 AM", available: true },
          { time: "12:00 PM - 1:00 PM", available: true },
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
        day: "Monday",
        slots: [
          { time: "9:00 AM - 10:00 AM", available: true },
          { time: "11:00 AM - 12:00 PM", available: true },
          { time: "1:00 PM - 2:00 PM", available: false },
        ],
      },

      {
        day: "Wednesday",
        slots: [
          { time: "10:00 AM - 11:00 AM", available: true },
          { time: "12:00 PM - 1:00 PM", available: false },
          { time: "2:00 PM - 3:00 PM", available: true },
        ],
      },
      {
        day: "Thursday",
        slots: [
          { time: "11:00 AM - 12:00 PM", available: true },
          { time: "1:00 PM - 2:00 PM", available: false },
        ],
      },
    ],
  },
];
