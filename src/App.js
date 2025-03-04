import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ManagePermissionPage from "./Components/ManagePermissionPage";

function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<ManagePermissionPage/>}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
