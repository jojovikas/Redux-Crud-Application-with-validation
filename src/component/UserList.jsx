import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchUsers } from "../app/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../app/user/userSlice";
import datanotfound from "../assets/nodata.png";

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);

  // State to handle search queries
  const [searchName, setSearchName] = useState("");
  const [searchPhone, setSearchPhone] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id)); // Dispatch the deleteUser action
    }
  };

  // Filter users based on phone number and username search queries
  const filteredUsers = users.user.filter(
    (user) =>
      user.phone.includes(searchPhone) && user.username.includes(searchName)
  );

  return (
    <>
      <div className="container text-center">
        <div className="row">
          <h3 className="mt-3">User List</h3>
          <div className=" row my-4 search mb-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Search by username"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                className="form-control mb-2"
                placeholder="Search by phone number"
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-12">
            {users.loading && (
              <div className="spinner-border text-primary">loading...</div>
            )}

            <Link
              to="/adduser"
              className="btn btn-primary btn-lg mb-3"
              style={{ float: "left" }}
            >
              Add User
            </Link>

            {/* Search Input Fields */}

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>UserName</th>
                  <th>Email</th>
                  <th>Phone No</th>
                  <th>Address</th>
                  <th>User Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((getUser, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{getUser.username}</td>
                      <td>{getUser.email}</td>
                      <td>{getUser.phone}</td>
                      <td>{getUser.address}</td>
                      <td style={{ width: "20%" }}>
                        {" "}
                        <img
                          src={getUser.imageUrl}
                          alt=""
                          style={{ width: "20%" }}
                        />{" "}
                      </td>
                      <td>
                        <Link
                          to={`/edituser/${getUser.id}`}
                          className="btn btn-primary"
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
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">
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
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;

// *******************************************

// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { fetchUsers } from "../app/user/userSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteUser } from "../app/user/userSlice";

// const UserList = () => {
//   const dispatch = useDispatch();
//   const users = useSelector((state) => {
//     return state.user;
//   });

//   useEffect(() => {
//     dispatch(fetchUsers());
//   }, []);

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       dispatch(deleteUser(id)); // Dispatch the deleteUser action
//     }
//   };

//   return (
//     <>
//       <div className="container text-center">
//         <div className="row">
//           <div className="col-md-12">
//             <h3 className="mt-3">User List</h3>
//             {users.loading && (
//               <div className="spiner-border text-primary">loading...</div>
//             )}
//             {/* <div className="float-right"> */}
//             <Link
//               to="/adduser"
//               className=" btn btn-primary btn-lg mb-3"
//               style={{ float: "left" }}
//             >
//               Add User
//             </Link>
//             {/* </div> */}
//             <table class="table table-bordered">
//               <thead>
//                 <tr>
//                   <th>Sr.No</th>
//                   <th>UserName</th>
//                   <th>Email</th>
//                   <th>Phon No</th>
//                   <th>Address</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.user.map((getUser, index) => {
//                   return (
//                     <tr key={index}>
//                       <td>{index + 1}</td>
//                       <td>{getUser.username}</td>
//                       <td>{getUser.email}</td>
//                       <td>{getUser.phone}</td>
//                       <td>{getUser.address}</td>
//                       <td>
//                         <Link
//                           to={`/edituser/${getUser.id}`}
//                           className="btn btn-primary "
//                         >
//                           Edit
//                         </Link>
//                         <button
//                           className="btn btn-danger ms-2"
//                           onClick={() => handleDelete(getUser.id)}
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default UserList;
