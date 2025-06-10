
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
  longDescription?: string;
  instructor?: string;
  rating?: number;
  students?: number;
  curriculum?: string[];
  isPurchased?: boolean;
}

export const courses: Course[] = [
  {
    id: 1,
    title: "Smartphone Basics for Everyday Use",
    category: "Technology",
    level: "Beginner",
    lessons: 8,
    totalTime: "3 hours 20 min",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600",
    price: 880,
    description: "Master essential smartphone skills for daily use, from messaging to apps.",
    longDescription: "This comprehensive course will teach you everything you need to know about using your smartphone effectively. From basic navigation to advanced features, you'll become confident in using your device for daily tasks.",
    instructor: "Sarah Chen",
    rating: 4.8,
    students: 1240,
    curriculum: [
      "Getting Started with Your Smartphone",
      "Making Calls and Sending Messages",
      "Using the Camera and Photos",
      "Installing and Managing Apps",
      "Internet Browsing and Email",
      "Managing Contacts and Calendar",
      "Privacy and Security Settings",
      "Troubleshooting Common Issues"
    ],
    isPurchased: true
  },
  {
    id: 2,
    title: "Gentle Yoga for Better Mobility",
    category: "Health & Wellness",
    level: "All Levels",
    lessons: 12,
    totalTime: "4 hours 45 min",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=600",
    price: 880,
    description: "Improve flexibility and reduce pain with gentle, age-appropriate yoga practices.",
    longDescription: "A gentle approach to yoga designed specifically for mature learners. This course focuses on improving flexibility, balance, and overall well-being through safe and accessible movements.",
    instructor: "Michael Wong",
    rating: 4.9,
    students: 890,
    curriculum: [
      "Introduction to Gentle Yoga",
      "Basic Breathing Techniques",
      "Warm-up and Preparation",
      "Standing Poses for Balance",
      "Seated Poses for Flexibility",
      "Gentle Backbends",
      "Hip Opening Sequences",
      "Relaxation and Meditation",
      "Morning Energy Routine",
      "Evening Wind-down Sequence",
      "Managing Joint Pain",
      "Building a Daily Practice"
    ],
    isPurchased: true
  },
  {
    id: 3,
    title: "Digital Photography Fundamentals",
    category: "Creative Arts",
    level: "Beginner",
    lessons: 10,
    totalTime: "5 hours 15 min",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600",
    price: 880,
    description: "Learn to capture beautiful photos using any camera, with simple composition techniques.",
    longDescription: "Discover the art of digital photography with this comprehensive beginner's course. Learn composition rules, lighting techniques, and how to tell stories through your images using any camera or smartphone.",
    instructor: "David Lee",
    rating: 4.7,
    students: 652,
    curriculum: [
      "Introduction to Digital Photography",
      "Understanding Your Camera",
      "Composition Rules and Techniques",
      "Working with Natural Light",
      "Portrait Photography Basics",
      "Landscape Photography",
      "Street Photography",
      "Basic Photo Editing",
      "Building Your Portfolio",
      "Sharing Your Work Online"
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
    price: 880,
    description: "Organize your finances, reduce debt, and plan for a secure retirement.",
    longDescription: "Take control of your financial future with this practical course. Learn budgeting strategies, debt management techniques, and retirement planning basics to achieve financial security and peace of mind.",
    instructor: "Jennifer Kim",
    rating: 4.6,
    students: 423,
    curriculum: [
      "Creating a Personal Budget",
      "Understanding Debt and Credit",
      "Building an Emergency Fund",
      "Introduction to Investing",
      "Retirement Planning Basics",
      "Financial Goal Setting"
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
    price: 880,
    description: "Connect with family and friends across popular social media platforms safely.",
    longDescription: "Learn to navigate social media safely and confidently. This course covers the basics of popular platforms, privacy settings, and how to stay connected with loved ones while protecting your personal information.",
    instructor: "Maria Rodriguez",
    rating: 4.5,
    students: 789,
    curriculum: [
      "Understanding Social Media",
      "Setting Up Your First Account",
      "Privacy and Security Settings",
      "Connecting with Friends and Family",
      "Sharing Photos and Updates",
      "Understanding Social Media Etiquette",
      "Staying Safe Online"
    ],
    isPurchased: false
  }
];
