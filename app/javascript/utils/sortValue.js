export const getMaxVote = (book) => {
  if (book.recommendations?.length) {
    return Math.max(...book.recommendations.map((r) => r.vote_count ?? 0));
  }
  return book.vote_count ?? 0;
};

export const getMostRecentDate = (book) => {
  if (book.recommendations?.length) {
    return new Date(
      Math.max(
        ...book.recommendations.map((r) => new Date(r.created_at).getTime())
      )
    );
  }
  return new Date(book.created_at);
};
