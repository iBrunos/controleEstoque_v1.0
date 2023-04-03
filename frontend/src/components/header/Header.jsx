import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import StoreIcon from '@mui/icons-material/Store';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';



// Profile Dropdown
const ProfileDropDown = (props) => {
    const navigate = useNavigate();
    const navigateToLogout = () => navigate('/');
    const navigateToRelatorios = () => navigate('/Relatórios');
    const navigateToUsuarios = () => navigate('/Usuários');

    const [state, setState] = useState(false)
    const profileRef = useRef(null);

    useEffect(() => {
        const handleDropDown = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setState(false);
            }
        };
        document.addEventListener('click', handleDropDown);
        return () => {
            document.removeEventListener('click', handleDropDown);
        };
    }, []);

    return (
        <div className={`relative ${props.class}`}>
            <div className="flex items-center space-x-4">
                <button ref={profileRef} className="w-10 h-10 outline-none rounded-full ring-offset-2 ring-gray-200 ring-2 lg:focus:ring-pink-500 ml-1"
                    onClick={() => setState(!state)}
                >
                    <img
                        src="https://randomuser.me/api/portraits/men/46.jpg"
                        className="w-full h-full rounded-full"
                        alt="#"
                    />
                </button>
                <div className="">
                    <span className="block">Victor Manoel</span>
                    <span className="block text-sm text-gray-500">victormssalves@gmail.com</span>
                </div>
            </div>
            <ul className={`bg-white top-12 right-0 mt-5 space-y-5 lg:absolute lg:border lg:rounded-md lg:text-sm lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0 ${state ? '' : 'lg:hidden'}`}>
                <li>
                    <button className="block text-gray-600  lg:p-2.5 hover:text-gray-900" onClick={navigateToUsuarios}>
                        <AccountCircleIcon className="mr-3" />
                        Usuários
                    </button>
                    <button className="block text-gray-600  lg:p-2.5 hover:text-gray-900" onClick={navigateToRelatorios}>
                        <StickyNote2Icon className="mr-3" />
                        Relatórios
                    </button>
                    <button className="block text-gray-600 lg:p-2.5 hover:text-gray-900" href="#">
                        <SettingsIcon className="mr-3" />
                        Configurações
                    </button>
                    <button className="block text-gray-600  lg:p-2.5 hover:text-gray-900" onClick={navigateToLogout}>
                        <LogoutIcon className="mr-3" />
                        Sair
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default function Header() {


    const [menuState, setMenuState] = useState(false)
    const navigate = useNavigate();
    const navigateToEstoques = () => navigate('/Produtos');
    const navigateToEntradas = () => navigate('/Entradas');
    const navigateToSaidas = () => navigate('/Saídas');
    return (
    
        <nav className="bg-white border-b">
            <div className="flex items-center space-x-8 py-3 px-4 max-w-screen-2xl mx-auto md:px-8">
                <div className="flex-none lg:flex-initial">
                    <a href="Home" className='text-4xl font-bold text-gray-900'>
                        HAPPY MAKEUP
                    </a>
                </div>
                <div className="flex-1 flex items-center justify-between">
                    <div className={`bg-white absolute z-20 w-full top-16 left-0 p-4 border-b lg:static lg:block lg:border-none ${menuState ? '' : 'hidden'}`}>
                        <ul className="mt-12 space-y-5 lg:flex lg:space-x-6 lg:space-y-0 lg:mt-0">
                            <li className="text-gray-600 ">
                                <button className="mr-6 hover:text-gray-900" onClick={navigateToEstoques}>
                                    <StoreIcon className="mr-3" />
                                    Estoque
                                    
                                </button>
                                <button className="mr-6 hover:text-gray-900" onClick={navigateToEntradas}>
                                    <AddShoppingCartIcon className="mr-3" />
                                    Entradas
                                </button>
                                <button className="mr-6 hover:text-gray-900" onClick={navigateToSaidas}>
                                    <RemoveShoppingCartIcon className="mr-3" />
                                    Saidas
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="flex-1 flex items-center justify-end space-x-2 sm:space-x-6">
                        <ProfileDropDown
                            class="lg:block"
                        />
                        <button
                            className="outline-none text-gray-400 block lg:hidden"
                            onClick={() => setMenuState(!menuState)}
                        >
                            {
                                menuState ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                    </svg>
                                )
                            }
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}