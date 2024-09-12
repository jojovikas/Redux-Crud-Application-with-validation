import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchUsers } from "../app/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../app/user/userSlice";

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id)); // Dispatch the deleteUser action
    }
  };

  return (
    <>
      <div className="container text-center">
        <div className="row">
          <div className="col-md-12">
            <h3 className="mt-3">User List</h3>
            {users.loading && (
              <div className="spiner-border text-primary">loading...</div>
            )}
            {/* <div className="float-right"> */}
            <Link
              to="/adduser"
              className=" btn btn-primary btn-lg mb-3"
              style={{ float: "left" }}
            >
              Add User
            </Link>
            {/* </div> */}
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>UserName</th>
                  <th>Email</th>
                  <th>Phon No</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.user.map((getUser, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{getUser.username}</td>
                      <td>{getUser.email}</td>
                      <td>{getUser.phone}</td>
                      <td>{getUser.address}</td>
                      <td>
                        <Link
                          to={`/edituser/${getUser.id}`}
                          className="btn btn-primary "
                        >
                          Edit
                        </Link>
                        <button
                          className="btn btn-danger ms-2"
                          onClick={() => handleDelete(getUser.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;
