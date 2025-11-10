import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { recommendationsAPI } from "../services/api";
import BookCard from "./books/BookCard";
import BookFeed from "./books/BookFeed";

function Home() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortBy, setSortBy] = useState("votes");

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
    return <div className="text-center py-20">Loading...</div>;
  }

  const genres = [
    "All",
    ...new Set(recommendations.map((r) => r.genre || "Other")),
  ];

  const filteredRecommendations = recommendations
    .filter((rec) => {
      const matchesSearch =
        rec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre =
        selectedGenre === "All" || rec.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    })
    .sort((a, b) => {
      if (sortBy === "votes") {
        return b.vote_count - a.vote_count;
      } else if (sortBy === "recent") {
        return new Date(b.created_at) - new Date(a.created_at);
      }
      return 0;
    });

  return (
    <div>
      {/* Banner */}
      <div className="text-center py-12 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg mb-8">
        <h1 className="text-5xl font-bold mb-4">Welcome to PagePal</h1>
        <p className="text-xl mb-8">
          Discover and share your favorite books with the community
        </p>
        <Link
          to="/recommend"
          className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Recommend a Book
        </Link>
      </div>

      <BookFeed data={recommendations} linkRequired />
    </div>
  );
}

export default Home;
