import React, { useState, useEffect } from "react";
import axios from "axios";
import unidecode from "unidecode";
import Header from "../header/Header";
import moment from "moment";

export default function FormReports() {
  const [itemsEntrys, setItemsEntrys] = useState([]);
  const [itemsExits, setItemsExits] = useState([]);
  const [itemsUsers, setItemsUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [tipo, setTipo] = useState("todos");

  const changePageTitle = (newTitle) => {
    document.title = newTitle;
  };
  changePageTitle("Happy Makeup | Estoque");


  useEffect(() => {
    fetchItems();
    setTipo("todos");
    setUser("todos");
  }, []);

  const fetchItems = async () => {
    const token = localStorage.getItem("token");
    // definir o cabeçalho `Authorization` com o token JWT
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    // fazer uma solicitação HTTP GET para a rota protegida com o token JWT
    try {
      const responseEntry = await axios.get("http://localhost:3000/entry", config);
      const responseExit = await axios.get("http://localhost:3000/exit", config);
      const responseUser = await axios.get("http://localhost:3000/user", config);
      setItemsEntrys(responseEntry.data);
      setItemsExits(responseExit.data);
      setItemsUsers(responseUser.data);
    } catch (error) {
      console.error(error);
    }
  };
  function formatDateHours(dateString) {
    const date = moment(dateString).format("DD/MM/YYYY [às] HH:mm");
    return date;
  }
  return (
    <>
      <Header />
      <form className="flex flex-row mb-0 mt-1 bg-white border-b-gray-200 border-b pl-8 pt-1 pb-2 ml-0">

        <section className="flex items-center space-x-2 border rounded-md p-2 ">
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
        <select className="ml-2 flex items-center space-x-2 border rounded-md p-2"
          onChange={(e) => setTipo(e.target.value)}
          value={tipo}
        >
          <option value="todos">Tipo</option>
          <option value="Entrada">Entrada</option>
          <option value="Saída">Saída</option>
        </select>

        <select className="ml-2 flex items-center space-x-2 border rounded-md p-2"
          onChange={(e) => setUser(e.target.value)}
          value={user}
        >
          <option value="todos">Funcionário</option>
          {itemsUsers.map((users) => (
            <option
              key={users.id}
              className="hover:text-pink-500 hover:bg-pink-50"
              value={users.user}
            >
              {users.user}
            </option>
          ))}
        </select>

      </form>
      <div className="p-0 m-2 text-center">
        <h3 className="text-gray-800 text-4xl font-bold text-center ">
          RELÁTORIOS
        </h3>
      </div>
      <div className="bg-white mx-auto w-[116rem]">
        <div className="mt-1 shadow-sm border rounded-lg overflow-x-auto max-h-[44rem] ">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">Produto</th>
                <th className="py-3 px-6">Quantidade</th>
                <th className="py-3 px-6">Tipo</th>
                <th className="py-3 px-6">Preço</th>
                <th className="py-3 px-6">Funcionário</th>
                <th className="py-3 px-6">Data Criação</th>
                <th className="py-3 px-6">Data Modificação</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {itemsEntrys
                .filter((item) => {
                  const searchTermUnidecoded = unidecode(
                    searchTerm?.toLowerCase() || ""
                  );
                  const itemUserUnidecoded = unidecode(
                    item.product?.toLowerCase() || ""
                  ); // aqui foi adicionado o teste para item.product ser nulo ou indefinido
                  if (searchTermUnidecoded === "") {
                    return true;
                  } else if (
                    itemUserUnidecoded.includes(searchTermUnidecoded)
                  ) {
                    return true;
                  }
                  return false;
                })
                .filter((item) => {
                  if (tipo === "todos" || !tipo) {
                    return true;
                  } else if (tipo === "Entrada" && item.type === "Entrada") {
                    return true;
                  } else if (tipo === "Saída" && item.type === "Saída") {
                    return true;
                  }
                  return false;
                })
                .filter((item) => {
                  if (user === "todos" || !user) {
                    return true;
                  } else if (user === item.inserted_by) {
                    return true;
                  }
                  return false;
                })
                .map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.product}
                    </td>
                    <td className="px-6 py-4 whitespace-normal break-words w-[40rem]">
                      {item.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-normal break-words">
                      {item.type}
                    </td>
                    <td className="px-6 py-4 whitespace-normal break-words">
                      R$: {item.entry_price}
                    </td>
                    <td className="px-8 py-4 whitespace-nowrap">
                      {item.inserted_by}
                    </td>
                    <td className="px-6 py-4 whitespace-normal break-words">
                      {formatDateHours(item.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-normal break-words">
                      {formatDateHours(item.updated_at)}
                    </td>
                    <td className=" px-6 whitespace-nowrap">
                    </td>
                  </tr>
                ))}
            </tbody>
            <tbody className="text-gray-600 divide-y">
              {itemsExits
                .filter((item) => {
                  const searchTermUnidecoded = unidecode(
                    searchTerm?.toLowerCase() || ""
                  );
                  const itemUserUnidecoded = unidecode(
                    item.product?.toLowerCase() || ""
                  ); // aqui foi adicionado o teste para item.product ser nulo ou indefinido
                  if (searchTermUnidecoded === "") {
                    return true;
                  } else if (
                    itemUserUnidecoded.includes(searchTermUnidecoded)
                  ) {
                    return true;
                  }
                  return false;
                })
                .filter((item) => {
                  if (tipo === "todos" || !tipo) {
                    return true;
                  } else if (tipo === "Entrada" && item.type === "Entrada") {
                    return true;
                  } else if (tipo === "Saída" && item.type === "Saída") {
                    return true;
                  }
                  return false;
                })
                .filter((item) => {
                  if (user === "todos" || !user) {
                    return true;
                  } else if (user === item.inserted_by) {
                    return true;
                  }
                  return false;
                })
                .map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.product}
                    </td>
                    <td className="px-6 py-4 whitespace-normal break-words w-[40rem]">
                      {item.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-normal break-words">
                      {item.type}
                    </td>
                    <td className="px-6 py-4 whitespace-normal break-words">
                      R$: {item.exit_price}
                    </td>
                    <td className="px-8 py-4 whitespace-nowrap">
                      {item.inserted_by}
                    </td>
                    <td className="px-6 py-4 whitespace-normal break-words">
                      {formatDateHours(item.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-normal break-words">
                      {formatDateHours(item.updated_at)}
                    </td>
                    <td className=" px-6 whitespace-nowrap">
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