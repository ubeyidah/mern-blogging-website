import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuth from "./pages/userAuthForm.page";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster position="bottom-center" />
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="signin" element={<UserAuth type="sign-in" />} />
          <Route path="signup" element={<UserAuth type="sign-up" />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
