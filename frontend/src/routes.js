import React from "react";
import FormProduct from './components/formProducts/FormProducts';
import FormUser from './components/formUsers/FormUsers';
import FormExit from './components/formExits/FormExits';
import FormEntry from './components/formEntrys/FormEntrys';
import FormReports from './components/formReports/FormReports';
import FormStock from './components/formStock/FormStock';
import Login from './components/login/Login';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
const Rotas = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/user" element={<PrivateRoute />}>
        <Route path="/user/estoque" element={<FormStock/>}/>
        <Route path="/user/cadastro" element={<FormProduct/>} />
        <Route path="/user/usuarios" element={<FormUser/>} />
        <Route path="/user/entradas" element={<FormEntry/>} />
        <Route path="/user/saidas" element={<FormExit/>} />
        <Route path="/user/relatorios" element={<FormReports/>} />
      </Route>
    </Routes>
  </Router>
);




export default Rotas;