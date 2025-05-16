
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-132px)] flex items-center justify-center p-6">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <Calendar className="h-24 w-24 text-college-purple" strokeWidth={1.5} />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-college-purple">
              404
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4 text-college-textDark">Page Not Found</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Button asChild className="bg-college-purple hover:bg-college-darkPurple">
          <Link to="/" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
