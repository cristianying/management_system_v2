import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import StarRating from "../Components/StarRating";
import Reviews from "../Components/Reviews";
import { RestaurantsContext } from "../context/RestaurantsContext";
import AddReview from "../Components/AddReview";
import NavBar from "../Components/NavBar";

const RestaurantdetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await RestaurantFinder.get(`/api/v1/restaurants/${id}`);
      console.log(response.data.data.restaurant.name, "testing");
      setSelectedRestaurant(response.data.data);
    };

    fetchData();
  }, [id, setSelectedRestaurant]);

  return (
    <div>
      <NavBar />

      <div className="main">
        {selectedRestaurant && (
          <>
            <h1 className="text-center display=1">
              {selectedRestaurant.restaurant.name}
            </h1>
            <div className="text-center">
              <StarRating
                rating={selectedRestaurant.restaurant.average_rating}
              />
              <span className="text-warning ml-1">
                {selectedRestaurant.restaurant.count
                  ? `(${selectedRestaurant.restaurant.count})`
                  : "(0)"}
              </span>
            </div>
            <div className="mt-3">
              <Reviews reviews={selectedRestaurant.reviews} />
            </div>
            <AddReview />
          </>
        )}
      </div>
    </div>
  );
};

export default RestaurantdetailPage;
