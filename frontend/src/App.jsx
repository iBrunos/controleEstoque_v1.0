import FormProduct from './components/formProducts/FormProducts';
import FormUser from './components/formUsers/FormUsers2';
import Login from './components/login/Login';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}>
          </Route>
          <Route path="/Produtos"  element={<FormProduct />}>
          </Route>
          <Route path="/Usuários"  element={<FormUser />}>
          </Route>
        </Routes>
    </Router>
    </div>
  );
}

export default App;