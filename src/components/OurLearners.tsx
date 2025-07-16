
import React from 'react';
import midlifeCareerShifterImg from '@/assets/midlife-career-shifter.jpg';
import preRetireeplannerImg from '@/assets/pre-retiree-planner.jpg';
import asianCreativeLearnerImg from '@/assets/asian-creative-learner.jpg';

const OurLearners = () => {
  const personas = [
    {
      title: "轉型前鋒",
      ageStage: "在職",
      tagline: "我不想等被淘汰，現在就想升級自己",
      description: "Seeking flexible learning that fits around a demanding 9-to-5 schedule",
      image: midlifeCareerShifterImg,
      spanStyle: "bg-yutime-secondary/10 text-yutime-secondary" // Blue for transformation
    },
    {
      title: "過渡規劃者",
      ageStage: "準備退休", 
      tagline: "有規劃的退場，才能有選擇的第二人生",
      description: "Looking for industry-relevant training to make a successful career change",
      image: preRetireeplannerImg,
      spanStyle: "bg-yutime-sage/10 text-yutime-sage" // Green for health/planning
    },
    {
      title: "樂齡生活家",
      ageStage: "已退休",
      tagline: "現在的我，才真正有時間學自己想學的東西",
      description: "Needs hands-on learning to bridge the gap between theory and practice",
      image: asianCreativeLearnerImg,
      spanStyle: "bg-yutime-accent/10 text-yutime-accent" // Orange for lifestyle
    }
  ];

  return (
    <section className="bg-yutime-neutral/30 py-16 md:py-20">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-base font-medium text-yutime-secondary tracking-wide uppercase mb-4">
              Our Learners
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-yutime-primary mb-6">
              Every Journey is Unique
            </h2>
            <p className="text-yutime-text/70 max-w-2xl mx-auto text-lg leading-relaxed font-light">
              Meet the learners we're designed to serve, each with their own goals and aspirations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {personas.map((persona, index) => (
            <div key={index} className="bg-white rounded-3xl p-8 shadow-card border border-yutime-neutral/20 text-center h-full flex flex-col group hover:shadow-wellness transition-all duration-300">
              <div className="flex-1">
                <div className="flex justify-center mb-6">
                  <div className="w-40 h-40 rounded-3xl overflow-hidden shadow-soft group-hover:shadow-warm transition-all duration-300 hover-lift">
                    <img 
                      src={persona.image} 
                      alt={persona.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-yutime-primary mb-3 font-heading">
                    {persona.title}
                  </h3>
                  <span className={`${persona.spanStyle} px-4 py-2 rounded-full text-sm font-medium`}>
                    {persona.ageStage}
                  </span>
                </div>
                
                <blockquote className="text-lg font-medium text-yutime-primary mb-6 italic leading-relaxed">
                  "{persona.tagline}"
                </blockquote>
                
                <p className="text-yutime-text/70 leading-relaxed font-light">
                  {persona.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
};

export default OurLearners;
