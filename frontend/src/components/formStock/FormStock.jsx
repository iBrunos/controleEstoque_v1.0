import React, { useState, useEffect } from "react";
import axios from "axios";
import unidecode from "unidecode";
import Header from "../header/Header";

export default function FormProducts() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    fetchItems();
  }, []);
  
  const fetchItems = async () => {
    const token = localStorage.getItem('token');
    // definir o cabeçalho `Authorization` com o token JWT
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    // fazer uma solicitação HTTP GET para a rota protegida com o token JWT
    try {
      const response = await axios.get('http://localhost:3000/entry', config);
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Header />
      <h3 className="text-gray-800 text-4xl font-bold text-center ">ESTOQUE</h3>
      <section className="flex items-center space-x-2 border rounded-md p-2 ml-36 w-64">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 flex-none text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            className="outline-none appearance-none placeholder-gray-500 text-gray-500 w-64 "
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Pesquisar"
            id="input__pesquisar"
          />
        </section>
      <div className="bg-white mx-auto px-4 md:px-8">
        <div className="mt-1 shadow-sm border rounded-lg overflow-x-auto max-h-[44rem]">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">Produto</th>
                <th className="py-3 px-6">Quantidade</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {items
                .filter((item) => {
                  const searchTermUnidecoded = unidecode(
                    searchTerm?.toLowerCase() || ""
                  );
                  const itemUserUnidecoded = unidecode(
                    item.product?.toLowerCase() || ""
                  ); // aqui foi adicionado o teste para item.product ser nulo ou indefinido
                  if (searchTermUnidecoded === "") {
                    return item;
                  } else if (
                    itemUserUnidecoded.includes(searchTermUnidecoded)
                  ) {
                    return item;
                  }
                  return null;
                })
                .map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.product}
                    </td>
                    <td className="px-6 py-4 whitespace-normal break-words w-[50rem]">
                      {item.amount}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
