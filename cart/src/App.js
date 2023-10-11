import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Navbar from "./component/Navigation/Navbar";
import Cart from "./pages/Cart";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" Component={Main} exact={true}/>
        <Route path="/cart" Component={Cart} />
      </Routes>
    </>
  );
}

export default App;
