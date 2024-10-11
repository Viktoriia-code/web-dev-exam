import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const BookPage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.token : null;

  const deleteBook = async (id) => {
    try {
      const res = await fetch(`/api/books/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to delete book: ${errorText}`);
      }
      console.log("Book deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`/api/books/${id}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const onDeleteClick = (bookId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this " + bookId
    );
    if (!confirm) return;

    deleteBook(bookId);
  };

  return (
    <div className="book-preview">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h2>{book.title}</h2>
          <p>Author: {book.author}</p>
          <p>ISBN: {book.isbn}</p>
          <p>Publisher: {book.publisher}</p>
          <p>Genre: {book.genre}</p>
          <p>Availability: {book && book.availability ? (book.availability.isAvailable ? 'Yes' : 'No') : 'Unknown'}</p>
          <p>Due Date: {book.availability.dueDate ? new Date(book.availability.dueDate).toLocaleDateString() : 'N/A'}</p>
          <p>Borrower: {book.availability.borrower || 'N/A'}</p>

          {isAuthenticated && (
            <>
              <button onClick={() => onDeleteClick(book.id)}>delete</button>
              <button onClick={() => navigate(`/edit-book/${book.id}`)}>
                edit
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default BookPage;
