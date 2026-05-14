import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Blog from "./Pages/Blog";
import BlogBack from "./Pages/BlogBack";
import Todo from "./Pages/Todo";
import TodoBack from "./Pages/TodoBack";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/dashboard/blogBack" element={<BlogBack />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/dashboard/todoBack" element={<TodoBack />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
