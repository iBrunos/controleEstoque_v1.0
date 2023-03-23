import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const newItem = { user, password };
    const response = await axios.post('http://localhost:3000/login', newItem)
 

    const data = response.data
    console.log(data)

    if (data.message == "Login realizado com sucesso") {
      navigate('/FormUser'); // substitua '/nextpage' pelo caminho do formulário desejado
    } else {
      setPassword('');
      setUser('');
      alert(data.message)
    }
  }


  return (
    <>
      <section className="bg-gray-50 ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="www.google.com" className="flex items-center mb-6 text-4xl font-bold text-gray-900 ">
            HAPPY MAKEUP
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Entre em sua conta
              </h1>
              <div className='flex flex-col'>
                <form onSubmit={login} className="space-y-4 md:space-y-6">
                  <input type="text" value={user} placeholder='user' onChange={e => setUser(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" id='input__product' />
                  <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" type="password" value={password} placeholder='password' onChange={e => setPassword(e.target.value)} />
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:bg-pink-400 focus:ring-3 focus:ring-primary-300 accent-pink-500" required=""></input>
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="remember" className="text-gray-500">Lembre-se de mim</label>
                      </div>
                    </div>
                    <a href="www.google.com" className="text-sm font-medium text-primary-600 hover:underline">Esqueceu a senha?</a>
                  </div>
                  <button type="submit" className="transition duration-200 bg-pink-500 hover:bg-pink-600 focus:bg-pink-700 focus:shadow-sm focus:ring-4 focus:ring-pink-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">Login</button>
                  <p className="text-sm font-light text-gray-500">
                          Não possui uma conta? <a href="www.google.com" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Cadastre-se</a>
                      </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>


  );

}



