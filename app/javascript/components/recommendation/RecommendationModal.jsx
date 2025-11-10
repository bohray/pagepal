import React, { useState, useRef } from "react";
import { recommendationsAPI } from "../../services/api";
import { toast } from "sonner";
import { useAuth } from "../../contexts/AuthContext";
import {
  formFields,
  initialFormData,
} from "../../constants/Recommendations/static-upload-data";

export default function RecommendationModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState(initialFormData);
  const fileInputRef = useRef(null);
  const { isAuthenticated } = useAuth();

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
        image_url: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Login Required!!");
      return;
    }
    try {
      const response = await recommendationsAPI.create(formData);
      toast.success("Recommendation Created!!");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!!");
    } finally {
      setFormData(initialFormData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 p-6 overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-1">Recommend a Book</h2>
        <p className="text-sm text-gray-500 mb-4">
          Enter book details and share your thoughts
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {formFields.map((field) => {
            // Image field
            if (field.type === "file") {
              return (
                <div key={field.name}>
                  <label className="block text-sm font-medium mb-1">
                    {field.label}
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full px-4 py-2 border-2 border-dashed rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    {formData.image_url ? "Change Image" : "Upload Cover Image"}
                  </button>
                  {formData.image_url && (
                    <div className="relative mt-2">
                      <img
                        src={formData.image_url}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            imageFile: null,
                            image_url: "",
                          }))
                        }
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    JPG, PNG, or WebP. Max 5MB
                  </p>
                </div>
              );
            }

            // Text or textarea fields
            return (
              <div key={field.name}>
                <label className="block text-sm font-medium mb-1">
                  {field.label}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    rows={field.rows || 3}
                    maxLength={field.maxLength}
                    required={field.required}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none"
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                )}
                {field.name === "review" && (
                  <div className="text-xs text-gray-400 mt-1">
                    {formData.review.length}/{field.maxLength}
                  </div>
                )}
              </div>
            );
          })}

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
