# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Clear existing data
puts "Clearing existing data..."
Vote.destroy_all
Recommendation.destroy_all
Book.destroy_all
User.destroy_all

# Create users
puts "Creating users..."
users = []
5.times do |i|
  users << User.create!(
    email: "user#{i+1}@example.com",
    username: "User#{i+1}",
    password: "password123",
    password_confirmation: "password123"
  )
end

# Create books
puts "Creating books..."
books = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    image_url: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
    description: "A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.",
    isbn: "9780743273565",
    genre: "Classic"
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    image_url: "https://covers.openlibrary.org/b/id/8228691-L.jpg",
    description: "A gripping tale of racial injustice and childhood innocence in the Deep South.",
    isbn: "9780061120084",
    genre: "Historical Fiction"
  },
  {
    title: "1984",
    author: "George Orwell",
    image_url: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
    description: "A dystopian novel depicting a totalitarian regime under constant surveillance.",
    isbn: "9780451524935",
    genre: "Dystopian"
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    image_url: "https://covers.openlibrary.org/b/id/8091016-L.jpg",
    description: "A witty exploration of love and social standing in early 19th-century England.",
    isbn: "9780141040349",
    genre: "Romance"
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    image_url: "https://covers.openlibrary.org/b/id/6979861-L.jpg",
    description: "A fantasy adventure following Bilbo Baggins on a journey to reclaim treasure from a dragon.",
    isbn: "9780547928227",
    genre: "Fantasy"
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    image_url: "https://covers.openlibrary.org/b/id/8231856-L.jpg",
    description: "A story of teenage alienation and loss of innocence through the eyes of Holden Caulfield.",
    isbn: "9780316769488",
    genre: "Coming-of-Age"
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    image_url: "https://covers.openlibrary.org/b/id/8155411-L.jpg",
    description: "A philosophical journey of a shepherd seeking his personal legend and destiny.",
    isbn: "9780061122415",
    genre: "Adventure"
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    image_url: "https://covers.openlibrary.org/b/id/8776046-L.jpg",
    description: "A futuristic world driven by technology, control, and loss of individuality.",
    isbn: "9780060850524",
    genre: "Science Fiction"
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    image_url: "https://covers.openlibrary.org/b/id/8034155-L.jpg",
    description: "An epic high fantasy tale of the struggle to destroy the One Ring and defeat Sauron.",
    isbn: "9780618640157",
    genre: "Fantasy"
  },
  {
    title: "Moby-Dick",
    author: "Herman Melville",
    image_url: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
    description: "A deep and symbolic story of Captain Ahab’s obsession with the great white whale.",
    isbn: "9780142437247",
    genre: "Adventure"
  }
]
.map { |book_data| Book.create!(book_data) }

# Create recommendations
puts "Creating recommendations..."
books.each_with_index do |book, index|
  user = users[index % users.length]
  Recommendation.create!(
    user: user,
    book: book,
    review: "This is an amazing book that everyone should read! The story is captivating and the characters are well-developed."
  )
end

# Create votes
puts "Creating votes..."
Recommendation.all.each do |rec|
  rand(1..3).times do
    voter = users.sample
    Vote.create!(user: voter, recommendation: rec) unless rec.voted_by?(voter)
  end
end

puts "Seed data created successfully!"
puts "Users: #{User.count}"
puts "Books: #{Book.count}"
puts "Recommendations: #{Recommendation.count}"
puts "Votes: #{Vote.count}"