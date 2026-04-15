export interface Course {
  id: number;
  title: string;
  category: string;
  duration: string;
  students: number;
  description: string;
  fees: string;
  image: string;
  highlights: string[];
}

export interface FacultyMember {
  id: number;
  name: string;
  title: string;
  subject: string;
  experience: string;
  qualification: string;
  bio: string;
  image: string;
}

export interface Testimonial {
  id: number;
  name: string;
  rank: string;
  quote: string;
  image?: string;
}

export const courses: Course[] = [
  {
    id: 1,
    title: "IIT-JEE Advanced",
    category: "Engineering",
    duration: "2 Years",
    students: 450,
    description: "Comprehensive preparation for JEE Main & Advanced with expert faculty and regular mock tests.",
    fees: "₹1,25,000",
    image: "/images/course-jee.jpg",
    highlights: ["Weekly tests", "Doubt clearing sessions", "Study material included", "Performance tracking"]
  },
  {
    id: 2,
    title: "NEET UG Preparation",
    category: "Medical",
    duration: "2 Years",
    students: 320,
    description: "Intensive coaching for NEET with focus on Biology, Chemistry & Physics. Includes lab sessions.",
    fees: "₹1,35,000",
    image: "/images/course-neet.jpg",
    highlights: ["NCERT focused", "Practical demos", "Previous year papers", "Biology special classes"]
  },
  {
    id: 3,
    title: "UPSC Civil Services",
    category: "Government",
    duration: "18 Months",
    students: 180,
    description: "Complete foundation to advanced level preparation for Prelims, Mains & Interview.",
    fees: "₹95,000",
    image: "/images/course-upsc.jpg",
    highlights: ["Current affairs", "Essay writing", "Answer evaluation", "Personality development"]
  },
  {
    id: 4,
    title: "Banking & SSC Exams",
    category: "Government",
    duration: "1 Year",
    students: 650,
    description: "Targeted preparation for IBPS, SBI, SSC CGL, CHSL and other competitive exams.",
    fees: "₹65,000",
    image: "/images/course-jee.jpg",
    highlights: ["Quant & Reasoning", "English mastery", "GK updates", "Speed building"]
  }
];

export const faculty: FacultyMember[] = [
  {
    id: 1,
    name: "Dr. Rajesh Sharma",
    title: "Physics Expert",
    subject: "Physics",
    experience: "18 years",
    qualification: "Ph.D. Physics, IIT Delhi",
    bio: "Former faculty at FIITJEE. Specialized in Mechanics and Electrodynamics. Known for simplifying complex concepts.",
    image: "/images/faculty1.jpg"
  },
  {
    id: 2,
    name: "Prof. Anjali Mehra",
    title: "Biology Specialist",
    subject: "Biology",
    experience: "14 years",
    qualification: "M.Sc. Zoology, NET Qualified",
    bio: "Passionate educator with deep knowledge in Human Physiology and Genetics. Helped over 200 students crack NEET.",
    image: "/images/faculty3.jpg"
  },
  {
    id: 3,
    name: "Mr. Vikram Singh",
    title: "Mathematics Mentor",
    subject: "Mathematics",
    experience: "16 years",
    qualification: "M.Sc. Math, IIT Roorkee",
    bio: "Expert in Calculus and Algebra. Innovative teaching methods with real-life applications.",
    image: "/images/faculty2.jpg"
  },
  {
    id: 4,
    name: "Ms. Priya Kapoor",
    title: "Chemistry Faculty",
    subject: "Chemistry",
    experience: "12 years",
    qualification: "M.Sc. Organic Chemistry",
    bio: "Specializes in Organic & Inorganic Chemistry. Focuses on reaction mechanisms and problem solving strategies.",
    image: "/images/faculty1.jpg"
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Arjun Patel",
    rank: "AIR 47 - JEE 2024",
    quote: "The structured approach and constant motivation from faculty helped me achieve my dream. The mock tests were game changers.",
    image: "/images/results.jpg"
  },
  {
    id: 2,
    name: "Sneha Reddy",
    rank: "NEET 2024 - 98.7 percentile",
    quote: "Amazing learning environment. The faculty's dedication to each student is truly remarkable.",
  },
  {
    id: 3,
    name: "Karan Malhotra",
    rank: "UPSC 2023 - Rank 112",
    quote: "Best decision I made. The comprehensive study material and regular current affairs updates were invaluable.",
  }
];

export const stats = [
  { number: "8500+", label: "Students Trained" },
  { number: "1240+", label: "Success Stories" },
  { number: "98%", label: "Selection Rate" },
  { number: "45", label: "Expert Faculty" }
];