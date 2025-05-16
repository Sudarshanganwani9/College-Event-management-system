
import { format } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import { useEvents } from "@/contexts/EventContext";
import { Event } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const { user, isAuthenticated } = useAuth();
  const { registerForEvent, isRegistered } = useEvents();
  const navigate = useNavigate();
  
  const formattedDate = format(new Date(event.date), "EEEE, MMMM d, yyyy 'at' h:mm a");
  const isUserRegistered = user ? isRegistered(user.id, event.id) : false;
  const isEventFull = event.registeredCount >= event.capacity;
  
  const handleRegister = () => {
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }
    
    if (user) {
      registerForEvent(event.id, user);
    }
  };
  
  const spotsRemaining = event.capacity - event.registeredCount;
  const availabilityColor = 
    spotsRemaining <= 10 ? "bg-red-100 text-red-800" :
    spotsRemaining <= 30 ? "bg-yellow-100 text-yellow-800" :
    "bg-green-100 text-green-800";

  return (
    <Card className="event-card overflow-hidden flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.image || "https://source.unsplash.com/random/800x600/?college"} 
          alt={event.title}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        {(isUserRegistered || isEventFull) && (
          <div className="absolute top-3 right-3">
            <Badge className={isEventFull ? "bg-red-500" : "bg-college-purple"}>
              {isUserRegistered ? "Registered" : "Full"}
            </Badge>
          </div>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">{event.title}</CardTitle>
        <CardDescription className="flex items-center text-sm">
          <Calendar size={16} className="mr-1 text-college-purple" />
          {formattedDate}
        </CardDescription>
        <CardDescription className="flex items-center text-sm">
          <MapPin size={16} className="mr-1 text-college-purple" />
          {event.location}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-gray-600 line-clamp-2">{event.description}</p>
        <div className="mt-4">
          <Badge className={`${availabilityColor} font-normal`}>
            {spotsRemaining} spot{spotsRemaining !== 1 ? 's' : ''} remaining
          </Badge>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button
          onClick={handleRegister}
          disabled={isUserRegistered || isEventFull}
          className={`w-full ${
            isUserRegistered
              ? "bg-gray-200 text-gray-600 cursor-not-allowed hover:bg-gray-200"
              : "bg-college-purple hover:bg-college-darkPurple"
          }`}
        >
          {isUserRegistered
            ? "Already Registered"
            : isEventFull
            ? "Event Full"
            : "Register Now"}
        </Button>
      </CardFooter>
    </Card>
  );
}
