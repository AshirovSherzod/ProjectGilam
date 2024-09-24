import { Route, Routes } from "react-router-dom";
import Admin from "./pages/admin";
import SignIn from "./pages/sign-in/SignIn";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
