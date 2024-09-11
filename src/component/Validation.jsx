import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../app/user/userSlice";

const Adduser = () => {
  const [inputValue, setInputValue] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSuccess } = useSelector((state) => state.user);

  const handleInput = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate username
    if (!inputValue.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(inputValue.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    // Validate phone number (must be 10 digits)
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(inputValue.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
      isValid = false;
    }

    // Validate address
    if (!inputValue.address.trim()) {
      newErrors.address = "Address is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(addUser(inputValue))
        .unwrap()
        .then(() => {
          alert("Data sent successfully");
          navigate("/userlist");
        })
        .catch((error) => {
          console.error("Failed to add user:", error);
        });
    }
  };

  return (
    <div className="container text-center">
      <div className="row">
        <div className="col-md-12">
          <h3 className="mt-3">Add New User</h3>

          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">UserName</label>
              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder="Enter Your Name"
                  value={inputValue.username}
                  onChange={handleInput}
                />
                {errors.username && (
                  <span className="text-danger">{errors.username}</span>
                )}
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">Email</label>
              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  placeholder="Enter Email"
                  value={inputValue.email}
                  onChange={handleInput}
                />
                {errors.email && (
                  <span className="text-danger">{errors.email}</span>
                )}
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">Phone</label>
              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  placeholder="Enter Phone No."
                  value={inputValue.phone}
                  onChange={handleInput}
                />
                {errors.phone && (
                  <span className="text-danger">{errors.phone}</span>
                )}
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">Address</label>
              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  placeholder="Enter Address"
                  value={inputValue.address}
                  onChange={handleInput}
                />
                {errors.address && (
                  <span className="text-danger">{errors.address}</span>
                )}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-1">
                <button type="submit" className="btn btn-info btn-lg">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Adduser;
