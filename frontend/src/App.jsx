import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuth from "./pages/userAuthForm.page";
import { Toaster } from "react-hot-toast";
import AuthLayout from "./components/layout/AuthLayout";
import ProtectedLayout from "./components/layout/ProtectedLayout";
import Home from "./pages/home.page";

const App = () => {
  return (
    <>
      <Toaster position="bottom-center" />
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route element={<AuthLayout />}>
            <Route path="signin" element={<UserAuth type="sign-in" />} />
            <Route path="signup" element={<UserAuth type="sign-up" />} />
          </Route>
          <Route element={<ProtectedLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
