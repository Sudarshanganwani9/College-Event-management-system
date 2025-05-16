
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  Calendar,
  LogOut,
  Menu,
  User,
  X
} from "lucide-react";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white border-b sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and site name */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-college-purple" />
              <span className="font-bold text-xl text-college-textDark">College Events</span>
            </Link>
          </div>
          
          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-college-purple font-medium">
              Home
            </Link>
            <Link to="/events" className="text-gray-600 hover:text-college-purple font-medium">
              Events
            </Link>
            {isAuthenticated && user?.role === "admin" && (
              <Link to="/admin" className="text-gray-600 hover:text-college-purple font-medium">
                Admin Dashboard
              </Link>
            )}
            {isAuthenticated && (
              <Link to="/my-registrations" className="text-gray-600 hover:text-college-purple font-medium">
                My Registrations
              </Link>
            )}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <User size={18} className="mr-2 text-college-purple" />
                  <span className="font-medium">{user?.name}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center space-x-1 border-college-purple text-college-purple hover:bg-college-purple/10"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button className="bg-college-purple hover:bg-college-darkPurple">
                  Login
                </Button>
              </Link>
            )}
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white border-t px-4 py-2">
          <div className="flex flex-col space-y-3 py-3">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-college-purple font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/events" 
              className="text-gray-600 hover:text-college-purple font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </Link>
            {isAuthenticated && user?.role === "admin" && (
              <Link 
                to="/admin" 
                className="text-gray-600 hover:text-college-purple font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Dashboard
              </Link>
            )}
            {isAuthenticated && (
              <Link 
                to="/my-registrations" 
                className="text-gray-600 hover:text-college-purple font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                My Registrations
              </Link>
            )}
            {isAuthenticated ? (
              <div className="space-y-3 pt-2 border-t">
                <div className="flex items-center py-1">
                  <User size={18} className="mr-2 text-college-purple" />
                  <span className="font-medium">{user?.name}</span>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full justify-center border-college-purple text-college-purple hover:bg-college-purple/10"
                >
                  <LogOut size={16} className="mr-2" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <Link 
                to="/auth" 
                onClick={() => setIsMenuOpen(false)}
                className="block"
              >
                <Button className="w-full bg-college-purple hover:bg-college-darkPurple">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
