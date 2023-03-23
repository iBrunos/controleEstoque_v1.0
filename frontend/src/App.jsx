import FormProduct from './components/formProducts/FormProducts';
import FormUser from './components/formUsers/FormUsers';
import Login from './components/login/Login';
import Home from './components/home/Home';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}>
          </Route>
          <Route path="/login"  element={<Home />}>
          </Route>
        </Routes>
    </Router>
    </div>
  );
}

export default App;