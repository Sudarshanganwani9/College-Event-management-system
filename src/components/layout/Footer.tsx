
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-auto">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <Calendar className="h-6 w-6 text-college-purple" />
              <span className="font-bold text-xl text-college-textDark">College Events</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Your one-stop platform for discovering, registering, and managing college events.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/events" className="text-sm text-gray-600 hover:text-college-purple">
                  All Events
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-gray-600 hover:text-college-purple">
                  FAQ
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-college-purple">
                  Help Center
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-college-purple">
                  support@collegeevents.edu
                </a>
              </li>
              <li>
                <span className="text-sm text-gray-600">
                  +1 (555) 123-4567
                </span>
              </li>
              <li>
                <span className="text-sm text-gray-600">
                  123 University Ave, College Town
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-300 pt-8 flex flex-col md:flex-row md:justify-between">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} College Events. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-college-purple">
              Terms
            </a>
            <a href="#" className="text-gray-500 hover:text-college-purple">
              Privacy
            </a>
            <a href="#" className="text-gray-500 hover:text-college-purple">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
