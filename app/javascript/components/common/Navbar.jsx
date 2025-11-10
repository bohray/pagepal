import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "sonner";
import { urls } from "../../constants/urls";

function Navbar() {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out succesfully!!");
    navigate(urls.home);
  };

  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold">
            📚 PagePal
          </Link>

          <div className="flex items-center space-x-6">
            <Link to={urls.home} className="hover:text-blue-200">
              Home
            </Link>
            <Link to="/books" className="hover:text-blue-200">
              Books
            </Link>
            {/* <Link to="/trending" className="hover:text-blue-200">
              Trending
            </Link> */}

            {isAuthenticated ? (
              <>
                {/* <Link to="/recommend" className="hover:text-blue-200">
                  Recommend
                </Link> */}
                <Link to={urls.profile} className="hover:text-blue-200">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to={urls.auth}
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
                >
                  Login / Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
