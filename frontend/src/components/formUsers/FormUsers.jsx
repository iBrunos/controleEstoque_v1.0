import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../header/Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import unidecode from "unidecode";

export default function FormProducts() {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [level, setLevel] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const changePageTitle = (newTitle) => {
    document.title = newTitle;
  };
  changePageTitle("Happy Makeup | Usuários");
  function censorText(text) {
    const censoredText = "⚫".repeat(text.length);
    return censoredText;
  }

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const token = localStorage.getItem("token");
    // definir o cabeçalho `Authorization` com o token JWT
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    // fazer uma solicitação HTTP GET para a rota protegida com o token JWT
    try {
      const response = await axios.get("http://localhost:3000/user", config);
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addItem = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const newItem = {
      user,
      password,
      level,
      email,
      phone,
    };

    const response = await axios.post("http://localhost:3000/user", newItem, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setItems([...items, response.data]);
    setUser("");
    setPassword("");
    setLevel("");
    setEmail("");
    setPhone("");
  };

  const deleteItem = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:3000/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const editItem = async (id) => {
    const token = localStorage.getItem("token");

    setEditingItem(id);
    const response = await axios.get(`http://localhost:3000/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const item = response.data;
    setUser(item.user);
    setPassword("");
    setLevel(item.level);
    setEmail(item.email);
    setPhone(item.phone);
  };

  const updateItem = async (e) => {
    e.preventDefault();

    const updatedItem = {
      user,
      password,
      level,
      email,
      phone,
    };
    updatedItem.inserted_by = user;
    const token = localStorage.getItem("token");

    const response = await axios.put(
      `http://localhost:3000/user/${editingItem}`,
      updatedItem,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setItems(
      items.map((item) => (item.id === editingItem ? response.data : item))
    );
    setUser("");
    setPassword("");
    setLevel("");
    setEmail("");
    setPhone("");
    setEditingItem(null);
    fetchItems();
    window.location.reload();
  };

  return (
    <>
      <Header />
      <form
        onSubmit={editingItem !== null ? updateItem : addItem}
        className="flex flex-row mb-0 mt-1 bg-white border-b-gray-200 border-b pl-8 pt-1 pb-2 ml-0"
      >
        <input
          type="text"
          value={user}
          placeholder="Usuário"
          onChange={(e) => setUser(e.target.value)}
          required
          className="mr-2 border-gray-300 border rounded-md p-2 w-full outline-none appearance-none placeholder-gray-500 text-gray-500 sm:w-auto focus:border-pink-500"
          id="input__product"
        />
        <input
          type="password"
          value={password}
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mr-2 border-gray-300 border rounded-md p-2 w-full outline-none appearance-none placeholder-gray-500 text-gray-500 sm:w-auto focus:border-pink-500"
        />
        <div className="relative w-40 mr-2 text-pink-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 bottom-0 w-6 h-6 my-auto text-pink-500 right-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          <select
            className="w-full py-2  pl-2 pr-6 text-gray-500 border-gray-300 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-pink-500 cursor-pointer"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            required
          >
            <option value="">Nível de Acesso</option>
            <option className="hover:text-pink-500 hover:bg-pink-50">
              Funcionário
            </option>
            <option className="hover:text-pink-500 hover:bg-pink-50">
              Gerente
            </option>
          </select>
        </div>

        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="mr-2 border-gray-300 border rounded-md p-2 w-[10rem] outline-none appearance-none placeholder-gray-500 text-gray-500 focus:border-pink-500"
        />
        <input
          type="text"
          value={phone}
          placeholder="Telefone"
          onChange={(e) => setPhone(e.target.value)}
          className="mr-2 border-gray-300 border rounded-md p-2 w-[10rem] outline-none appearance-none placeholder-gray-500 text-gray-500 focus:border-pink-500"
        />
        <button
          type="submit"
          className="mr-16 border rounded-md  p-2 bg-pink-500 text-white font-medium hover:bg-pink-600"
        >
          {editingItem !== null ? "Salvar Usuário" : "Adicionar Usuário"}
        </button>
        <section className="flex items-center space-x-2 border rounded-md p-2 ml-[23rem] focus:border-pink-500">
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
            className="outline-none appearance-none placeholder-gray-500 text-gray-500 w-64"
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Pesquisar"
            id="input__pesquisar"
          />
        </section>
      </form>
      <div className="p-0 m-2 text-center">
        <h3 className="text-gray-800 text-4xl font-bold text-center ">
          CADASTRO DE USUÁRIOS
        </h3>
      </div>
      <div className="bg-white mx-auto px-4 md:px-8">
        <div className="mt-1 shadow-sm border rounded-lg overflow-x-auto max-h-[44rem]">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">Usuário</th>
                <th className="py-3 px-6">Senha</th>
                <th className="py-3 px-6">Nível de Acesso</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Telefone</th>
                <th className="py-3 px-6">Ações</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {items
                .filter((item) => {
                  const searchTermUnidecoded = unidecode(
                    searchTerm?.toLowerCase() || ""
                  );
                  const itemUserUnidecoded = unidecode(
                    item.user?.toLowerCase() || ""
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
                    <td className="px-6 py-4">{item.user}</td>
                    <td className="px-6 py-4 text-[0.5rem]">{censorText(item.password)}</td>
                    <td className="px-6 py-4">{item.level}</td>
                    <td className="px-6 py-4 ">{item.email}</td>
                    <td className="px-6 py-4 ">{item.phone}</td>
                    <td className=" px-6 whitespace-nowrap">
                      <button
                        onClick={() => editItem(item.id)}
                        className="py-1 px-2 font-medium text-white duration-150 hover:bg-indigo-700 bg-indigo-600 rounded-lg mr-1"
                      >
                        <EditIcon className="mr-1" />
                        Editar
                      </button>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="py-1 leading-none px-2 font-medium text-white duration-150 bg-red-600 hover:bg-red-700 rounded-lg"
                      >
                        <DeleteForeverIcon className="mr-1" />
                        Deletar
                      </button>
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
