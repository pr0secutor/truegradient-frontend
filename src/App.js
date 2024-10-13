import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dash from "./components/Dash";
import SavedResponses from "./components/SavedResponses";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setResponses } from './appSlice';
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchResponses = async () => {
      
      try {
        const response = await fetch('http://localhost:5000/get_responses');
        const data = await response.json();

        dispatch(setResponses(data));
      } catch (error) {
        console.error("Error fetching responses:", error);
      }
    };
    fetchResponses();
  }, [dispatch]);

  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Dash />} />
          <Route path="/saved_responses" element={<SavedResponses />} />
        </Routes>
      </Layout>
      <Toaster />
    </div>
  );
}

export default App;
