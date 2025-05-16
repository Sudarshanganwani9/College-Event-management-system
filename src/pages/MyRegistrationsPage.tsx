
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEvents } from "@/contexts/EventContext";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar, CheckCheck } from "lucide-react";

export default function MyRegistrationsPage() {
  const { user, isAuthenticated } = useAuth();
  const { getUserRegistrations, getEvent } = useEvents();
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }
  
  const userRegistrations = user ? getUserRegistrations(user.id) : [];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-8">
        <CheckCheck className="h-8 w-8 mr-3 text-college-purple" />
        <h1 className="text-3xl font-bold text-college-textDark">My Registrations</h1>
      </div>
      
      {userRegistrations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userRegistrations.map((registration) => {
            const event = getEvent(registration.eventId);
            if (!event) return null;
            
            return (
              <div key={registration.id} className="bg-white border rounded-lg overflow-hidden shadow-sm">
                <div className="relative h-36 bg-gradient-to-r from-college-purple to-college-darkPurple">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Calendar className="h-16 w-16 text-white opacity-20" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-xl font-bold text-white text-center px-4">{event.title}</h3>
                  </div>
                </div>
                
                <div className="p-5 space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Date & Time</h4>
                    <p className="text-gray-800">
                      {format(new Date(event.date), "EEEE, MMMM d, yyyy 'at' h:mm a")}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Location</h4>
                    <p className="text-gray-800">{event.location}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Registration Date</h4>
                    <p className="text-gray-800">
                      {format(new Date(registration.registrationDate), "MMMM d, yyyy")}
                    </p>
                  </div>
                  
                  <Button variant="outline" className="w-full border-college-purple text-college-purple hover:bg-college-purple/10">
                    View Details
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-16 flex flex-col items-center justify-center bg-gray-50 rounded-lg">
          <Calendar className="h-16 w-16 mb-4 text-college-purple opacity-50" />
          <h3 className="text-xl font-medium text-gray-700">No registrations yet</h3>
          <p className="text-gray-500 mt-2 mb-8 text-center max-w-md">
            You haven't registered for any events yet. Browse our events and sign up for something interesting!
          </p>
          <Button asChild className="bg-college-purple hover:bg-college-darkPurple">
            <a href="/events">Browse Events</a>
          </Button>
        </div>
      )}
    </div>
  );
}
