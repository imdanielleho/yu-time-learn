import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Star, Play } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomerServiceButton from '@/components/CustomerServiceButton';

const courses = [
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
    ]
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
    ]
  },
  // Add other courses here with similar structure...
];

const CourseDetail = () => {
  const { id } = useParams();
  const course = courses.find(c => c.id === parseInt(id || '1'));

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Course not found</h1>
            <Link to="/" className="text-yutime-blue hover:underline">
              Return to homepage
            </Link>
          </div>
        </main>
        <Footer />
        <CustomerServiceButton />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container py-8">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-yutime-blue hover:text-yutime-blue/80 mb-6"
          >
            <ArrowLeft size={20} />
            <span>Back to courses</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <span className="bg-yutime-sand_dark px-3 py-1 rounded-full text-sm font-medium">
                  {course.category}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-gray-600 mb-6">{course.longDescription}</p>

              <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Clock size={16} />
                  <span>{course.totalTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users size={16} />
                  <span>{course.students} students</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  <span>{course.rating} rating</span>
                </div>
              </div>

              {/* Course Image */}
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-8">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <Button className="bg-white/90 hover:bg-white text-yutime-navy rounded-full p-4">
                    <Play size={24} />
                  </Button>
                </div>
              </div>

              {/* Curriculum */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
                <div className="space-y-3">
                  {course.curriculum.map((lesson, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <span className="bg-yutime-indigo text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                        {index + 1}
                      </span>
                      <span>{lesson}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-yutime-blue mb-2">
                      HKD {course.price}
                    </div>
                    <div className="text-gray-600">One-time payment</div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <Button className="w-full bg-yutime-indigo hover:bg-yutime-indigo/90 text-white py-3">
                      Enroll Now
                    </Button>
                    <Button variant="outline" className="w-full py-3">
                      Try Free Preview
                    </Button>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Level:</span>
                      <span className="font-medium">{course.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lessons:</span>
                      <span className="font-medium">{course.lessons}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-medium">{course.totalTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Instructor:</span>
                      <span className="font-medium">{course.instructor}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <CustomerServiceButton />
    </div>
  );
};

export default CourseDetail;
