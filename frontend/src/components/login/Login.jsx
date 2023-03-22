import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Login() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();
    
    async function login() {
        try {
          const response = await axios.post('http://localhost:3000/login', {
            user,
            password
          });
          const data = response.data;
          if (data.success) {
            history.push('/Home'); // substitua '/nextpage' pelo caminho do formulário desejado
          } else {
            alert(data.message);
          }
        } catch (error) {
          console.error(error);
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
              <form className="space-y-4 md:space-y-6" action="POST">
                  <div>
                      
                      <input type="text" name="user" id="user" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Usuário" required=""></input>
                  </div>
                  <div>
                      
                      <input type="password" name="password" id="password" placeholder="Senha" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required=""></input>
                  </div>
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
                  <button type="submit" onClick={() => login()} className="transition duration-200 bg-pink-500 hover:bg-pink-600 focus:bg-pink-700 focus:shadow-sm focus:ring-4 focus:ring-pink-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                      <span className="inline-block mr-2">Entrar</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                  </button>
                  <p className="text-sm font-light text-gray-500">
                      Não possui uma conta? <a href="www.google.com" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Cadastre-se</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    </>
    
    );
    
  }



