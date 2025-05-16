
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import EventForm from "@/components/events/EventForm";
import RegistrationsList from "@/components/events/RegistrationsList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminPage() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("create");
  
  // Redirect if not authenticated or not admin
  if (!isAuthenticated || user?.role !== "admin") {
    return <Navigate to="/" />;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-college-textDark mb-8">Admin Dashboard</h1>
      
      <Tabs defaultValue="create" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
          <TabsTrigger value="create">Create Event</TabsTrigger>
          <TabsTrigger value="registrations">Manage Registrations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="create">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <EventForm />
            </div>
            <div className="bg-gray-50 rounded-lg border p-6">
              <h3 className="text-xl font-bold mb-4">Tips for Creating Events</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-college-purple font-bold mr-2">•</span>
                  Provide clear and descriptive titles
                </li>
                <li className="flex items-start">
                  <span className="text-college-purple font-bold mr-2">•</span>
                  Include all relevant details in the description
                </li>
                <li className="flex items-start">
                  <span className="text-college-purple font-bold mr-2">•</span>
                  Double-check the date and time
                </li>
                <li className="flex items-start">
                  <span className="text-college-purple font-bold mr-2">•</span>
                  Be specific about the location
                </li>
                <li className="flex items-start">
                  <span className="text-college-purple font-bold mr-2">•</span>
                  Set an appropriate capacity based on venue size
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="registrations">
          <RegistrationsList />
        </TabsContent>
      </Tabs>
    </div>
  );
}
