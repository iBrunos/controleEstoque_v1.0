import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../header/Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import moment from "moment";
import unidecode from "unidecode";

export default function FormProducts() {
  const [items, setItems] = useState([]);
  const [items2, setItems2] = useState([]);
  const [product, setProduct] = useState("");
  const [observation, setObservation] = useState("");
  const [inserted_by, setInserted_by] = useState("");
  const [amount, setAmount] = useState("");
  const [exitPrice, setExitPrice] = useState("");
  const [type, setType] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const changePageTitle = (newTitle) => {
    document.title = newTitle;
  };
  changePageTitle("Happy Makeup | Saídas");

  useEffect(() => {
    fetchItems();
    dropDown();
  }, []);

  const fetchItems = async () => {
    const token = localStorage.getItem("token");
    // definir o cabeçalho `Authorization` com o token JWT
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    // fazer uma solicitação HTTP GET para a rota protegida com o token JWT
    try {
      const response = await axios.get("http://localhost:3000/exit", config);
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const dropDown = async () => {
    const token = localStorage.getItem("token");
    // definir o cabeçalho `Authorization` com o token JWT
    const config2 = {
      headers: { Authorization: `Bearer ${token}` },
    };
    // fazer uma solicitação HTTP GET para a rota protegida com o token JWT
    try {
      const response2 = await axios.get(
        "http://localhost:3000/product",
        config2
      );
      setItems2(response2.data);
    } catch (error) {
      console.error(error);
    }
  };

  function formatDateHours(dateString) {
    const date = moment(dateString).format("DD/MM/YYYY [às] HH:mm");
    return date;
  }

  const formatPrice = (price) => {
    if (typeof price !== "string") {
      price = price.toString();
    }
  
    // Substitui o ponto ou a vírgula pelo caractere de separador de decimais adequado
    price = price.replace(/[.,]/g, ",");
  
    // Adiciona as casas decimais faltantes, se necessário
    if (!price.includes(",")) {
      price += ",00";
    } else {
      const decimalPart = price.split(",")[1];
      if (decimalPart.length === 1) {
        price += "0";
      }
    }
  
    return price;
  };

  function transformStringToNumber(stringNumber) {
    // Remove quaisquer espaços em branco antes ou depois da string
    const cleanedString = stringNumber.trim();
    // Converte a string em um número usando parseFloat()
    const number = parseFloat(cleanedString.replace(",", "."));
    return number;
  }

  const addItem = async (e) => {
    e.preventDefault();

    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    const newItem = {
      product,
      observation,
      amount,
      exitPrice: formatPrice(exitPrice),
      inserted_by,
      type,
    };
    newItem.inserted_by = user;
    newItem.type = "Saída";
    const response = await axios.post("http://localhost:3000/exit", newItem, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setItems([...items, response.data]);
    setProduct("");
    setObservation("");
    setAmount("");
    setExitPrice("");
    setType("Saída");
    fetchItems();
  };

  const deleteItem = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:3000/exit/${id}`, {
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
    const response = await axios.get(`http://localhost:3000/exit/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const item = response.data;
    setProduct(item.product);
    setObservation(item.observation);
    setAmount(item.amount);
    setExitPrice(transformStringToNumber(item.exit_price));
    setInserted_by(item.inserted_by);
  };

  const updateItem = async (e) => {
    e.preventDefault();
    const user = localStorage.getItem("user");
    const updatedItem = {
      product,
      observation,
      amount,
      exitPrice: formatPrice(exitPrice),
      inserted_by,
      type,
    };
    updatedItem.type = "Saída";
    updatedItem.inserted_by = user;
    console.log(updatedItem);
    const token = localStorage.getItem("token");

    const response = await axios.put(
      `http://localhost:3000/exit/${editingItem}`,
      updatedItem,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setItems(
      items.map((item) => (item.id === editingItem ? response.data : item))
    );
    setProduct("");
    setObservation("");
    setAmount("");
    setExitPrice("");
    setInserted_by("");
    setType("Saída");
    setEditingItem(null);
    fetchItems();
  };
  return (
    <>
      <Header />
      <form
        onSubmit={editingItem !== null ? updateItem : addItem}
        className="flex flex-row mb-0 mt-1 bg-white border-b-gray-200 border-b pl-8 pt-1 pb-2 ml-0"
      >
        <div className="relative w-80 mr-2 ">
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
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            required // adicionado o atributo required
          >
            <option value="">Selecione um produto</option>
            {items2.map((item2) => (
              <option
                key={item2.id}
                className="hover:text-pink-500 hover:bg-pink-50"
                value={item2.product}
              >
                {item2.product}
              </option>
            ))}
          </select>
        </div>

        <input
          type="text"
          value={observation}
          placeholder="Observação"
          onChange={(e) => setObservation(e.target.value)}
          className="mr-2 border-gray-300 border rounded-md p-2 w-[30rem] outline-none appearance-none placeholder-gray-500 text-gray-500 focus:border-pink-500"
        />
        <input
          type="number"
          value={amount}
          placeholder="Quantidade"
          onChange={(e) => setAmount(e.target.value)}
          className="mr-2 border-gray-300 border rounded-md p-2 w-[10rem] outline-none appearance-none placeholder-gray-500 text-gray-500 focus:border-pink-500"
          required
        />
        <input
          type="number"
          value={exitPrice}
          placeholder="Preço de Saída"
          onChange={(e) => setExitPrice(e.target.value)}
          className="mr-2 border-gray-300 border rounded-md p-2 w-[10rem] outline-none appearance-none placeholder-gray-500 text-gray-500 focus:border-pink-500"
          required
        />
        <button
          type="submit"
          className="mr-10 border rounded-md p-2 bg-pink-500 text-white font-medium hover:bg-pink-600"
        >
          {editingItem !== null ? "Salvar Saída" : "Adicionar Saída"}
        </button>
        <section className="flex items-center space-x-2 border rounded-md p-2 ml-36 focus:border-pink-500">
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
      </form>
      <div className="p-0 m-2 text-center">
        <h3 className="text-gray-800 text-4xl font-bold text-center ">
          SAÍDA DE PRODUTOS
        </h3>
      </div>
      <div className="bg-white mx-auto px-4 md:px-8">
        <div className="mt-1 shadow-sm border rounded-lg overflow-x-auto max-h-[44rem]">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">Produto</th>
                <th className="py-3 px-6">Observação</th>
                <th className="py-3 px-6">Quantidade</th>
                <th className="py-3 px-2">Preço de Saída</th>
                <th className="py-3 px-6">Funcionário</th>
                <th className="py-3 px-6">Criado</th>
                <th className="py-3 px-6">Editado</th>
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
                    <td className="px-6 py-4 whitespace-normal break-words w-[40rem]">
                      {item.observation}
                    </td>
                    <td className="px-6 py-4 whitespace-normal break-words">
                      {item.amount}
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
