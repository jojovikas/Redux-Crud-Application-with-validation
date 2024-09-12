import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../app/user/userSlice";

const Adduser = () => {
  const [file, setFile] = useState("hello"); // State for file input

  const [inputValue, setInputValue] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    userimg: "",
  });

  // Handling Error Facing when we are Validate our Form
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSuccess } = useSelector((state) => state.user);

  // const handleInput = (e) => {
  //   const { name, value } = e.target;

  //   if (name === "userimg") {
  //     const selectedFile = e.target.files[0];
  //     setInputValue({
  //       ...inputValue,
  //       userimg: "./src/assets/" + selectedFile.name,
  //     });
  //     console.log("./src/assets/" + selectedFile.name); // Log the file path
  //   } else {
  //     setInputValue({ ...inputValue, [name]: value });
  //   }
  // };

  const handleInput = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  // Start Form Validation Logic here
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate username
    if (!inputValue.username) {
      newErrors.username = "Username is required";
      isValid = false;
    }
    if (!inputValue.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    }
    if (inputValue.username.length > 20) {
      newErrors.username = "Username is to long";
      isValid = false;
    }
    if (inputValue.username.length > 0 && inputValue.username.length < 4) {
      newErrors.username = "Username is to small";
      isValid = false;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(inputValue.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }
    if (inputValue.email == "") {
      newErrors.email = "Email is Required";
    }

    // Validate phone number (must be 10 digits)
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(inputValue.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
      isValid = false;
    }
    if (!inputValue.phone) {
      newErrors.phone = "Phone No. is Required";
    }

    // Validate address
    if (!inputValue.address.trim()) {
      newErrors.address = "Address is required";
      isValid = false;
    }

    console.log(newErrors);
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
    if (e.target.name === "userimg") {
      const selectedFile = e.target.files[0];
      console.log("./src/assets/" + selectedFile.name);
      // "./src/assets/" + selectedFile.name;
    }
  };

  return (
    <>
      <div className="container text-center">
        <div className="row">
          <div className="col-md-12">
            <h3 className="mt-3">Add New User</h3>

            <form name="myForm" onSubmit={handleSubmit}>
              <div className="row mb-3">
                <label className="col-sm-3 col-form-lable"> UserName </label>
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
                    <span
                      className="text-danger"
                      style={{ fontSize: "18px", float: "left" }}
                    >
                      {errors.username}
                    </span>
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-sm-3 col-form-lable"> Email </label>
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
                    <span
                      className="text-danger"
                      style={{ fontSize: "18px", float: "left" }}
                    >
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-sm-3 col-form-lable"> Phone </label>
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
                    <span
                      className="text-danger"
                      style={{ fontSize: "18px", float: "left" }}
                    >
                      {errors.phone}
                    </span>
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-sm-3 col-form-lable"> Address </label>
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
                    <span
                      className="text-danger"
                      style={{ fontSize: "18px", float: "left" }}
                    >
                      {errors.address}
                    </span>
                  )}
                </div>
              </div>

              {/* Upload Image */}
              <div className="row mb-3">
                <label className="col-sm-3 col-form-lable"> User Image </label>
                <div className="col-md-8">
                  <input
                    type="file"
                    className="form-control"
                    name="userimg"
                    placeholder="Enter Address"
                    onChange={handleInput}
                  />
                  {errors.address && (
                    <span
                      className="text-danger"
                      style={{ fontSize: "18px", float: "left" }}
                    >
                      {errors.address}
                    </span>
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-sm-3 col-form-lable"> </label>
                <div className="col-md-1">
                  <button type="submit" className="btn btn-info btn-lg">
                    {" "}
                    Submit{" "}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Adduser;
