
import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: "Technology",
    description: "Learn digital skills for everyday use",
    icon: "💻",
    color: "bg-blue-100"
  },
  {
    id: 2,
    name: "Health & Wellness",
    description: "Stay active and healthy with expert guidance",
    icon: "🧘‍♀️",
    color: "bg-green-100"
  },
  {
    id: 3,
    name: "Creative Arts",
    description: "Express yourself through art and creativity",
    icon: "🎨",
    color: "bg-purple-100"
  },
  {
    id: 4,
    name: "Life Skills",
    description: "Practical skills for everyday situations",
    icon: "🔧",
    color: "bg-amber-100"
  },
  {
    id: 5,
    name: "Languages",
    description: "Connect globally with new language skills",
    icon: "🗣️",
    color: "bg-red-100"
  },
  {
    id: 6,
    name: "Finance",
    description: "Manage your finances with confidence",
    icon: "💰",
    color: "bg-emerald-100"
  }
];

const CategoryList = () => {
  return (
    <section id="categories" className="section bg-yutime-sand">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-yutime-navy mb-4">Explore Categories</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Discover courses tailored to your interests and learning goals, 
            all designed with simplicity and accessibility in mind.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={`/categories/${category.id}`}
              className={`card hover:shadow-lg transition-shadow cursor-pointer ${category.color} border-2 border-white`}
            >
              <div className="flex flex-col items-center text-center p-2">
                <span className="text-4xl mb-3" aria-hidden="true">{category.icon}</span>
                <h3 className="text-xl font-bold text-yutime-navy mb-2">{category.name}</h3>
                <p className="text-gray-700">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link to="/categories" className="btn-primary">View All Categories</Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryList;
