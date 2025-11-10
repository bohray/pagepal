import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import Navbar from "./common/Navbar";
import Home from "./Home";
import BookList from "./books/BookList";
import Profile from "./profile/Profile";
import { AuthPage } from "./auth/AuthPage";
import { Toaster } from "sonner";
import Loader from "./common/Loader";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <Loader />;
  }

  return isAuthenticated ? children : <Navigate to="/auth" />;
};

function AppRoutes() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/books" element={<BookList />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-center" richColors />
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
