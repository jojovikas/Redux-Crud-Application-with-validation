import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container text-center">
      <div className="row">
        <div className="col-md-12">
          <h3 className="mt-3">Welcome to Home</h3>
          <Link to={"/userlist"} className="btn btn-primary my-4">
            Go to User Detail Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
