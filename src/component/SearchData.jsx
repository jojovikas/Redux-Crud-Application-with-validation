import React, { useEffect, useState } from "react";
import axios from "axios";
import datanotfound from "../assets/nodata.png";

const SearchData = () => {
  const [data, setData] = useState([]);
  const [records, setRecords] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3030/users")
      .then((res) => {
        setData(res.data);
        setRecords(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //   const Filter = (event) => {
  //     console.log(event.target.value);
  //     setRecords(
  //       data.filter((f) => f.username.toLowerCase().includes(event.target.value))
  //     );
  //   };

  const FilterName = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    console.log(searchTerm);
    setRecords(
      data.filter((f) => f.username.toLowerCase().includes(searchTerm))
    );
  };

  const FilterPhone = (event) => {
    // console.log("fiter");
    setRecords(data.filter((f) => f.phone.includes(event.target.value)));
  };

  return (
    <div className="container text-center">
      <div className="row">
        <div className="col-md-12">
          <h5 className="my-3 ">Search User Data </h5>
          <div className="row">
            <div className="col-md-6">
              {" "}
              <input
                type="text"
                className="form-control my-4"
                onChange={FilterName}
                placeholder="Serach by Username"
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                className="form-control my-4"
                onChange={FilterPhone}
                placeholder="Serach by Phone No."
              />
            </div>
          </div>

          {records.length > 0 ? (
            <table class="table table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>Sr.No</th>
                  <th>UserName</th>
                  <th>Email</th>
                  <th>Phon No</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {records.map((getUser, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{getUser.username}</td>
                      <td>{getUser.email}</td>
                      <td>{getUser.phone}</td>
                      <td>{getUser.address}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <>
              <h1
                style={{
                  color: "#333969",
                  fontSize: "3rem",
                  fontWeight: "700",
                }}
              >
                No Records Founds
              </h1>
              <img
                src={datanotfound}
                className="img img-fluid"
                alt=""
                style={{ width: "50%" }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchData;
