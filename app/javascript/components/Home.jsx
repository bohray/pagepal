import React, { useEffect, useState } from "react";
import { recommendationsAPI } from "../services/api";
import BookFeed from "./books/BookFeed";
import RecommendationModal from "./recommendation/RecommendationModal";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";
import Loader from "./common/Loader";

function Home() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleModal = () => {
    if (!isAuthenticated) {
      toast.error("Login Required");
      return;
    }
    setModalOpen((prev) => !prev);
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const response = await recommendationsAPI.getTrending();
      setRecommendations(response.data.slice(0, 6));
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      {/* Banner */}
      <div className="text-center py-12  bg-linear-to-r from-primary to-blue-400 text-white rounded-lg mb-8">
        <h1 className="text-5xl font-bold mb-4">Welcome to PagePal</h1>
        <p className="text-xl mb-8">
          Discover and share your favorite books with the community
        </p>
        <button
          onClick={handleModal}
          className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition cursor-pointer"
        >
          Recommend a Book
        </button>
      </div>
      {modalOpen && (
        <RecommendationModal isOpen={modalOpen} onClose={handleClose} />
      )}

      <BookFeed data={recommendations} linkRequired />
    </div>
  );
}

export default Home;
