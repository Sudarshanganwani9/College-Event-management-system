
import { useEvents } from "@/contexts/EventContext";
import { Button } from "@/components/ui/button";
import EventCard from "@/components/events/EventCard";
import { Calendar, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  const { events } = useEvents();
  const featuredEvents = events.slice(0, 3); // Show only 3 events on homepage
  
  const features = [
    {
      title: "Discover Events",
      description: "Find campus events that match your interests and academic needs",
      icon: Calendar,
    },
    {
      title: "Easy Registration",
      description: "Register for events with just a few clicks",
      icon: Check,
    },
    {
      title: "Stay Updated",
      description: "Get reminders and updates about your registered events",
      icon: Calendar,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-college-purple to-college-darkPurple text-white py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Your College Events, All in One Place
              </h1>
              <p className="text-lg md:text-xl mb-8 opacity-90">
                Discover, register, and manage all your campus events with our easy-to-use platform.
              </p>
              <div className="space-x-4">
                <Button asChild size="lg" className="bg-white text-college-purple hover:bg-gray-100">
                  <Link to="/events">Browse Events</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                  <Link to="/auth">Sign Up Now</Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-64 h-64 bg-white/10 rounded-lg"></div>
                <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-white/10 rounded-lg"></div>
                <div className="relative bg-white p-2 rounded-lg shadow-lg">
                  <img 
                    src="https://source.unsplash.com/random/600x400/?college-event" 
                    alt="College Event" 
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 text-college-textDark">Why Use College Events</h2>
            <p className="text-gray-600">
              Our platform makes it easy for students to find and participate in campus activities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-college-purple/10 flex items-center justify-center rounded-lg mb-6">
                  <feature.icon className="h-6 w-6 text-college-purple" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-college-textDark">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Events Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-college-textDark">Featured Events</h2>
            <Button asChild variant="outline" className="group">
              <Link to="/events" className="flex items-center">
                View All 
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          
          {featuredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No events available at the moment.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-college-textDark">Ready to Join?</h2>
            <p className="text-gray-600 mb-8">
              Create an account today to start registering for campus events and activities
            </p>
            <Button asChild size="lg" className="bg-college-purple hover:bg-college-darkPurple">
              <Link to="/auth">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
