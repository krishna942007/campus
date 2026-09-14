import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
  Flame,
  ExternalLink,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { eventApi, CampusEvent } from '../services/api';
import { DEFAULT_CAMPUS_EVENTS } from './StudentEventsPage';

interface RecommendedEventsSectionProps {
  onViewAllEvents: () => void;
}

export const RecommendedEventsSection: React.FC<RecommendedEventsSectionProps> = ({
  onViewAllEvents,
}) => {
  const [events, setEvents] = useState<CampusEvent[]>(DEFAULT_CAMPUS_EVENTS.slice(0, 3));
  const [loading, setLoading] = useState(true);
  const [studentGoal, setStudentGoal] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadRecommendations = async () => {
      try {
        setLoading(true);
        const res = await eventApi.getRecommendations();
        if (isMounted) {
          const recs = Array.isArray(res?.data?.recommendations) && res.data.recommendations.length > 0
            ? res.data.recommendations
            : DEFAULT_CAMPUS_EVENTS;
          setEvents(recs.slice(0, 3));
          if (res?.data?.studentTargetGoal) {
            setStudentGoal(res.data.studentTargetGoal);
          }
        }
      } catch (err) {
        console.warn('Failed to load dashboard event recommendations, using default fallback:', err);
        if (isMounted) {
          setEvents(DEFAULT_CAMPUS_EVENTS.slice(0, 3));
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadRecommendations();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-[#0C2238]/10 shadow-lg shadow-[#0C2238]/05 p-6 space-y-4 transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-gradient-to-br from-[#C99632]/20 to-[#E2C06A]/20 border border-[#C99632]/30 rounded-xl text-[#C99632]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#0C2238]">
              Recommended Events For Your Roadmap
            </h3>
            <p className="text-xs text-gray-500">
              {studentGoal
                ? `Matched against your active goal: "${studentGoal}"`
                : 'AI-personalized technical events and workshops'}
            </p>
          </div>
        </div>

        <button
          onClick={onViewAllEvents}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#0C2238] hover:text-[#C99632] transition-colors group self-start sm:self-auto"
        >
          <span>View All Events</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Events Grid / Cards */}
      {loading ? (
        <div className="flex items-center justify-center py-8 text-gray-400 gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-[#C99632]" />
          <span className="text-xs font-medium">Matching upcoming campus events...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {events.map((evt) => {
            const score = evt.relevanceScore || 75;

            return (
              <div
                key={evt._id}
                onClick={onViewAllEvents}
                className="bg-white/95 rounded-2xl border border-gray-200/80 p-4 hover:border-[#C99632]/50 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="bg-[#0C2238]/06 text-[#0C2238] font-bold text-[10px] px-2 py-0.5 rounded-md uppercase">
                      {evt.eventType.replace('_', ' ')}
                    </span>
                    <span className="bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Flame className="w-3 h-3 text-amber-600" />
                      {score}%
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="text-xs font-bold text-[#0C2238] group-hover:text-[#C99632] transition-colors line-clamp-2 leading-snug">
                    {evt.title}
                  </h4>

                  {/* AI Reason */}
                  {evt.matchReason && (
                    <p className="text-[11px] text-amber-900/90 bg-amber-50/70 p-1.5 rounded-lg border border-amber-200/40 mt-2 line-clamp-2">
                      💡 {evt.matchReason}
                    </p>
                  )}
                </div>

                {/* Footer details */}
                <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#C99632]" />
                    <span>
                      {new Date(evt.eventDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <span className="text-[#C99632] font-semibold flex items-center gap-0.5 group-hover:underline">
                    Details <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
