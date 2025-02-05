import { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";

const images = [
  "https://www.tapet3d.co.il/files/products/product23_image1_2021-03-29_11-25-56.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg-qCkUaQFipMjEL7yyfLZIewUULG6BuU83Q&s"
];

export default function PostCard() {
  const [stars, setLStars] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  const [commentsCount] = useState(12); // נניח שמספר התגובות התחלתי הוא 12

  return (
    <Card className="shadow-sm border-0 rounded-lg overflow-hidden mt-5 p-3">
      {/* תמונת הפוסט */}
      <div className="position-relative w-100 text-center">
        <img
          src={images[currentIndex]}
          alt="Post"
          className="img-fluid rounded w-100"
          style={{ height: "300px", width: "50%", objectFit: "cover" }}
        />
<button
  onClick={prevImage}
  className="position-absolute start-0 top-50 translate-middle-y border-0 bg-transparent p-2"
  style={{ opacity: 0.7, transition: "opacity 0.2s" }}
  onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
>
  <svg width="20" height="20" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
    <polygon points="16,4 6,12 16,20" fill="black"/>
  </svg>
</button>

<button
  onClick={nextImage}
  className="position-absolute end-0 top-50 translate-middle-y border-0 bg-transparent p-2"
  style={{ opacity: 0.7, transition: "opacity 0.2s" }}
  onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
>
  <svg width="20" height="20" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
    <polygon points="8,4 18,12 8,20" fill="black"/>
  </svg>
</button>


      </div>
      
      <Card.Body>
        {/* כותרת הפוסט */}
        <h5 className="text-center my-2">🌍 Hiking in the Negev Desert</h5>
        
        {/* מלל של הפוסט */}
        <p className="text-center">
          An amazing adventure exploring the desert trails! The scenery was breathtaking and the sunset was unforgettable.
        </p>
        
        {/* תמונה של המעלה ושם המשתמש + תאריך */}
        <div className="d-flex align-items-center justify-content-between border-top pt-2">
          <div className="d-flex align-items-center">
            <img
              src="data:image/png;base64,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"
              alt="User"
              className="rounded-circle me-1"
              style={{ width: "40px", height: "40px", objectFit: "cover" }}
            />
            <div>
              <strong>John Doe</strong>
            </div>
          </div>
          <button
    className="btn  d-flex align-items-center "
    onClick={() => setLStars(stars + 1)}
  >
    {[...Array(5)].map((_, index) => (
      <svg 
        key={index} 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill={index < stars ? "gold" : "gray"} 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2l2.83 6.26L22 9.27l-5 4.87L18.66 22 12 18.56 5.34 22 7 14.14l-5-4.87 7.17-1.01L12 2z"/>
      </svg>
    ))}
  </button>
  <Link to="/Post_view" className="btn d-flex align-items-center text-decoration-none text-dark">
    Comment 💬
    <span className="ms-1" style={{ fontSize: "1.1rem", color: "gray" }}>
      ({commentsCount})
    </span>
  </Link>
          <small className="text-muted">Uploaded: 2 hours ago</small>
        </div>
      
      </Card.Body>
    </Card>
  );
}
