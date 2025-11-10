import React, { useEffect, useState } from "react";
import { booksAPI, recommendationsAPI } from "../../services/api";
import { toast } from "sonner";
import BookFeed from "./BookFeed";

const BookList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getAllBooks = async () => {
      try {
        const response = await booksAPI.getAll();
        setData(response.data);
        console.log("Books API:", response);
      } catch (error) {
        console.log(error);
        toast.error(error?.message || "Failed Fetching Books!!");
      }
    };

    const getAllRecommendations = async () => {
      try {
        const response = await recommendationsAPI.getAll();
        console.log("recommendations API:", response);
      } catch (error) {
        console.log(error);
      }
    };

    getAllBooks();
    getAllRecommendations();
  }, []);
  return <BookFeed data={data} title="Book List" />;
};

export default BookList;
