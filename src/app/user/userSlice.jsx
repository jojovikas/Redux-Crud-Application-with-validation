import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Calling our API DATA

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  return axios.get("http://localhost:3030/users").then((res) => res.data);
});

// *************************Add new User**************************
// export const addUser = createAsyncThunk("user/addUser", async (values) => {
//   return fetch("http://localhost:3030/users", {
//     method: "POST",
//     headers: { Accept: "application/json", "Content-Type": "application/json" },
//     body: JSON.stringify({
//       username: values.username,
//       email: values.email,
//       phone: values.phone,
//       address: values.address,
//     }),
//   }).then((res) => res.json());
// });

export const addUser = createAsyncThunk("user/addUser", async (values) => {
  const response = await axios.post("http://localhost:3030/users", {
    username: values.username,
    email: values.email,
    phone: values.phone,
    address: values.address,
  });
  return response.data; // Return the newly added user data
});

// ************************************************************************
// Update our User
// export const updateUser = createAsyncThunk(
//   "user/updateUser",
//   async ({ id, updatedData }) => {
//     const response = await fetch(`http://localhost:3000/users/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(updatedData),
//     });
//     const data = await response.json();
//     return data; // The updated user is returned here
//   }
// );

// ************ ***  UPDATE USER ***************

// export const updateUser = createAsyncThunk(
//   "user/updateUser",
//   async ({ id, updatedData }) => {
//     const response = await fetch(`http://localhost:3030/users/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(updatedData),
//     });
//     const data = await response.json();
//     console.log(data); // Log response to check the data
//     return data;
//   }
// );

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, updatedData }) => {
    const response = await axios.put(
      `http://localhost:3030/users/${id}`,
      updatedData
    );
    return response.data; // Return the updated user data
  }
);

// ************************************************************************

// Delete user
// export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
//   const response = await fetch(`http://localhost:3030/users/${id}`, {
//     method: "DELETE",
//   });
//   return id; // Return the ID to remove it from the state
// });

export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
  await axios.delete(`http://localhost:3030/users/${id}`);
  return id; // Return the ID to remove it from the state
});

// This is our Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: [],
    error: "",
    isSuccess: false,
  },
  // Call here Extra Reducer
  extraReducers: (builder) => {
    // Pending State Rreducer

    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });

    // Fulfilled State Rreducer
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = "";
      state.isSuccess = false;
    });

    // Rejected State Rreducer

    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.user = [];
      state.error = action.error.message;
    });

    //add user
    builder.addCase(addUser.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user.push(action.payload);
      state.isSuccess = true;
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.loading = false;
      state.user = [];
      state.error = action.error.message;
    });

    // update User******************************************************
    // builder
    //   .addCase(updateUser.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(updateUser.fulfilled, (state, action) => {
    //     state.loading = false;
    //     // Update the user in the state
    //     state.user = state.user.map((user) =>
    //       user.id === action.payload.id ? action.payload : user
    //     );
    //   })
    //   .addCase(updateUser.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.error.message;
    //   });

    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = state.user.map((user) =>
          user.id === action.payload.id ? action.payload : user
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Handle delete user
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = state.user.filter((user) => user.id !== action.payload); // Remove user from state
      state.error = "";
    });
  },
});

export default userSlice.reducer;
