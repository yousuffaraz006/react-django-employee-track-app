import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import CommonLayout from "./components/common-layout";
import NotFound from "./pages/notfound";
import SignUp from "./pages/auth/signup";
import SignIn from "./pages/auth/signin";
import AboutPage from "./pages/home/about";
import ContactPage from "./pages/home/contact";

function App() {
  function Logout() {
    localStorage.clear();
    return <Navigate to="/signin" />;
  }
  function GoToRegister() {
    localStorage.clear();
    return <SignUp />;
  }
  return (
    <Routes>
      <Route path="/signup" element={<GoToRegister />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/" element={<CommonLayout />}>
        <Route path="" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
