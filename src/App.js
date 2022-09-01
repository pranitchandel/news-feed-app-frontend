import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import store from "./store";

import Feed from "./Components/Feed/Feed";
import Loading from "./Components/Loading/Loading";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register2";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Feed />}></Route>
            <Route path="/loading" element={<Loading />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
