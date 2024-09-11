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
  //   console.log(uname);
  const [uemail, setEmail] = useState(email);
  const [uphone, setPhone] = useState(phone);
  const [uaddress, setAddress] = useState(address);
  //   const [user, setUser] = useState(existingUser);
  // console.log(user, "this is our user");

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
