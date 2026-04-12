import { RouterProvider } from "react-router-dom";
import { router } from "./router/Index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App =() => {
  return(
    <div>
      <RouterProvider router = {router} />
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  )
}

export default App;