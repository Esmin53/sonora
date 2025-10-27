import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import { useState } from "react";
import Navbar from "./components/Navbar";


function App() {
  const [theme, setTheme] = useState("")

  const router = createBrowserRouter([
  { path: "/", element: <Home /> },
]);

  return (
    <div className={`${theme === "dark" ? "dark" : ""}`}>
      <Navbar setTheme={setTheme} theme={theme} />
      <RouterProvider router={router} />
    </div>

  )
}

export default App
