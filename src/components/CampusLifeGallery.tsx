import React from 'react';

export const CampusLifeGallery: React.FC = () => {
  const items = [
    {
      num: '01',
      title: 'CLUBS & COLLECTIVES',
      tag: '40+ ORGANIZATIONS',
      desc: 'Coding collectives, ACM chapter, IEEE society, literary clubs, and robotics design teams.',
      img: '/campus/life-1.webp',
    },
    {
      num: '02',
      title: 'NATIONAL HACKATHONS',
      tag: '24-HOUR BUILD FESTS',
      desc: 'Student teams competing across national tech challenges, building AI prototypes overnight.',
      img: '/campus/life-2.webp',
    },
    {
      num: '03',
      title: 'SPORTS & TURF',
      tag: 'ATHLETIC CHAMPIONSHIPS',
      desc: 'Sprawling green grounds, indoor gaming arenas, basketball courts, and inter-college leagues.',
      img: '/campus/life-3.webp',
    },
    {
      num: '04',
      title: 'CULTURAL FESTIVAL',
      tag: 'VERVE ANNUAL FEST',
      desc: 'Music bands, theater productions, fashion showcases, and live artist performances.',
      img: '/campus/life-4.webp',
    },
    {
      num: '05',
      title: 'DEVELOPER CIRCLES',
      tag: 'OPEN SOURCE & STARTUPS',
      desc: 'In-house incubator, seed grant mentoring, open source sprints, and industry meetups.',
      img: '/campus/life-5.webp',
    },
  ];

  return (
    <section id="life" className="relative py-32 w-full bg-[#07111F] border-t border-[#D6A84F]/15 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Editorial Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#E8C477]">
              06 // STUDENT COMMUNITY
            </span>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-[#F5F2EA] font-display tracking-tight leading-[0.95]">
              MORE THAN <br />
              <span className="font-serif-italic font-normal text-gold-gradient">
                A CAMPUS.
              </span>
            </h2>
          </div>
          <p className="text-sm text-[#F5F2EA]/75 font-light max-w-md leading-relaxed">
            Drag or scroll horizontally through the visual gallery of student life, technical hackathons, athletic events, and creative collectives.
          </p>
        </div>

        {/* Horizontal Scroll Gallery */}
        <div className="flex space-x-6 overflow-x-auto no-scrollbar pb-8 pt-2 scroll-smooth">
          {items.map((item) => (
            <div
              key={item.num}
              className="flex-none w-[320px] sm:w-[400px] space-y-4 group cursor-pointer"
            >
              {/* Photo Container — NO ROUNDED RECTANGLES */}
              <div className="relative h-[380px] w-full overflow-hidden shadow-xl">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover filter brightness-[0.88] contrast-[1.1] group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07111F] via-transparent to-transparent" />
                <div className="absolute top-4 left-4 text-[10px] font-mono font-bold text-[#E8C477] bg-[#07111F]/80 px-2.5 py-1 backdrop-blur-md">
                  {item.num}
                </div>
              </div>

              {/* Typography below image */}
              <div className="space-y-1">
                <div className="text-[9px] font-mono text-[#1688D8] tracking-widest uppercase">
                  {item.tag}
                </div>
                <h3 className="text-xl font-bold text-[#F5F2EA] font-display group-hover:text-[#E8C477] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#F5F2EA]/70 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
