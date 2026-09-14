import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Sparkles,
  Search,
  Filter,
  ExternalLink,
  Target,
  Flame,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  Bookmark,
  Share2,
  Tag,
  GraduationCap,
} from 'lucide-react';
import { eventApi, CampusEvent } from '../services/api';

const EVENT_TYPES = [
  { value: 'ALL', label: 'All Event Types' },
  { value: 'WORKSHOP', label: 'Workshops' },
  { value: 'HACKATHON', label: 'Hackathons' },
  { value: 'SEMINAR', label: 'Seminars' },
  { value: 'GUEST_LECTURE', label: 'Guest Lectures' },
  { value: 'COMPETITION', label: 'Competitions' },
  { value: 'CAREER_FAIR', label: 'Career Fairs' },
  { value: 'WEBINAR', label: 'Webinars' },
];

export const DEFAULT_CAMPUS_EVENTS: CampusEvent[] = [
  {
    _id: 'evt_defense_01',
    title: 'Indian Armed Forces Technical & Aviation Entry Orientation',
    description: 'Specialized orientation on Indian Air Force (AFCAT, CDS, NDA Technical Entry) pilot training requirements, SSB interview preparation, avionics systems, flight physics, and psychological endurance standards with veteran Wing Commanders.',
    eventType: 'SEMINAR',
    eventDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'Main Auditorium & Defense Aptitude Center',
    registrationLink: 'https://campus1.vit.edu.in/events/defense-aviation',
    capacity: 200,
    department: 'All',
    status: 'UPCOMING',
    relevanceScore: 97,
    matchReason: 'Directly accelerates your goal for Indian Air Force Pilot and Aviation Entry',
    matchType: 'CAREER_GOAL_MATCH',
    matchedSkills: ['Flight Dynamics', 'Avionics & Radar', 'Pilot Aptitude', 'SSB Preparation'],
    matchedTopics: ['AFCAT & CDS Technical Syllabus', 'Flight Navigation', 'Aircraft Systems & Avionics'],
    aiMetadata: {
      targetDomains: ['Defense & Aviation', 'Aerospace Engineering', 'Avionics'],
      extractedSkills: ['Flight Dynamics', 'Aviation Meteorology', 'SSB Interview Techniques', 'Physical Endurance', 'Avionics & Radar', 'Pilot Aptitude'],
      keyTopics: ['AFCAT & CDS Technical Syllabus', 'Flight Navigation', 'Aircraft Systems & Avionics'],
      targetAudienceLevel: 'ALL',
      summary: 'Comprehensive career orientation for students aiming for Indian Air Force pilot and aerospace engineering roles.',
      status: 'PROCESSED'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: 'evt_genai_02',
    title: 'Generative AI & LLM Systems Hands-On Bootcamp',
    description: 'Comprehensive 2-day deep dive into building Retrieval-Augmented Generation (RAG) pipelines, fine-tuning open-source models with LoRA, and deploying production LLMs using PyTorch and Hugging Face.',
    eventType: 'WORKSHOP',
    eventDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'Auditorium Hall A & AI Lab 302',
    registrationLink: 'https://campus1.vit.edu.in/events/genai-bootcamp',
    capacity: 120,
    department: 'Computer Engineering',
    status: 'UPCOMING',
    relevanceScore: 94,
    matchReason: 'Matches your interest in PyTorch, Machine Learning & Modern AI Architecture',
    matchType: 'SKILL_MATCH',
    matchedSkills: ['PyTorch', 'RAG Pipelines', 'Hugging Face', 'Vector Databases'],
    matchedTopics: ['Transformer Architecture', 'Embedding Models', 'LangChain'],
    aiMetadata: {
      targetDomains: ['Artificial Intelligence', 'Machine Learning'],
      extractedSkills: ['PyTorch', 'LoRA Fine-tuning', 'RAG Pipelines', 'Hugging Face'],
      keyTopics: ['Transformer Architecture', 'Embedding Models', 'Production LLM Serving'],
      targetAudienceLevel: 'INTERMEDIATE',
      summary: 'Hands-on engineering workshop on fine-tuning and deploying large language models.',
      status: 'PROCESSED'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: 'evt_hackathon_03',
    title: 'Campus Hackathon 2026: Scalable Cloud & Full-Stack Systems',
    description: '36-hour flagship hackathon focused on architecting resilient microservices, high-throughput backend APIs with Node.js, React frontend dashboards, and Docker/Kubernetes cloud orchestration.',
    eventType: 'HACKATHON',
    eventDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'Central Computing Center',
    registrationLink: 'https://campus1.vit.edu.in/hackathon-2026',
    capacity: 250,
    department: 'All',
    status: 'UPCOMING',
    relevanceScore: 91,
    matchReason: 'Top campus flagship hackathon for practical software engineering experience',
    matchType: 'CAMPUS_GENERAL',
    matchedSkills: ['React', 'TypeScript', 'Node.js', 'Docker', 'Kubernetes'],
    matchedTopics: ['Scalable Architecture', 'Container Orchestration', 'Cloud Deployment'],
    aiMetadata: {
      targetDomains: ['Cloud Computing', 'Fullstack Development'],
      extractedSkills: ['React', 'TypeScript', 'Node.js', 'Docker'],
      keyTopics: ['Scalable Architecture', 'Cloud Deployment'],
      targetAudienceLevel: 'INTERMEDIATE',
      summary: 'Flagship 36-hour campus hackathon for building fullstack production systems.',
      status: 'PROCESSED'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: 'evt_dsa_04',
    title: 'Mastering Data Structures & System Design for Tier-1 Tech',
    description: 'Exclusive guest lecture and interactive problem-solving session with senior engineering leaders from Google and Microsoft covering distributed caching, graph algorithms, and system design interviews.',
    eventType: 'GUEST_LECTURE',
    eventDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'Seminar Hall 1',
    registrationLink: 'https://campus1.vit.edu.in/seminar/dsa-tier1',
    capacity: 180,
    department: 'Computer Engineering',
    status: 'UPCOMING',
    relevanceScore: 89,
    matchReason: 'High-impact algorithmic prep for Tier-1 engineering placement',
    matchType: 'TOPIC_MATCH',
    matchedSkills: ['Data Structures & Algorithms', 'System Design', 'Distributed Systems'],
    matchedTopics: ['FAANG Interview Strategies', 'Scalable Database Sharding'],
    aiMetadata: {
      targetDomains: ['Software Engineering', 'Algorithms'],
      extractedSkills: ['Data Structures & Algorithms', 'System Design'],
      keyTopics: ['FAANG Interview Strategies', 'Scalable Database Sharding'],
      targetAudienceLevel: 'ALL',
      summary: 'Industry masterclass on algorithmic problem solving.',
      status: 'PROCESSED'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: 'evt_robotics_05',
    title: 'Computer Vision & Autonomous Robotics Workshop',
    description: 'Hands-on experience with OpenCV, YOLOv8 object detection, sensor fusion, and ROS2 for robotic navigation and real-time vision processing on embedded edge devices.',
    eventType: 'WORKSHOP',
    eventDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'Robotics & Embedded Systems Lab',
    registrationLink: 'https://campus1.vit.edu.in/workshops/cv-robotics',
    capacity: 80,
    department: 'Information Technology',
    status: 'UPCOMING',
    relevanceScore: 86,
    matchReason: 'Applied computer vision and sensor fusion for autonomous systems',
    matchType: 'SKILL_MATCH',
    matchedSkills: ['OpenCV', 'YOLOv8', 'ROS2', 'Python', 'Sensor Fusion'],
    matchedTopics: ['Object Tracking', 'Autonomous Navigation'],
    aiMetadata: {
      targetDomains: ['Robotics', 'Computer Vision'],
      extractedSkills: ['OpenCV', 'YOLOv8', 'ROS2'],
      keyTopics: ['Object Tracking', 'Autonomous Navigation'],
      targetAudienceLevel: 'INTERMEDIATE',
      summary: 'Practical laboratory workshop building real-time vision processing robots.',
      status: 'PROCESSED'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: 'evt_aerospace_06',
    title: 'Aerospace Avionics & Satellite Systems Symposium',
    description: 'Technical symposium exploring telemetry, satellite communication protocols, flight computers, and aerospace navigation algorithms in collaboration with ISRO & DRDO scientists.',
    eventType: 'SEMINAR',
    eventDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'Vikram Sarabhai Conference Center',
    registrationLink: 'https://campus1.vit.edu.in/events/aerospace-symposium',
    capacity: 150,
    department: 'Electronics & Telecommunication',
    status: 'UPCOMING',
    relevanceScore: 95,
    matchReason: 'Advanced aerospace avionics and defense satellite telemetry symposium',
    matchType: 'CAREER_GOAL_MATCH',
    matchedSkills: ['Telemetry Systems', 'Satellite Communication', 'Flight Control Systems'],
    matchedTopics: ['Orbital Mechanics', 'Embedded Avionics', 'Defense Electronics'],
    aiMetadata: {
      targetDomains: ['Aerospace', 'Telecommunications', 'Avionics'],
      extractedSkills: ['Telemetry Systems', 'Satellite Communication', 'Signal Processing'],
      keyTopics: ['Orbital Mechanics', 'Embedded Avionics'],
      targetAudienceLevel: 'INTERMEDIATE',
      summary: 'Symposium covering cutting-edge avionics and satellite telecommunications.',
      status: 'PROCESSED'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const StudentEventsPage: React.FC<{ onNavigateToRoadmap?: () => void }> = ({
  onNavigateToRoadmap,
}) => {
  const [activeTab, setActiveTab] = useState<'RECOMMENDED' | 'ALL'>('RECOMMENDED');
  const [recommendedEvents, setRecommendedEvents] = useState<CampusEvent[]>(DEFAULT_CAMPUS_EVENTS);
  const [allEvents, setAllEvents] = useState<CampusEvent[]>(DEFAULT_CAMPUS_EVENTS);
  const [studentGoal, setStudentGoal] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');
  const [registeredEvents, setRegisteredEvents] = useState<Set<string>>(new Set());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchEventsData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [recRes, allRes] = await Promise.allSettled([
        eventApi.getRecommendations(),
        eventApi.getAll({ status: 'UPCOMING' }),
      ]);

      let recs: CampusEvent[] = [];
      let all: CampusEvent[] = [];

      if (recRes.status === 'fulfilled' && recRes.value?.data) {
        recs = Array.isArray(recRes.value.data.recommendations) ? recRes.value.data.recommendations : [];
        if (recRes.value.data.studentTargetGoal) {
          setStudentGoal(recRes.value.data.studentTargetGoal);
        }
      }

      if (allRes.status === 'fulfilled' && allRes.value?.data) {
        all = Array.isArray(allRes.value.data) ? allRes.value.data : [];
      }

      // Use fetched events or fallback to DEFAULT_CAMPUS_EVENTS
      const finalAll = all.length > 0 ? all : DEFAULT_CAMPUS_EVENTS;
      const finalRecs = recs.length > 0 ? recs : finalAll;

      setRecommendedEvents(finalRecs);
      setAllEvents(finalAll);
    } catch (err: any) {
      console.error('Error fetching student events:', err);
      setRecommendedEvents(DEFAULT_CAMPUS_EVENTS);
      setAllEvents(DEFAULT_CAMPUS_EVENTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventsData();
  }, []);

  const handleRegister = (event: CampusEvent) => {
    setRegisteredEvents((prev) => new Set([...prev, event._id]));
    setToastMessage(`Registered for "${event.title}"! Reminder set.`);
    setTimeout(() => setToastMessage(null), 4000);

    if (event.registrationLink) {
      window.open(event.registrationLink, '_blank');
    }
  };

  const currentList = activeTab === 'RECOMMENDED' ? recommendedEvents : allEvents;

  const filteredEvents = currentList.filter((e) => {
    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.aiMetadata?.extractedSkills &&
        e.aiMetadata.extractedSkills.some((s) =>
          s.toLowerCase().includes(searchQuery.toLowerCase())
        )) ||
      (e.matchReason && e.matchReason.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = selectedType === 'ALL' || e.eventType === selectedType;
    return matchesSearch && matchesType;
  });

  const highMatchCount = recommendedEvents.filter((e) => (e.relevanceScore || 0) >= 80).length;

  return (
    <div className="space-y-6 pb-12">
      {/* Hero / Header */}
      <div className="bg-gradient-to-r from-[#0C2238] via-[#102a45] to-[#173859] p-6 md:p-8 rounded-3xl text-white shadow-xl shadow-[#0C2238]/10 border border-[#C99632]/20 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#C99632]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#C99632]/25 border border-[#C99632]/50 text-[#E8C56B] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> AI Personalized Recommendations
              </span>
              <span className="text-xs text-blue-200">Campus 1 Institutional Network</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold font-serif text-white tracking-tight">
              Campus Events & Technical Workshops
            </h1>
            <p className="text-sm text-gray-300 max-w-2xl mt-1.5 leading-relaxed">
              Intelligently matched to your primary career goals, roadmap milestones, and target technical skills.
            </p>

            {studentGoal && (
              <div className="flex items-center gap-2 mt-4 text-xs bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl w-fit">
                <Target className="w-3.5 h-3.5 text-[#E8C56B]" />
                <span className="text-gray-300">Active Profile Goal:</span>
                <span className="font-bold text-white">{studentGoal}</span>
                {onNavigateToRoadmap && (
                  <button
                    onClick={onNavigateToRoadmap}
                    className="ml-2 text-[#E8C56B] hover:underline font-semibold flex items-center gap-0.5"
                  >
                    View Roadmap <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Quick Metrics */}
          <div className="flex gap-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/15 px-4 py-3 rounded-2xl text-center min-w-[100px]">
              <div className="text-2xl font-bold text-[#E8C56B]">{highMatchCount}</div>
              <div className="text-[11px] text-gray-300 font-medium">Top Matches</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/15 px-4 py-3 rounded-2xl text-center min-w-[100px]">
              <div className="text-2xl font-bold text-white">{allEvents.length}</div>
              <div className="text-[11px] text-gray-300 font-medium">Upcoming</div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="flex items-center gap-2 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-sm font-medium shadow-sm animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-sm font-medium">
          <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Tab Selector & Filter Bar */}
      <div className="bg-white/80 backdrop-blur-md p-3 md:p-4 rounded-2xl border border-[#0C2238]/10 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Tabs */}
        <div className="flex items-center p-1 bg-gray-100 rounded-xl w-full md:w-auto">
          <button
            onClick={() => setActiveTab('RECOMMENDED')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all duration-200 ${
              activeTab === 'RECOMMENDED'
                ? 'bg-white text-[#0C2238] shadow-sm'
                : 'text-gray-600 hover:text-[#0C2238]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#C99632]" />
            AI Recommended ({recommendedEvents.length})
          </button>
          <button
            onClick={() => setActiveTab('ALL')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all duration-200 ${
              activeTab === 'ALL'
                ? 'bg-white text-[#0C2238] shadow-sm'
                : 'text-gray-600 hover:text-[#0C2238]'
            }`}
          >
            <Calendar className="w-4 h-4 text-gray-500" />
            All Events ({allEvents.length})
          </button>
        </div>

        {/* Search & Type Filter */}
        <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by topic or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs md:text-sm text-[#0C2238] focus:outline-none focus:ring-2 focus:ring-[#C99632]/50"
            />
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full md:w-auto bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs md:text-sm text-[#0C2238] focus:outline-none focus:ring-2 focus:ring-[#C99632]/50 font-medium"
          >
            {EVENT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Content Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#C99632]" />
          <p className="text-sm font-medium">Analyzing goals and matching events...</p>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="bg-white/70 backdrop-blur-sm border border-dashed border-gray-300 rounded-3xl p-12 text-center">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-[#0C2238]">No Matching Events</h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto mt-1">
            {searchQuery || selectedType !== 'ALL'
              ? 'Try modifying your search keywords or event type filter.'
              : 'Check back soon as faculty publish new workshops and hackathons.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((evt) => {
            const isRegistered = registeredEvents.has(evt._id);
            const score = evt.relevanceScore || 70;

            return (
              <div
                key={evt._id}
                className="bg-white/95 backdrop-blur-md rounded-3xl border border-[#0C2238]/10 shadow-lg shadow-[#0C2238]/05 p-6 flex flex-col justify-between hover:border-[#C99632]/50 hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              >
                {/* Top Accent Gradient Border on High Match */}
                {score >= 80 && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C99632] to-[#E2C06A]" />
                )}

                <div>
                  {/* Relevance Badge & Type */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="bg-[#0C2238]/08 text-[#0C2238] font-bold text-[11px] px-3 py-1 rounded-full uppercase tracking-wider">
                      {evt.eventType.replace('_', ' ')}
                    </span>

                    {/* AI Score Badge */}
                    {activeTab === 'RECOMMENDED' && (
                      <div
                        className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${
                          score >= 85
                            ? 'bg-amber-50 text-amber-900 border-amber-300/80 shadow-xs'
                            : score >= 75
                            ? 'bg-blue-50 text-blue-900 border-blue-200'
                            : 'bg-gray-50 text-gray-700 border-gray-200'
                        }`}
                      >
                        <Flame className={`w-3.5 h-3.5 ${score >= 85 ? 'text-amber-600 animate-pulse' : 'text-blue-500'}`} />
                        <span>{score}% Match</span>
                      </div>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-[#0C2238] group-hover:text-[#C99632] transition-colors leading-snug">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-2 line-clamp-3 leading-relaxed">
                    {evt.description}
                  </p>

                  {/* AI Why Recommended Banner */}
                  {evt.matchReason && activeTab === 'RECOMMENDED' && (
                    <div className="mt-3 p-2.5 bg-gradient-to-r from-amber-50/80 to-orange-50/50 rounded-xl border border-amber-200/60 flex items-start gap-2 text-xs text-amber-950 font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-[#C99632] flex-shrink-0 mt-0.5" />
                      <span>{evt.matchReason}</span>
                    </div>
                  )}

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-gray-100 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#C99632]" />
                      <span>
                        {new Date(evt.eventDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#C99632]" />
                      <span>
                        {new Date(evt.eventDate).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      <span className="truncate">{evt.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-gray-400" />
                      <span>Capacity: {evt.capacity}</span>
                    </div>
                  </div>

                  {/* AI Extracted Skills */}
                  {evt.aiMetadata?.extractedSkills && evt.aiMetadata.extractedSkills.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {evt.aiMetadata.extractedSkills.slice(0, 4).map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100/90 text-[#0C2238] text-[11px] font-medium px-2.5 py-0.5 rounded-lg"
                        >
                          #{skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Action */}
                <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-gray-100">
                  <div className="text-[11px] text-gray-400 truncate">
                    {evt.createdBy?.name ? `Organized by ${evt.createdBy.name}` : 'Campus 1 Faculty'}
                  </div>

                  <button
                    onClick={() => handleRegister(evt)}
                    disabled={isRegistered}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                      isRegistered
                        ? 'bg-emerald-100 text-emerald-800 cursor-default'
                        : 'bg-[#0C2238] hover:bg-[#173859] text-white shadow-md active:scale-95'
                    }`}
                  >
                    {isRegistered ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Registered
                      </>
                    ) : (
                      <>
                        Register <ExternalLink className="w-3 h-3" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
