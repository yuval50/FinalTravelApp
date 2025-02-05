import PostCard from "../models/PostCard";

const Trips = () => {
 // const [trips, setTrips] = useState<any[]>([]);


  return (
    <div className="trips-container">
      <h1  style={{textAlign:"center" }}>Explore Trips</h1>
      <div className="trips-list">
       <PostCard></PostCard>
      </div>
    </div>
  );
};

export default Trips;
