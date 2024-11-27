import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import CommonLayout from "./components/common-layout";
import NotFound from "./pages/notfound";
import SignUp from "./pages/auth/signup";
import SignIn from "./pages/auth/signin";
import ContactPage from "./pages/home/contact";

function App() {                             //   ### Added Base Code
  function Logout() {                       //   ### Added Base Code
    localStorage.clear();                   //   ### Added Base Code
    return <Navigate to="/signin" />;      //   ### Added Base Code
  }                                       //   ### Added Base Code
  function GoToRegister() {              //   ### Added Base Code
    localStorage.clear();                 //   ### Added Base Code
    return <SignUp />;                      //   ### Added Base Code
  }                                       //   ### Added Base Code
  return (                                  //   ### Added Base Code
    <Routes>                                                          //   ### Added Base Code
      <Route path="/signup" element={<GoToRegister />} />            //   ### Added Base Code
      <Route path="/signin" element={<SignIn />} />                  //   ### Added Base Code
      <Route path="/logout" element={<Logout />} />                  //   ### Added Base Code
      <Route path="/" element={<CommonLayout />}>                    //   ### Added Base Code
        <Route path="" element={<HomePage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>                                                       //   ### Added Base Code
      <Route path="*" element={<NotFound />} />                      //   ### Added Base Code
    </Routes>                                                       //   ### Added Base Code
  );                                                                 //   ### Added Base Code
}                                                                      //   ### Added Base Code

export default App;                                                   //   ### Added Base Code
