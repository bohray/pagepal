import React, { useState } from "react";
import BookCard from "./BookCard";
import { Link } from "react-router-dom";
import { getMaxVote, getMostRecentDate } from "../../utils/sortValue";
import { urls } from "../../constants/urls";

function BookFeed({
  data,
  title = "Trending Recommendations",
  linkRequired = false,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortBy, setSortBy] = useState("votes");

  const genres = ["All", ...new Set(data.map((r) => r.genre || "Other"))];

  const filteredData = data
    .filter((rec) => {
      const matchesSearch =
        rec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre =
        selectedGenre === "All" || rec.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    })
    .sort((a, b) => {
      if (sortBy === "votes") return getMaxVote(b) - getMaxVote(a);
      if (sortBy === "recent")
        return getMostRecentDate(b) - getMostRecentDate(a);
      return 0;
    });

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">{title}</h2>

      {/* Search, Genre, Sort */}
      <div className="mb-8 space-y-4">
        <input
          type="text"
          placeholder="Search books by title or author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <div className="flex gap-3 flex-wrap items-center">
          <div className="text-sm font-medium text-slate-500">Genre:</div>
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                selectedGenre === genre
                  ? "bg-primary text-white"
                  : "bg-blue-100 text-black hover:bg-primary hover:text-white cursor-pointer"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-slate-500">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          >
            <option value="votes">Most Voted</option>
            <option value="recent">Most Recent</option>
          </select>
        </div>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((rec) => (
          <BookCard key={rec.id} book={rec} />
        ))}
      </div>

      {linkRequired && (
        <div className="text-center mt-8">
          <Link to={urls.books} className="text-blue-600 hover:underline">
            View All Books →
          </Link>
        </div>
      )}
    </div>
  );
}

export default BookFeed;
