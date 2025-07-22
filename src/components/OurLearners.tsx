import React from 'react';
import midlifeCareerShifterImg from '@/assets/midlife-career-shifter.jpg';
import preRetireeplannerImg from '@/assets/pre-retiree-planner.jpg';
import asianCreativeLearnerImg from '@/assets/asian-creative-learner.jpg';

const OurLearners = () => {
  const getSpanClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-100 text-blue-800';
      case 'green':
        return 'bg-green-100 text-green-800';
      case 'orange':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-yutime-secondary/10 text-yutime-secondary';
    }
  };

  const personas = [
    {
      title: "轉型前鋒",
      ageStage: "在職",
      tagline: "我不想等被淘汰，現在就想升級自己",
      description: "想提升數位力、掌握 AI 工具，開展副業或轉型升級職涯。",
      image: midlifeCareerShifterImg,
      color: "blue"
    },
    {
      title: "過渡規劃者",
      ageStage: "準備退休", 
      tagline: "有規劃的退場，才能有選擇的第二人生",
      description: "掌握健康、財務與心理韌性，安心迎接轉變。",
      image: preRetireeplannerImg,
      color: "green"
    },
    {
      title: "樂齡生活家",
      ageStage: "已退休",
      tagline: "現在的我，才真正有時間學自己想學的東西",
      description: "想活得健康、有趣、有伴，學習新科技與生活實用技能。",
      image: asianCreativeLearnerImg,
      color: "orange"
    }
  ];

  return (
    <section className="bg-yutime-neutral/30 py-16 md:py-20 relative">
      {/* Top curved separator */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg className="relative block w-full h-12 md:h-16" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-white"></path>
        </svg>
      </div>
      
      {/* Decorative circles */}
      <div className="absolute top-20 right-8 opacity-10">
        <div className="w-32 h-32 border-4 border-yutime-accent rounded-full"></div>
        <div className="w-16 h-16 bg-yutime-sunshine rounded-full absolute -top-4 -right-4"></div>
      </div>
      
      <div className="container relative z-10">
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
                  <span className={`${getSpanClasses(persona.color)} px-4 py-2 rounded-full text-sm font-medium`}>
                    {persona.ageStage}
                  </span>
                </div>
                
                <blockquote className="text-lg font-medium text-yutime-primary mb-6 leading-relaxed">
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
      
      {/* Bottom curved separator */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-16 md:h-20" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" className="fill-yutime-softWhite" opacity="0.5"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" className="fill-yutime-softWhite"></path>
        </svg>
      </div>
    </section>
  );
};

export default OurLearners;
