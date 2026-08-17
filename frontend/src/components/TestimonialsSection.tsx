import React, { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote:
        'VIT Mumbai has given me the opportunity to learn, explore, and grow beyond boundaries. The hands-on project culture and faculty mentorship helped me land my dream role as a Software Engineer.',
      name: 'Ananya R.',
      role: 'B.Tech Computer Engineering, Class of 2025',
      company: 'Placed at Top Tech MNC',
      rating: 5,
    },
    {
      quote:
        'The state-of-the-art AI laboratories and hackathon ecosystem at VIT fostered my passion for machine learning. The research guidance here is world-class.',
      name: 'Rohan Sharma',
      role: 'Alumni (B.Tech CSE 2024)',
      company: 'AI Research Scholar',
      rating: 5,
    },
    {
      quote:
        'Teaching at VIT is an inspiring experience. Our students work on real industry problems, publish research papers, and build products that make a genuine impact.',
      name: 'Dr. S. K. Kulkarni',
      role: 'Professor & Head of Computer Engineering',
      company: 'Faculty Member',
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const t = testimonials[currentIndex];

  return (
    <section id="testimonials" className="relative py-28 w-full bg-[#07111F]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Carousel Controls */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E8C477] px-3.5 py-1.5 rounded-full bg-[#0B1A2F] border border-[#D6A84F]/30">
              VOICES OF VIT
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-[#F5F2EA] tracking-tight leading-tight font-display">
              Hear from our <br />
              <span className="text-gold-gradient font-serif italic">Community</span>
            </h2>
            <p className="text-sm text-[#F5F2EA]/80 font-light leading-relaxed">
              Stories of growth, innovation, and achievements from students, alumni, and distinguished faculty members.
            </p>

            {/* Navigation Carousel Buttons */}
            <div className="flex items-center space-x-3 pt-4">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-2xl bg-[#0B1A2F] border border-[#D6A84F]/30 text-[#E8C477] hover:bg-[#D6A84F] hover:text-[#07111F] transition-all flex items-center justify-center cursor-pointer shadow-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-2xl bg-[#0B1A2F] border border-[#D6A84F]/30 text-[#E8C477] hover:bg-[#D6A84F] hover:text-[#07111F] transition-all flex items-center justify-center cursor-pointer shadow-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="flex space-x-1.5 ml-4">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      currentIndex === i
                        ? 'bg-[#E8C477] w-6'
                        : 'bg-[#D6A84F]/30 hover:bg-[#D6A84F]/60'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Testimonial Card */}
          <div className="lg:col-span-7">
            <div className="glass-card-gold p-8 sm:p-12 rounded-3xl border border-[#D6A84F]/35 shadow-2xl relative space-y-6">
              <Quote className="w-12 h-12 text-[#D6A84F]/40" />

              <div className="flex items-center space-x-1">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#E8C477] text-[#E8C477]" />
                ))}
              </div>

              <p className="text-lg sm:text-xl text-[#F5F2EA] font-light leading-relaxed italic">
                "{t.quote}"
              </p>

              <div className="pt-6 border-t border-[#D6A84F]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-base font-bold text-[#E8C477] font-display">
                    {t.name}
                  </h4>
                  <p className="text-xs text-[#F5F2EA]/75">{t.role}</p>
                </div>
                <span className="text-xs font-mono text-[#1688D8] px-3 py-1 rounded bg-[#0066B3]/20 border border-[#0066B3]/40">
                  {t.company}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
