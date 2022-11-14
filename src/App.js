import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthContextProvider } from "./context/AuthContext";
import Home from './pages/Home';
import LogIn from "./pages/LogIn";
import SignUp from './pages/SignUp';
import Account from "./pages/Account";
import WatchMovie from './pages/WatchMovie';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <div >
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LogIn/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/account' element={<ProtectedRoute><Account/></ProtectedRoute>} />
          <Route path='/watchMovie/:title/:id' element={<WatchMovie/>} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
