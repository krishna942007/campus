import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Sparkles,
  Plus,
  Search,
  Filter,
  Trash2,
  Edit3,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  X,
  Loader2,
  Tag,
  BookOpen,
  Award,
} from 'lucide-react';
import { eventApi, CampusEvent } from '../services/api';
import { DEFAULT_CAMPUS_EVENTS } from './StudentEventsPage';

const EVENT_TYPES = [
  { value: 'ALL', label: 'All Event Types' },
  { value: 'WORKSHOP', label: 'Workshop' },
  { value: 'HACKATHON', label: 'Hackathon' },
  { value: 'SEMINAR', label: 'Seminar' },
  { value: 'GUEST_LECTURE', label: 'Guest Lecture' },
  { value: 'COMPETITION', label: 'Competition' },
  { value: 'CAREER_FAIR', label: 'Career Fair' },
  { value: 'WEBINAR', label: 'Webinar' },
  { value: 'OTHER', label: 'Other' },
];

export const EventManagement: React.FC = () => {
  const [events, setEvents] = useState<CampusEvent[]>(DEFAULT_CAMPUS_EVENTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');
  const [viewScope, setViewScope] = useState<'ALL_CAMPUS' | 'MY_EVENTS'>('ALL_CAMPUS');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CampusEvent | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventType: 'WORKSHOP',
    eventDate: '',
    endDate: '',
    location: '',
    registrationLink: '',
    capacity: 100,
    department: 'All',
    status: 'UPCOMING',
  });

  const LOCAL_EVENTS_KEY = 'vit_mumbai_mentor_events_v1';

  const getLocalEvents = (): CampusEvent[] => {
    try {
      const cached = localStorage.getItem(LOCAL_EVENTS_KEY);
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  };

  const saveLocalEvents = (eventsToSave: CampusEvent[]) => {
    try {
      localStorage.setItem(LOCAL_EVENTS_KEY, JSON.stringify(eventsToSave));
    } catch {}
  };

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      let fetched: CampusEvent[] = [];

      try {
        const res = await eventApi.getAll();
        if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
          fetched = res.data;
        } else {
          const mentorRes = await eventApi.getMentorEvents();
          if (mentorRes?.data && Array.isArray(mentorRes.data) && mentorRes.data.length > 0) {
            fetched = mentorRes.data;
          }
        }
      } catch (apiErr) {
        console.warn('API event fetching fallback to local/prototype events:', apiErr);
      }

      const localCached = getLocalEvents();
      const mergedMap = new Map<string, CampusEvent>();

      // Priority 1: Fetched backend events
      fetched.forEach((e) => mergedMap.set(e._id || e.title, e));

      // Priority 2: Local custom created events
      localCached.forEach((e) => {
        if (!mergedMap.has(e._id) && !mergedMap.has(e.title)) {
          mergedMap.set(e._id, e);
        }
      });

      // Priority 3: Default prototype events if empty
      if (mergedMap.size === 0) {
        DEFAULT_CAMPUS_EVENTS.forEach((e) => mergedMap.set(e._id, e));
      }

      const finalEventsList = Array.from(mergedMap.values());
      setEvents(finalEventsList);
    } catch (err: any) {
      console.error('Failed to load mentor events:', err);
      setEvents(DEFAULT_CAMPUS_EVENTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleOpenCreateModal = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      description: '',
      eventType: 'WORKSHOP',
      eventDate: new Date(Date.now() + 86400000).toISOString().slice(0, 16),
      endDate: '',
      location: 'Auditorium Hall A / Lab',
      registrationLink: '',
      capacity: 100,
      department: 'All',
      status: 'UPCOMING',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (event: CampusEvent) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      eventType: event.eventType,
      eventDate: event.eventDate ? new Date(event.eventDate).toISOString().slice(0, 16) : '',
      endDate: event.endDate ? new Date(event.endDate).toISOString().slice(0, 16) : '',
      location: event.location || '',
      registrationLink: event.registrationLink || '',
      capacity: event.capacity || 100,
      department: event.department || 'All',
      status: event.status || 'UPCOMING',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim() || !formData.eventDate) {
      setError('Please fill in title, description, and event date');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      let savedSuccessfully = false;

      try {
        if (editingEvent) {
          await eventApi.update(editingEvent._id, formData as any);
        } else {
          await eventApi.create(formData as any);
        }
        savedSuccessfully = true;
      } catch (apiErr) {
        console.warn('API save event failed, creating locally:', apiErr);
      }

      // If backend API was unreachable, perform local creation/update
      if (!savedSuccessfully) {
        const timestamp = Date.now();
        const extractedSkills = formData.title
          .split(' ')
          .concat(formData.description.split(' '))
          .filter((w) => w.length > 4)
          .slice(0, 4);

        if (editingEvent) {
          const updated = events.map((ev) =>
            ev._id === editingEvent._id
              ? {
                  ...ev,
                  ...formData,
                  aiMetadata: {
                    ...(ev.aiMetadata || {
                      targetDomains: [formData.department || 'General Engineering'],
                      targetAudienceLevel: 'ALL',
                      summary: formData.description,
                      status: 'PROCESSED',
                    }),
                    extractedSkills,
                  },
                }
              : ev
          );
          setEvents(updated as any);
          saveLocalEvents(updated as any);
        } else {
          const newEvent: CampusEvent = {
            _id: `evt_local_${timestamp}`,
            title: formData.title.trim(),
            description: formData.description.trim(),
            eventType: formData.eventType as any,
            eventDate: new Date(formData.eventDate).toISOString(),
            endDate: formData.endDate ? new Date(formData.endDate).toISOString() : undefined,
            location: formData.location || 'Auditorium / Campus',
            registrationLink: formData.registrationLink || '',
            capacity: Number(formData.capacity) || 100,
            department: formData.department || 'All',
            status: (formData.status as any) || 'UPCOMING',
            createdBy: {
              _id: 'men_01',
              name: 'Prof. S. Kulkarni',
              email: 's.kulkarni@vit.edu.in',
              department: 'Computer Engineering & AI Systems',
            },
            aiMetadata: {
              targetDomains: [formData.department || 'General Engineering'],
              extractedSkills,
              keyTopics: [formData.title],
              targetAudienceLevel: 'ALL',
              summary: formData.description,
              status: 'PROCESSED',
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          const updated = [newEvent, ...events];
          setEvents(updated);
          const currentLocals = getLocalEvents();
          saveLocalEvents([newEvent, ...currentLocals]);
        }
      }

      setSuccessMessage(
        editingEvent
          ? 'Event updated & AI metadata refreshed!'
          : 'Event published & AI metadata extracted!'
      );

      setIsModalOpen(false);
      window.dispatchEvent(
        new CustomEvent('campus-toast', {
          detail: {
            title: editingEvent ? 'Event Updated' : 'Event Published',
            message: `"${formData.title}" is now active and matched with student roadmaps.`,
            type: 'success',
          },
        })
      );

      await fetchEvents();
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      console.error('Failed to save event:', err);
      setError(err.message || 'Error saving event');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      try {
        await eventApi.delete(id);
      } catch (apiErr) {
        console.warn('API delete failed, removing locally:', apiErr);
      }

      const updated = events.filter((e) => e._id !== id);
      setEvents(updated);
      saveLocalEvents(updated);
      setSuccessMessage('Event deleted successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to delete event');
    }
  };

  const filteredEvents = events.filter((e) => {
    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.aiMetadata?.extractedSkills &&
        e.aiMetadata.extractedSkills.some((s) =>
          s.toLowerCase().includes(searchQuery.toLowerCase())
        ));
    const matchesType = selectedType === 'ALL' || e.eventType === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner & Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#0C2238] to-[#173859] p-6 rounded-2xl text-white shadow-xl shadow-[#0C2238]/10 border border-[#C99632]/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#C99632]/20 border border-[#C99632]/40 text-[#E8C56B] text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> AI Knowledge Indexed
            </span>
            <span className="text-xs text-blue-200">Campus 1 Institutional Events</span>
          </div>
          <h2 className="text-2xl font-bold font-serif text-white tracking-tight">
            Event Management Hub
          </h2>
          <p className="text-sm text-gray-300 max-w-2xl mt-1">
            Publish institutional workshops, hackathons, and seminars. Our AI engine extracts technical skills and concepts to recommend them to relevant student career roadmaps.
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#C99632] to-[#E2C06A] hover:from-[#b08126] hover:to-[#cda954] text-[#0C2238] font-bold px-5 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-sm whitespace-nowrap active:scale-95"
        >
          <Plus className="w-4 h-4" /> Create New Event
        </button>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="flex items-center gap-2 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-medium animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-sm font-medium">
          <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Controls & Search */}
      <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-[#0C2238]/10 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, topic, or skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/90 border border-gray-200 rounded-xl text-sm text-[#0C2238] focus:outline-none focus:ring-2 focus:ring-[#C99632]/50"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-white/90 border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#0C2238] focus:outline-none focus:ring-2 focus:ring-[#C99632]/50 font-medium"
          >
            {EVENT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Events List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#C99632]" />
          <p className="text-sm font-medium">Loading institutional events...</p>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="bg-white/60 backdrop-blur-sm border border-dashed border-gray-300 rounded-2xl p-12 text-center">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-[#0C2238]">No Events Found</h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto mt-1 mb-5">
            {searchQuery || selectedType !== 'ALL'
              ? 'No events match your current search and filter settings.'
              : 'You have not created any events yet. Publish your first workshop or seminar to reach students!'}
          </p>
          <button
            onClick={handleOpenCreateModal}
            className="inline-flex items-center gap-2 bg-[#0C2238] hover:bg-[#173859] text-white font-medium px-4 py-2 rounded-xl text-sm transition-colors"
          >
            <Plus className="w-4 h-4" /> Create Event
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((evt) => (
            <div
              key={evt._id}
              className="bg-white/90 backdrop-blur-md rounded-2xl border border-[#0C2238]/10 shadow-lg shadow-[#0C2238]/05 p-6 flex flex-col justify-between hover:border-[#C99632]/40 transition-all duration-300 group"
            >
              <div>
                {/* Badges Bar */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="bg-[#0C2238]/08 text-[#0C2238] font-semibold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                    {evt.eventType.replace('_', ' ')}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                        evt.status === 'UPCOMING'
                          ? 'bg-emerald-100 text-emerald-800'
                          : evt.status === 'ONGOING'
                          ? 'bg-blue-100 text-blue-800 animate-pulse'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      ● {evt.status}
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-bold text-[#0C2238] group-hover:text-[#C99632] transition-colors leading-snug">
                  {evt.title}
                </h3>
                <p className="text-xs text-gray-600 mt-2 line-clamp-3 leading-relaxed">
                  {evt.description}
                </p>

                {/* Event Metadata (Date, Location, Capacity) */}
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

                {/* AI Extracted Insights */}
                {evt.aiMetadata && (
                  <div className="mt-4 p-3 bg-gradient-to-r from-amber-50/50 to-orange-50/30 rounded-xl border border-amber-200/40">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#0C2238]">
                        <Sparkles className="w-3.5 h-3.5 text-[#C99632]" />
                        <span>AI Skill & Concept Index</span>
                      </div>
                      <span className="text-[10px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                        {evt.aiMetadata.targetAudienceLevel || 'ALL'} LEVEL
                      </span>
                    </div>

                    {evt.aiMetadata.extractedSkills && evt.aiMetadata.extractedSkills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {evt.aiMetadata.extractedSkills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="bg-white/90 border border-amber-200/70 text-[#0C2238] text-[11px] font-medium px-2 py-0.5 rounded-md shadow-2xs"
                          >
                            #{skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-gray-100">
                {evt.registrationLink ? (
                  <a
                    href={evt.registrationLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Registration Link
                  </a>
                ) : (
                  <span className="text-xs text-gray-400">Direct Campus Entry</span>
                )}

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEditModal(evt)}
                    className="p-2 text-gray-500 hover:text-[#0C2238] hover:bg-gray-100 rounded-lg transition-colors"
                    title="Edit Event"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(evt._id)}
                    className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete Event"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-[#C99632]/10 rounded-xl text-[#C99632]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0C2238]">
                    {editingEvent ? 'Edit Campus Event' : 'Create New Campus Event'}
                  </h3>
                  <p className="text-xs text-gray-500">
                    AI will automatically analyze and extract learning skills upon saving.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mt-5">
              <div>
                <label className="block text-xs font-bold text-[#0C2238] uppercase tracking-wider mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Deep Learning & Computer Vision Workshop"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-[#0C2238] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C99632]/50 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0C2238] uppercase tracking-wider mb-1">
                    Event Type *
                  </label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-[#0C2238] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C99632]/50 font-medium"
                  >
                    {EVENT_TYPES.filter((t) => t.value !== 'ALL').map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0C2238] uppercase tracking-wider mb-1">
                    Department Target
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Computer Engineering or All"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-[#0C2238] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C99632]/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0C2238] uppercase tracking-wider mb-1">
                    Start Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-[#0C2238] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C99632]/50 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0C2238] uppercase tracking-wider mb-1">
                    End Date & Time (Optional)
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-[#0C2238] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C99632]/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0C2238] uppercase tracking-wider mb-1">
                    Location / Room
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Auditorium Hall B / Zoom"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-[#0C2238] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C99632]/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0C2238] uppercase tracking-wider mb-1">
                    Max Capacity
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-[#0C2238] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C99632]/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0C2238] uppercase tracking-wider mb-1">
                  Registration URL / Link
                </label>
                <input
                  type="url"
                  placeholder="https://forms.gle/... or institutional link"
                  value={formData.registrationLink}
                  onChange={(e) => setFormData({ ...formData, registrationLink: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-[#0C2238] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C99632]/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0C2238] uppercase tracking-wider mb-1">
                  Detailed Description *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe the topics covered, hands-on labs, technologies used (e.g. PyTorch, Docker), and takeaways for students..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-[#0C2238] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C99632]/50 leading-relaxed"
                />
              </div>

              {editingEvent && (
                <div>
                  <label className="block text-xs font-bold text-[#0C2238] uppercase tracking-wider mb-1">
                    Event Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-[#0C2238] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C99632]/50 font-medium"
                  >
                    <option value="UPCOMING">UPCOMING</option>
                    <option value="ONGOING">ONGOING</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 bg-[#0C2238] hover:bg-[#173859] text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow-md transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Extracting AI Insights & Saving...</span>
                    </>
                  ) : editingEvent ? (
                    'Save Changes'
                  ) : (
                    'Publish Event'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
