
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Event, Registration, User } from "@/types";
import { useToast } from "@/components/ui/use-toast";

interface EventContextType {
  events: Event[];
  registrations: Registration[];
  addEvent: (event: Omit<Event, "id" | "registeredCount">) => void;
  registerForEvent: (eventId: string, user: User) => void;
  getUserRegistrations: (userId: string) => Registration[];
  getEventRegistrations: (eventId: string) => Registration[];
  getEvent: (eventId: string) => Event | undefined;
  isRegistered: (userId: string, eventId: string) => boolean;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvents must be used within an EventProvider");
  }
  return context;
};

// Sample event data
const initialEvents: Event[] = [
  {
    id: "1",
    title: "Freshman Orientation",
    description: "Welcome event for all new students",
    date: "2025-08-25T10:00:00",
    location: "Main Auditorium",
    image: "https://source.unsplash.com/random/800x600/?college",
    capacity: 200,
    registeredCount: 45,
  },
  {
    id: "2",
    title: "Tech Fair 2025",
    description: "Annual technology exhibition with industry partners",
    date: "2025-09-15T09:00:00",
    location: "Science Building",
    image: "https://source.unsplash.com/random/800x600/?technology",
    capacity: 150,
    registeredCount: 72,
  },
  {
    id: "3",
    title: "Career Development Workshop",
    description: "Learn skills to enhance your employability",
    date: "2025-10-05T14:00:00",
    location: "Business School, Room 305",
    image: "https://source.unsplash.com/random/800x600/?workshop",
    capacity: 50,
    registeredCount: 23,
  },
];

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load events from local storage or initialize with sample data
    const storedEvents = localStorage.getItem("events");
    const storedRegistrations = localStorage.getItem("registrations");
    
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    } else {
      setEvents(initialEvents);
      localStorage.setItem("events", JSON.stringify(initialEvents));
    }
    
    if (storedRegistrations) {
      setRegistrations(JSON.parse(storedRegistrations));
    }
  }, []);

  const addEvent = (eventData: Omit<Event, "id" | "registeredCount">) => {
    const newEvent: Event = {
      ...eventData,
      id: Math.random().toString(36).substring(2, 9),
      registeredCount: 0,
    };
    
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    
    toast({
      title: "Event Created",
      description: "The event has been added successfully",
    });
  };

  const registerForEvent = (eventId: string, user: User) => {
    const event = events.find(e => e.id === eventId);
    
    if (!event) {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: "Event not found",
      });
      return;
    }

    // Check if already registered
    const isAlreadyRegistered = registrations.some(
      r => r.userId === user.id && r.eventId === eventId
    );
    
    if (isAlreadyRegistered) {
      toast({
        variant: "destructive",
        title: "Already Registered",
        description: "You are already registered for this event",
      });
      return;
    }
    
    // Check capacity
    if (event.registeredCount >= event.capacity) {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: "Event has reached maximum capacity",
      });
      return;
    }
    
    // Create registration
    const newRegistration: Registration = {
      id: Math.random().toString(36).substring(2, 9),
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      eventId: event.id,
      registrationDate: new Date().toISOString(),
    };
    
    // Update event registration count
    const updatedEvents = events.map(e => 
      e.id === eventId ? { ...e, registeredCount: e.registeredCount + 1 } : e
    );
    
    const updatedRegistrations = [...registrations, newRegistration];
    
    setEvents(updatedEvents);
    setRegistrations(updatedRegistrations);
    
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    localStorage.setItem("registrations", JSON.stringify(updatedRegistrations));
    
    toast({
      title: "Registration Successful",
      description: `You have registered for ${event.title}`,
    });
  };

  const getUserRegistrations = (userId: string) => {
    return registrations.filter(registration => registration.userId === userId);
  };

  const getEventRegistrations = (eventId: string) => {
    return registrations.filter(registration => registration.eventId === eventId);
  };

  const getEvent = (eventId: string) => {
    return events.find(event => event.id === eventId);
  };

  const isRegistered = (userId: string, eventId: string) => {
    return registrations.some(
      registration => registration.userId === userId && registration.eventId === eventId
    );
  };

  return (
    <EventContext.Provider
      value={{
        events,
        registrations,
        addEvent,
        registerForEvent,
        getUserRegistrations,
        getEventRegistrations,
        getEvent,
        isRegistered,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
