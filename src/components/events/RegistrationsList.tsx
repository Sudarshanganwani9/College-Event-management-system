
import { useState } from "react";
import { useEvents } from "@/contexts/EventContext";
import { Registration } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { User } from "lucide-react";

interface RegistrationsListProps {
  eventId?: string;
}

export default function RegistrationsList({ eventId }: RegistrationsListProps) {
  const { registrations, getEventRegistrations, events } = useEvents();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter registrations based on eventId prop or show all if not provided
  const filteredRegistrations: Registration[] = eventId
    ? getEventRegistrations(eventId)
    : registrations;
  
  // Filter by search term
  const displayedRegistrations = searchTerm
    ? filteredRegistrations.filter(
        (reg) =>
          reg.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          reg.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredRegistrations;
  
  // Get event title
  const getEventTitle = (eventId: string) => {
    const event = events.find((e) => e.id === eventId);
    return event ? event.title : "Unknown Event";
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <User className="mr-2 h-6 w-6 text-college-purple" />
          {eventId ? "Event Registrations" : "All Registrations"}
        </h2>
        <div className="w-full max-w-xs">
          <Input
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
      
      {displayedRegistrations.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                {!eventId && <TableHead>Event</TableHead>}
                <TableHead>Registration Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedRegistrations.map((registration) => (
                <TableRow key={registration.id}>
                  <TableCell className="font-medium">{registration.userName}</TableCell>
                  <TableCell>{registration.userEmail}</TableCell>
                  {!eventId && (
                    <TableCell>{getEventTitle(registration.eventId)}</TableCell>
                  )}
                  <TableCell>
                    {format(
                      new Date(registration.registrationDate),
                      "MMM d, yyyy 'at' h:mm a"
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-lg text-gray-500">No registrations found</p>
        </div>
      )}
    </div>
  );
}
