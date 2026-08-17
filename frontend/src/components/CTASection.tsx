import React from 'react';
import { ArrowRight, Phone, Mail, Globe, MapPin, Send } from 'lucide-react';

export const CTASection: React.FC = () => {
  return (
    <section id="cta" className="relative py-28 w-full bg-[#07111F] overflow-hidden">
      {/* Background Campus Image */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="relative rounded-3xl overflow-hidden border border-[#D6A84F]/35 bg-[#0B1A2F] shadow-2xl">
          {/* Background Real Campus Photo */}
          <div className="relative h-[550px] sm:h-[600px] w-full overflow-hidden">
            <img
              src="/campus/cta-bg.webp"
              alt="VIT Mumbai Main Campus Entrance"
              className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.15]"
            />
            {/* Dark Cinematic Vignette */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#07111F] via-[#07111F]/80 to-[#07111F]/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07111F] via-transparent to-transparent" />
          </div>

          {/* Animated Traveling Gold Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#D6A84F]/30 overflow-hidden z-20">
            <div className="h-full bg-gradient-to-r from-transparent via-[#E8C477] to-transparent animate-shimmer" />
          </div>

          {/* Foreground Overlay Content */}
          <div className="absolute inset-0 p-8 sm:p-14 flex flex-col justify-between z-10">
            {/* Top Eyebrow */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E8C477] px-3.5 py-1.5 rounded-full bg-[#07111F]/85 border border-[#D6A84F]/40 backdrop-blur-md">
                READY TO BEGIN YOUR JOURNEY?
              </span>
              <span className="hidden sm:inline-block text-xs font-mono text-[#1688D8]">
                ADMISSIONS OPEN 2026-27
              </span>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              {/* Left CTA Text & Buttons */}
              <div className="lg:col-span-7 space-y-6">
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#F5F2EA] tracking-tight leading-[0.95] font-display">
                  The Future <br />
                  <span className="text-gold-gradient font-serif italic font-normal">Awaits You</span>
                </h2>

                <p className="text-sm sm:text-base text-[#F5F2EA]/85 font-light leading-relaxed max-w-lg">
                  Join a community of curious engineers, innovators, and creators building a better tomorrow, today at VIT Mumbai.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="#home"
                    className="btn-gold-primary px-8 py-4 rounded-2xl text-sm font-extrabold flex items-center space-x-3 shadow-xl shadow-[#D6A84F]/25 cursor-pointer group"
                  >
                    <span>EXPLORE VIT</span>
                    <ArrowRight className="w-4 h-4 text-[#07111F] group-hover:translate-x-1.5 transition-transform" />
                  </a>

                  <a
                    href="mailto:admissions@vit.edu.in"
                    className="btn-glass-secondary px-7 py-4 rounded-2xl text-sm font-semibold flex items-center space-x-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-[#E8C477]" />
                    <span>Contact Admissions</span>
                  </a>
                </div>
              </div>

              {/* Right Contact Card */}
              <div className="lg:col-span-5">
                <div className="glass-card-gold p-6 sm:p-8 rounded-2xl border border-[#D6A84F]/35 backdrop-blur-2xl bg-[#07111F]/90 shadow-2xl space-y-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#E8C477] border-b border-[#D6A84F]/20 pb-2">
                    LET'S CONNECT • GET IN TOUCH
                  </div>

                  <div className="space-y-3 text-xs text-[#F5F2EA]">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-[#D6A84F]" />
                      <span>+91 22 6776 5000</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-[#D6A84F]" />
                      <span>admissions@vit.edu.in</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Globe className="w-4 h-4 text-[#D6A84F]" />
                      <span>www.vit.edu.in</span>
                    </div>

                    <div className="flex items-start space-x-3">
                      <MapPin className="w-4 h-4 text-[#D6A84F] flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">
                        Vidyalankar Institute of Technology, VIT Campus Road, Wadala (E), Mumbai - 400037, Maharashtra, India.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
