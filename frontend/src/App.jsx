import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuth from "./pages/userAuthForm.page";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route path="signin" element={<UserAuth type="sign-in" />} />
        <Route path="signup" element={<UserAuth type="sign-up" />} />
      </Route>
    </Routes>
  );
};

export default App;
