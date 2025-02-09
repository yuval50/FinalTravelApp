import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { getAllPosts, getUsernameById } from "../api"; // יבוא פונקציות ה-API

interface Post {
  _id: string;
  title: string;
  content: string;
  userId: string;
  location: string;
  rating: number;
  images: string[];
  commentsCount: number;
  likes: string[];
  createdAt: string;
}

const Trips = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPosts();
        const postsData = response.data;

        // קריאה לפונקציה כדי להביא את שם המשתמשים עבור כל פוסט
        const updatedPosts = await Promise.all(
          postsData.map(async (post: Post) => {
            const usernameResponse = await getUsernameById(post.userId);  // מחפש את שם המשתמש
            const username = usernameResponse.data; // שליפת שם המשתמש מתוך הנתון returned

            return { ...post, username };
          })
        );

        setPosts(updatedPosts); // עדכון ה-state עם הפוסטים לאחר הוספת שם המשתמש
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="trips-container">
      <h1 style={{ textAlign: "center" }}>Explore Trips</h1>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        <div className="trips-list">
          {posts.length === 0 ? (
            <p style={{ textAlign: "center" }}>No trips found</p>
          ) : (
            posts.map((post) => (
              <Card key={post._id} className="shadow-sm border-0 rounded-lg overflow-hidden mt-5 p-3">
                {/* תמונת הפוסט */}
                <div className="position-relative w-100 text-center">
                  {post.images.length > 0 ? (
                    <img
                      src={post.images[0]}
                      alt="Post"
                      className="img-fluid rounded w-100"
                      style={{ height: "300px", objectFit: "cover" }}
                    />
                  ) : (
                    <p>No Image Available</p>
                  )}
                </div>

                <Card.Body>
                  {/* כותרת הפוסט */}
                  <h5 className="text-center my-2"> {post.title}</h5>

                  {/* תוכן הפוסט */}
                  <p className="text-center">{post.content}</p>

                  {/* שם מעלה הפוסט */}
                  <div className="text-center">
                    <span>Posted by: {}</span>
                  </div>

                  {/* מידע נוסף על הפוסט */}
                  <div className="text-center">
                    <span>📍 {post.location}</span>
                  </div>

                  {/* שורה אחת עם דירוג, לייקים, תגובות ושעת העלאה */}
                  <div className="d-flex justify-content-between mt-3 text-muted" style={{ gap: '20px' }}>
                    <span>⭐ {post.rating} / 5</span>
                    <span>❤️ {post.likes.length}</span>
                    <span>💬 {post.commentsCount}</span>
                    <span>{new Date(post.createdAt).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  </div>

                  {/* קישור לעמוד הפרטים */}
                  <Link to={`/post/${post._id}`} className="btn btn-primary mt-3">
                    View Details
                  </Link>
                </Card.Body>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Trips;
