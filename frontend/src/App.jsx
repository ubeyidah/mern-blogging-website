import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route path="signin" element={<>sign</>} />
        <Route path="signup" element={<>sign up</>} />
      </Route>
    </Routes>
  );
};

export default App;
