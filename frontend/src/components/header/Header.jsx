import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StoreIcon from "@mui/icons-material/Store";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

function getCurrentUserId() {
    const userId = localStorage.getItem('userId');
    console.log(userId);
    return userId ? parseInt(userId, 10) : null; // retorna null se o ID do usuário não foi armazenado no localStorage
  }

const user = localStorage.getItem("user");
const email = localStorage.getItem("email");
// Profile Dropdown
const ProfileDropDown = () => {
    const navigate = useNavigate();
    const [isGerente, setIsGerente] = useState(false);
    const [state, setState] = useState(false);
    const profileRef = useRef(null);
  
    useEffect(() => {
      const handleDropDown = (e) => {
        if (profileRef.current && !profileRef.current.contains(e.target)) {
          setState(false);
        }
      };
      document.addEventListener("click", handleDropDown);
      return () => {
        document.removeEventListener("click", handleDropDown);
      };
    }, []);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const token = localStorage.getItem('token');
          const config = {
            headers: { Authorization: `Bearer ${token}` }
          };
          const response = await axios.get('http://localhost:3000/user', config);
          const users = response.data;
          const currentUser = users.find((user) => user.id === getCurrentUserId());
          // Assuming that getCurrentUserId() is defined somewhere and returns the ID of the currently logged in user
          setIsGerente(currentUser.level === "Gerente");
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, []);
  
    const navigateToLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
      navigate("/");
    };
  
    const navigateToRelatorios = () => {
      navigate("/user/relatorios");
    };
  
    const navigateToUsuarios = () => {
      navigate("/user/usuarios");
    };

  return (
    <div className="">
      <div className="flex items-center space-x-4 ml-1">
        <button
          ref={profileRef}
          className="w-10 h-10 outline-none rounded-full ring-offset-2 ring-gray-200 ring-4 lg:focus:ring-green-400 z-40"
          onClick={() => setState(!state)}
        >
          <img
            src="https://cdn.onlinewebfonts.com/svg/img_569204.png"
            className="w-full h-full rounded-full"
            alt="#"
          />
        </button>
        <div className="">
          <span className="block font-semibold text-white m-0">{user}</span>
          <span className="block text-sm text-white">{email}</span>
        </div>
      </div>
      <ul
        className={`bg-white lg:absolute right-44 lg:border lg:rounded-md lg:text-sm lg:w-52 lg:shadow-md mt-0 z-30 ${
          state ? "" : "lg:hidden"
        }`}
      >
        <li>
          {isGerente ? (
            <button
              className="block text-gray-600  lg:p-2.5 hover:text-gray-900"
              onClick={navigateToUsuarios}
            >
              <AccountCircleIcon className="mr-3" />
              Usuários
            </button>
          ) : (
            <button
              className="block text-gray-600  lg:p-2.5 opacity-75 cursor-not-allowed"
            >
              <AccountCircleIcon className="mr-3" />
              Usuários
            </button>
          )}

          <button
            className="block text-gray-600  lg:p-2.5 hover:text-gray-900"
            onClick={navigateToRelatorios}
          >
            <StickyNote2Icon className="mr-3" />
            Relatórios
          </button>
          <button
            className="block text-gray-600  lg:p-2.5 hover:text-gray-900"
            onClick={navigateToLogout}
          >
            <LogoutIcon className="mr-3" />
            Sair
          </button>
        </li>
      </ul>
    </div>
  );
};

export default function Header() {
  
  const [menuState, setMenuState] = useState(false);
  const navigate = useNavigate();
  const navigateToEstoque = () => navigate("/user/estoque");
  const navigateToProdutos = () => navigate("/user/cadastro");
  const navigateToEntradas = () => navigate("/user/entradas");
  const navigateToSaidas = () => navigate("/user/saidas");
 
  return (
    <>
      <nav className="bg-pink-500 border-b">
        <div className="flex items-center space-x-8 py-3 px-4 max-w-screen-2xl mx-auto md:px-8">
          <div className="flex-none lg:flex-initial">
            <h1 className="text-4xl font-bold text-white">
              HAPPY MAKEUP
            </h1>
          </div>
          <div className="flex-1 flex items-center justify-between">
            <div
              className={`bg-pink-500 absolute w-full top-16 left-0 p-4 border-b lg:static lg:block lg:border-none z-10 ${
                menuState ? "" : "hidden"
              }`}
            >
              <ul className="mt-12 space-y-5 lg:flex lg:space-x-6 lg:space-y-0 lg:mt-0">
                <li className="text-white ">
                  <button
                    className="mr-6 hover:font-bold font-semibold "
                    onClick={navigateToEstoque}
                  >
                    <StoreIcon className="mr-1 font-bold" />
                    ESTOQUE
                  </button>
                  <button
                    className="mr-6 hover:font-bold font-semibold"
                    onClick={navigateToProdutos}
                  >
                    <AppRegistrationIcon className="hover:font-bold font-semibold" />
                    CADASTRO
                  </button>
                  <button
                    className="mr-6 hover:font-bold font-semibold"
                    onClick={navigateToEntradas}
                  >
                    <AddShoppingCartIcon className="mr-1 font-bold" />
                    ENTRADAS
                  </button>
                  <button
                    className="mr-6 hover:font-bold font-semibold"
                    onClick={navigateToSaidas}
                  >
                    <RemoveShoppingCartIcon className="mr-1 font-bold" />
                    SAÍDAS
                  </button>
                </li>
              </ul>
            </div>
            <div className="flex-1 flex items-center justify-end space-x-2 sm:space-x-6">
              <ProfileDropDown class="lg:block" />
              <button
                className="outline-none text-gray-400 block lg:hidden"
                onClick={() => setMenuState(!menuState)}
              >
                {menuState ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
