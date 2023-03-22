import FormProduct from './components/formProducts/FormProducts';
import FormUser from './components/formUsers/FormUsers';
import Login from './components/login/Login';
import Home from './components/home/Home';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
function App() {
  return (
    <div>
      <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/Home">Home</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Login />}>
          </Route>
          <Route path="/login"  element={<Home />}>
          </Route>
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;