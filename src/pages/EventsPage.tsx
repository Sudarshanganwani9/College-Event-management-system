
import { useState } from "react";
import { useEvents } from "@/contexts/EventContext";
import EventCard from "@/components/events/EventCard";
import { Input } from "@/components/ui/input";
import { Calendar, Search } from "lucide-react";

export default function EventsPage() {
  const { events } = useEvents();
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredEvents = searchTerm
    ? events.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : events;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div className="flex items-center">
          <Calendar className="h-8 w-8 mr-3 text-college-purple" />
          <h1 className="text-3xl font-bold text-college-textDark">Upcoming Events</h1>
        </div>
        
        <div className="relative max-w-md w-full">
          <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-gray-500" />
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-full"
          />
        </div>
      </div>
      
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-lg">
          <Calendar className="h-16 w-16 mb-4 text-college-purple opacity-50" />
          <h3 className="text-xl font-medium text-gray-700">No events found</h3>
          <p className="text-gray-500 mt-2">
            {searchTerm
              ? "Try adjusting your search criteria"
              : "Check back later for upcoming events"}
          </p>
        </div>
      )}
    </div>
  );
}
