import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../header/Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function FormUsers() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [level, setLevel] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:3000/user");
    setUsers(response.data);
  };

  const addUser = async (e) => {
    e.preventDefault();
    const newUser = { user, password, level, email, phone };
    const response = await axios.post("http://localhost:3000/user", newUser);
    setUsers([...user, response.data]);
    setUser("");
    setPassword("");
    setLevel("");
    setEmail("");
    setPhone("");
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:3000/user/${id}`);
    setUsers(users.filter((user) => user.id !== id));
  };

  const editUser = async (id) => {
    setEditingUser(id);
    const response = await axios.get(`http://localhost:3000/user/${id}`);
    const User = response.data;
    setUser(User.user);
    setPassword(User.password);
    setLevel(User.level);
    setEmail(User.email);
    setPhone(User.phone);
    setEditingUser(null);
    fetchUsers();
  };

  const updateUser = async (e) => {
    e.preventDefault();
    const updatedUser = { user, password, level, email, phone };
    const response = await axios.put(
      `http://localhost:3000/User/${editingUser}`,
      updatedUser
    );
    setUsers(
      users.map((user) => (user.id === editingUser ? response.data : user))
    );
    setUser("");
    setPassword("");
    setLevel("");
    setEmail("");
    setPhone("");
    setEditingUser(null);
    fetchUsers();
  };

  return (
    <>
      <Header />
      <form
        onSubmit={editingUser !== null ? updateUser : addUser}
        className="flex flex-row mb-0 mt-1 bg-white border-b-gray-200 border-b pl-32 pt-1 pb-2 ml-0"
      >
        <input
          type="text"
          value={user}
          placeholder="Usuário"
          onChange={(e) => setUser(e.target.value)}
          className="mr-2 border-gray-300 border rounded-md p-2 w-full outline-none appearance-none placeholder-gray-500 text-gray-500 sm:w-auto "
          id="input__product"
        />
        <input
          type="password"
          value={password}
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
          className="mr-2 border-gray-300 border rounded-md p-2 w-full outline-none appearance-none placeholder-gray-500 text-gray-500 sm:w-auto"
        />
        <input
          type="number"
          value={level}
          placeholder="Nível"
          onChange={(e) => setLevel(e.target.value)}
          className="mr-2 border-gray-300 border rounded-md p-2 w-full outline-none appearance-none placeholder-gray-500 text-gray-500 sm:w-auto"
        />
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="mr-2 border-gray-300 border rounded-md p-2 w-[25rem] outline-none appearance-none placeholder-gray-500 text-gray-500"
        />
        <input
          type="tel"
          value={phone}
          placeholder="Telefone"
          onChange={(e) => setPhone(e.target.value)}
          className="mr-2 border-gray-300 border rounded-md p-2 w-[8.5rem] outline-none appearance-none placeholder-gray-500 text-gray-500"
        />
        <button
          type="submit"
          className="mr-16 border rounded-md  p-2 bg-pink-500 text-white font-medium"
        >
          {editingUser !== null ? "Editar Usuário" : "Adicionar Usuário"}
        </button>
        <section className="flex items-center space-x-2 border rounded-md p-2">
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
            className="w-full outline-none appearance-none placeholder-gray-500 text-gray-500 sm:w-auto"
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Pesquisar"
            id="input__pesquisar"
          />
        </section>
      </form>
      <div className="bg-white mx-auto px-4 md:px-8">
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
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
              {users
                .filter((user) => {
                  if (searchTerm === "") {
                    return user;
                  } else if (
                    user.product
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return user;
                  }
                  return null;
                })
                .map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{user.user}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.password}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.level}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.phone}
                    </td>
                    <td className="px-6 whitespace-nowrap">
                      <button
                        onClick={() => editUser(user.id)}
                        className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                      >
                        <EditIcon className="mr-2" />
                        Editar
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                      >
                        <DeleteForeverIcon className="mr-2" />
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
