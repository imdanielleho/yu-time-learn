export interface Course {
  id: number;
  title: string;
  category: string;
  level: string;
  lessons: number;
  totalTime: string;
  image: string;
  price: number;
  description: string;
  longDescription: string;
  instructor: string;
  rating: number;
  students: number;
  curriculum: string[];
  isPurchased: boolean;
}

export const courses = [
  {
    id: 1,
    title: "Smartphone Basics for Everyday Use",
    category: "Technology",
    level: "Beginner",
    lessons: 8,
    totalTime: "3 hours 20 min",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600",
    price: 120,
    description: "Master essential smartphone skills for daily use, from messaging to apps.",
    longDescription: "Learn how to confidently use your smartphone for everyday tasks. This comprehensive course covers everything from basic navigation to using popular apps, making calls, sending messages, and staying safe online. Perfect for beginners who want to feel more confident with their device.",
    instructor: "Sarah Chen",
    rating: 4.9,
    students: 1247,
    curriculum: [
      "Getting started with your smartphone",
      "Making calls and managing contacts", 
      "Sending text messages and photos",
      "Using essential apps like email and camera",
      "Staying safe and secure online",
      "Customizing your phone settings",
      "Troubleshooting common problems",
      "Advanced features and tips"
    ],
    isPurchased: false
  },
  {
    id: 2,
    title: "Gentle Yoga for Better Mobility", 
    category: "Health & Wellness",
    level: "All Levels",
    lessons: 12,
    totalTime: "4 hours 45 min",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=600",
    price: 120,
    description: "Improve flexibility and reduce pain with gentle, age-appropriate yoga practices.",
    longDescription: "Discover the benefits of gentle yoga designed specifically for adults 45+. This course focuses on improving flexibility, reducing joint pain, and enhancing overall well-being through safe, accessible yoga practices that can be done at home.",
    instructor: "Maria Rodriguez",
    rating: 4.8,
    students: 892,
    curriculum: [
      "Introduction to gentle yoga principles",
      "Basic breathing techniques",
      "Warm-up stretches and movements",
      "Standing poses for strength",
      "Seated poses for flexibility",
      "Floor poses and modifications",
      "Relaxation and meditation",
      "Morning routine sequences",
      "Evening wind-down practice",
      "Chair yoga for limited mobility",
      "Managing common aches and pains",
      "Creating your personal practice"
    ],
    isPurchased: false
  },
  {
    id: 3,
    title: "Digital Photography Fundamentals",
    category: "Creative Arts", 
    level: "Beginner",
    lessons: 10,
    totalTime: "5 hours 15 min",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600",
    price: 120,
    description: "Learn to capture beautiful photos using any camera, with simple composition techniques.",
    longDescription: "Unlock your creative potential with digital photography. Whether you're using a smartphone, point-and-shoot, or DSLR camera, this course teaches you the fundamentals of composition, lighting, and storytelling through images.",
    instructor: "David Kim",
    rating: 4.7,
    students: 1156,
    curriculum: [
      "Understanding your camera basics",
      "Composition rules and guidelines",
      "Working with natural light",
      "Portrait photography tips",
      "Landscape and nature shots",
      "Indoor photography techniques",
      "Basic photo editing introduction",
      "Organizing and storing photos",
      "Sharing your work online",
      "Building a photo portfolio"
    ],
    isPurchased: false
  },
  {
    id: 4,
    title: "Managing Personal Finances",
    category: "Finance",
    level: "Intermediate", 
    lessons: 6,
    totalTime: "2 hours 30 min",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600",
    price: 120,
    description: "Organize your finances, reduce debt, and plan for a secure retirement.",
    longDescription: "Take control of your financial future with practical strategies for budgeting, saving, and investing. This course provides clear, actionable advice for managing money at any stage of life, with special focus on retirement planning.",
    instructor: "Jennifer Walsh",
    rating: 4.9,
    students: 743,
    curriculum: [
      "Creating a personal budget",
      "Debt reduction strategies",
      "Emergency fund planning",
      "Investment basics for beginners",
      "Retirement planning essentials",
      "Estate planning overview"
    ],
    isPurchased: false
  },
  {
    id: 5,
    title: "Introduction to Social Media",
    category: "Technology",
    level: "Beginner",
    lessons: 7, 
    totalTime: "3 hours 45 min",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600",
    price: 120,
    description: "Connect with family and friends across popular social media platforms safely.",
    longDescription: "Learn to use social media platforms like Facebook, Instagram, and WhatsApp to stay connected with loved ones. This course emphasizes safety, privacy, and meaningful online interactions while avoiding common pitfalls.",
    instructor: "Michael Thompson",
    rating: 4.6,
    students: 1034,
    curriculum: [
      "Social media basics and safety",
      "Setting up Facebook account",
      "Connecting with family and friends",
      "Sharing photos and updates",
      "Privacy settings and security",
      "Using WhatsApp for messaging",
      "Avoiding scams and misinformation"
    ],
    isPurchased: false
  }
];
