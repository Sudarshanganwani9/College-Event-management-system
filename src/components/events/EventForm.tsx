
import { useState } from "react";
import { useEvents } from "@/contexts/EventContext";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";

export default function EventForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState(50);
  const [image, setImage] = useState("");
  
  const { addEvent } = useEvents();
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!title || !description || !date || !time || !location) {
      toast({
        variant: "destructive",
        title: "Missing Fields",
        description: "Please fill in all required fields",
      });
      return;
    }
    
    // Combine date and time for ISO date string
    const dateTime = new Date(`${date}T${time}`).toISOString();
    
    // Create new event
    addEvent({
      title,
      description,
      date: dateTime,
      location,
      capacity,
      image,
    });
    
    // Reset form
    setTitle("");
    setDescription("");
    setDate("");
    setTime("");
    setLocation("");
    setCapacity(50);
    setImage("");
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Calendar className="mr-2 h-6 w-6 text-college-purple" />
        Create New Event
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Event Title</Label>
          <Input
            id="title"
            placeholder="Enter event title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe your event"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="Enter event location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="capacity">Capacity</Label>
            <Input
              id="capacity"
              type="number"
              min="1"
              value={capacity}
              onChange={(e) => setCapacity(parseInt(e.target.value))}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">Image URL (Optional)</Label>
            <Input
              id="image"
              placeholder="Enter image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
        </div>
        
        <Button type="submit" className="bg-college-purple hover:bg-college-darkPurple w-full">
          Create Event
        </Button>
      </form>
    </div>
  );
}
