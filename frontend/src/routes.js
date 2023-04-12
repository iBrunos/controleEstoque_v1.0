import FormProduct from './components/formProducts/FormProducts';
import FormUser from './components/formUsers/FormUsers';
import FormExit from './components/formExits/FormExits';
import FormEntry from './components/formEntrys/FormEntrys';
import FormReports from './components/formReports/FormReports';
import FormStock from './components/formStock/FormStock';
import Login from './components/login/Login';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
const Rotas = () => (
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}>
          </Route>
          <Route path="/Produtos"  element={<FormProduct />}>
          </Route>
          <Route path="/Usuários"  element={<FormUser />}>
          </Route>
          <Route path="/Entradas"  element={<FormEntry />}>
          </Route>
          <Route path="/Saídas"  element={<FormExit />}>
          </Route>
          <Route path="/Relatórios"  element={<FormReports />}>
          </Route>
          <Route path="/Estoque"  element={<FormStock />}>
          </Route>
        </Routes>
    </Router>
)

export default Rotas;