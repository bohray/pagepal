import React, { useState } from "react";
import {
  authButtons,
  getformFields,
  inititalAuthData,
} from "../../constants/Auth/static-data-auth";
import { toast } from "sonner";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export function AuthPage({ onAuthSuccess }) {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState(authButtons[0].id);
  const [formData, setFormData] = useState(inititalAuthData);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //mode is the login mode
  const loginMode = mode === authButtons[0].id;

  const formFields = getformFields(loginMode);

  const handleMode = () => {
    setMode((prev) =>
      prev !== authButtons[0].id ? authButtons[0].id : authButtons[1].id
    );
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = formData;
    if (!email || !password) {
      toast.error("Missing Credentials");
      return;
    }

    if (!loginMode && !name) {
      toast.error("Name is required");
      return;
    }

    setLoading(true);

    try {
      const action = loginMode ? login : signup;
      const args = loginMode ? [email, password] : [name, email, password];
      const toastMsg = loginMode
        ? "Logged in successfully!"
        : "Account created successfully!";

      await action(...args);
      toast.success(toastMsg);
      navigate(urls.home);
    } catch (err) {
      toast.error(
        err.response?.data?.error || err?.message || "Something Went Wrong"
      );
      console.error("Error while Logging: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[80vh] bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-card rounded-lg p-8 border border-gray-300 shadow-sm">
          <div className="flex gap-2 mb-8">
            {authButtons.map(({ title, id }) => (
              <button
                key={id}
                onClick={() => setMode(id)}
                className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                  mode === id
                    ? "bg-primary text-white"
                    : "bg-blue-100 hover:bg-primary hover:text-white cursor-pointer"
                }`}
              >
                {title}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {formFields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                </label>
                <input
                  name={field.name}
                  type={field.type}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 font-medium mt-6 transition-all duration-150 
           transform active:scale-95"
            >
              {loginMode ? "Login" : "Create Account"}
            </button>
          </form>

          <p className="text-center text-muted-foreground text-sm mt-6">
            {loginMode ? "Already have an account?" : "Don't have an account?"}
            <button
              className="text-primary hover:underline ml-1 font-medium"
              onClick={handleMode}
            >
              {loginMode ? "Login" : "Sign up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
