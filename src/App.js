import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dash from "./components/Dash";
import SavedResponses from "./components/SavedResponses";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setResponses } from "./appSlice";
import { Toaster } from "react-hot-toast";
import Login from "./components/Login";
import AdminDash from "./components/AdminDash";
import PrivateRoute from "./components/PrivateRoute";
import axios from "axios";
import BACKEND_URL from "./constants";

function App() {
  const dispatch = useDispatch();
  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/get_responses?email=${email}`, {
          email,
        });
        const data = await response.json();
        // console.log(data);

        dispatch(setResponses(data));
      } catch (error) {
        console.error("Error fetching responses:", error);
      }
    };
    fetchResponses();
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* User Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute allowedRoles={["user"]}>
              <Layout>
                <Dash />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/saved_responses"
          element={
            <PrivateRoute allowedRoles={["user"]}>
              <Layout>
                <SavedResponses />
              </Layout>
            </PrivateRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Layout>
                <AdminDash />
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
