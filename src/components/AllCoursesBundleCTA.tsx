
import React from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { courses as allCourses } from "@/data/courses";
import { Star } from "lucide-react";

const AllCoursesBundleCTA: React.FC = () => {
  const { clearCart, addToCart, closeCart } = useCart();
  const navigate = useNavigate();

  const handleBundleClick = () => {
    clearCart();
    allCourses.forEach((course) => {
      addToCart({
        id: course.id,
        title: course.title,
        price: course.price,
        image: course.image,
        category: course.category,
      });
    });
    closeCart?.();
    navigate("/checkout");
  };

  return (
    <section className="container my-12 mx-auto">
      <div className="relative bg-gradient-to-r from-yutime-coral/20 to-yutime-coral/5 border border-yutime-coral rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-card">
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <Star className="text-yutime-coral mb-2 md:mb-0 md:mr-2" size={32} />
            <div>
              <h3 className="text-yutime-coral text-2xl md:text-3xl font-bold mb-1">
                Get All 5 Courses &amp; Save Big!
              </h3>
              <p className="text-yutime-sage text-base md:text-lg font-medium">
                Unlock the complete Mandarin journey. HKD <span className="font-bold">500</span> <span className="ml-2 text-yutime-coral font-semibold">(Save HKD 100)</span>
              </p>
            </div>
          </div>
          <p className="text-yutime-warmGray mt-2 mb-4">Best for families or dedicated learners – one click, all content.</p>
        </div>
        <div className="flex flex-row md:flex-col items-center justify-center gap-2 md:gap-3">
          {allCourses.slice(0, 5).map((course) => (
            <img
              key={course.id}
              src={course.image}
              alt={course.title}
              className="w-12 h-12 object-cover rounded-lg border shadow"
              title={course.title}
            />
          ))}
        </div>
        <Button
          size="lg"
          onClick={handleBundleClick}
          className="bg-yutime-coral hover:bg-yutime-coral/90 text-white text-lg font-bold mt-4 md:mt-0 px-8 py-4 rounded-xl shadow-lg whitespace-nowrap"
        >
          Get All 5 Courses
        </Button>
      </div>
    </section>
  );
};

export default AllCoursesBundleCTA;
