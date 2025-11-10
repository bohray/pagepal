import React, { useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { recommendationsAPI } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "sonner";
import { Link } from "react-router-dom";

/**
 * RecommendationCard - renders one recommendation (or a single book shaped as a recommendation)
 * Props:
 *  - id, review, vote_count, user, created_at
 *  - image_url, title, author, genre (these come from parent book for context)
 */
const RecommendationCard = ({
  id,
  review,
  vote_count,
  user,
  created_at,
  image_url,
  title,
  author,
  genre,
}) => {
  const { isAuthenticated } = useAuth();
  const [hasVoted, setHasVoted] = useState(false);
  const [votes, setVotes] = useState(vote_count ?? 0);

  const handleVoteToggle = async () => {
    if (!isAuthenticated) {
      toast.error("Login Required!!");
      return;
    }

    try {
      let response;
      if (hasVoted) {
        response = await recommendationsAPI.unvote(id);
        setHasVoted(false);
      } else {
        response = await recommendationsAPI.vote(id);
        setHasVoted(true);
      }

      console.log(response);
      // update votes from response if available; fallback to local increment/decrement
      if (response?.data?.vote_count !== undefined) {
        setVotes(Number(response.data.vote_count));
      } else {
        setVotes((prev) => (hasVoted ? Math.max(0, prev - 1) : prev + 1));
      }
    } catch (error) {
      console.error("Error updating vote: ", error);
      toast.error("Could not update vote. Try again.");
    }
  };

  return (
    <Link key={id} to={`/book/${id}`}>
      <div className="rounded-lg border border-gray-300 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
        <div className="relative h-52 bg-primary/40 overflow-hidden">
          <img
            src={image_url || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-bold text-lg line-clamp-1">{title}</h3>
          <p className="text-sm text-slate-500 mb-1">{author}</p>
          {genre && (
            <p className="text-xs text-slate-600 mb-3 font-medium">{genre}</p>
          )}
          <p className="text-sm line-clamp-3 mb-4 flex-1">{review}</p>
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex flex-col">
              <span className="text-xs text-slate-500">
                {user?.username || "Unknown"}
              </span>
              <span className="text-xs text-slate-500">
                {formatDate(created_at)}
              </span>
            </div>
            <button
              onClick={handleVoteToggle}
              className={`px-4 py-2 rounded-lg font-medium cursor-pointer text-sm transition-all duration-200 active:scale-90 ${
                hasVoted
                  ? "bg-primary text-white"
                  : "bg-blue-100 hover:bg-primary hover:text-white"
              }`}
            >
              Votes : {votes}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

const BookCard = ({ book }) => {
  const hasRecommendations =
    Array.isArray(book?.recommendations) && book.recommendations.length > 0;

  if (!hasRecommendations) {
    const singleRecommendation = {
      id: book.id,
      review: book.review ?? "",
      vote_count: book.vote_count ?? 0,
      user: book.user ?? { username: book.username ?? "Unknown" },
      created_at: book.created_at,
      image_url: book.image_url,
      title: book.title,
      author: book.author,
      genre: book.genre,
    };

    return <RecommendationCard {...singleRecommendation} />;
  }

  return (
    <div className="space-y-4">
      {book.recommendations.map((rec) => (
        <RecommendationCard
          key={rec.id}
          id={rec.id}
          review={rec.review}
          vote_count={rec.vote_count}
          user={rec.user}
          created_at={rec.created_at}
          image_url={book.image_url}
          title={book.title}
          author={book.author}
          genre={book.genre}
        />
      ))}
    </div>
  );
};

export default BookCard;
