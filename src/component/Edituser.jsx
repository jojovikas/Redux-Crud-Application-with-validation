import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../app/user/userSlice";

const Edituser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(id, "id from llll");
  const users = useSelector((state) => state.user);
  // console.log(users.user, "User data");
  // const existingUser = users.user.filter((f) => f.id == id);
  const existingUser = users.user.filter((f) => String(f.id) === String(id));
  console.log(existingUser[0]);
  //   console.log(existingUser);
  const { username, email, address, phone } = existingUser[0];
  const [uname, setName] = useState(username);
  const [uemail, setEmail] = useState(email);
  const [uphone, setPhone] = useState(phone);
  const [uaddress, setAddress] = useState(address);
  //   const [user, setUser] = useState(existingUser);
  // console.log(user, "this is our user");

  // Handling Error Facing when we are Validate our Form
  const [errors, setErrors] = useState({
    uname: "",
    uemail: "",
    uphone: "",
    uaddress: "",
  });

  // ************Start Form Validation Logic here*********************
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate username
    // if (!uname) {
    //   newErrors.uname = "Email is Required";
    //   isValid = false;
    //   // console.log(newErrors.username);
    // }
    if (!uname.trim() || !uname) {
      newErrors.uname = "Username is required";
      isValid = false;
    }
    if (uname.length > 20) {
      newErrors.uname = "Username is to long";
      isValid = false;
    }
    if (uname.length > 0 && uname.length < 4) {
      newErrors.uname = "Username is to small";
      isValid = false;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(uemail)) {
      newErrors.uemail = "Invalid email format";
      isValid = false;
    }
    if (uemail == "") {
      newErrors.uemail = "Email is Required";
    }

    // Validate phone number (must be 10 digits)
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(uphone)) {
      newErrors.uphone = "Phone number must be 10 digits";
      isValid = false;
    }
    if (!uphone) {
      newErrors.uphone = "Phone No. is Required";
    }

    // Validate address
    if (!uaddress.trim()) {
      newErrors.uaddress = "Address is required";
      isValid = false;
    }
    if (uaddress.length > 0 && uaddress.length < 7) {
      newErrors.uaddress = "Username is to small";
      isValid = false;
    }

    console.log(newErrors);
    setErrors(newErrors);
    return isValid;
  };

  // ***************** Handling here Handle Submit Event****************************
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(uname, uemail, uphone, uaddress, "Data update");

    const updatedData = {
      id: parseInt(id),
      username: uname,
      email: uemail,
      phone: uphone,
      address: uaddress,
    };

    if (validateForm()) {
      navigate("/userlist");
      // Dispatch the updateUser action with id and updatedData
      dispatch(updateUser({ id, updatedData }))
        .unwrap()
        .then(() => {
          navigate("/userlist"); // Redirect to user list or another page after update
        })
        .catch((error) => {
          console.error("Failed to update user:", error);
        });
    }
  };

  return (
    <>
      <div className="container text-center">
        <div className="row">
          <div className="col-md-12">
            <h3 className="mt-3">Edit User</h3>

            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <label className="col-sm-3 col-form-lable"> UserName </label>
                <div className="col-md-8">
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    placeholder="Enter Your Name"
                    value={uname}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.uname && (
                    <span
                      className="text-danger"
                      style={{ fontSize: "18px", float: "left" }}
                    >
                      {errors.uname}
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
                    value={uemail}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.uemail && (
                    <span
                      className="text-danger"
                      style={{ fontSize: "18px", float: "left" }}
                    >
                      {errors.uemail}
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
                    value={uphone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {errors.uphone && (
                    <span
                      className="text-danger"
                      style={{ fontSize: "18px", float: "left" }}
                    >
                      {errors.uphone}
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
                    value={uaddress}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  {errors.uaddress && (
                    <span
                      className="text-danger"
                      style={{ fontSize: "18px", float: "left" }}
                    >
                      {errors.uaddress}
                    </span>
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-sm-3 col-form-lable"> </label>
                <div className="col-md-1">
                  <button type="submit" className="btn btn-info btn-lg">
                    Update
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

export default Edituser;
