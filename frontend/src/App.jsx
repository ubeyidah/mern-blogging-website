import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuth from "./pages/userAuthForm.page";
import { Toaster } from "react-hot-toast";
import AuthLayout from "./components/layout/AuthLayout";
import ProtectedLayout from "./components/layout/ProtectedLayout";
import Home from "./pages/home.page";
import Editor from "./pages/editor.pages";

const App = () => {
  return (
    <>
      <Toaster position="bottom-center" />
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route element={<AuthLayout />}>
            <Route path="signin" element={<UserAuth type="sign-in" />} />
            <Route path="signup" element={<UserAuth type="sign-up" />} />
          </Route>
          <Route element={<ProtectedLayout />}></Route>
        </Route>
        <Route element={<ProtectedLayout />}>
          <Route path="/editor" element={<Editor />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
