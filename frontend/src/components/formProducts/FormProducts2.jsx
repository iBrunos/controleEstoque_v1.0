import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../header/Header';
export default function FormProducts2() {

    const [items, setItems] = useState([]);
  const [product, setProduct] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await axios.get('http://localhost:3000/product');
    setItems(response.data);
  };

  const addItem = async (e) => {
    e.preventDefault();
    const newItem = { product, price, brand, description, amount };
    const response = await axios.post('http://localhost:3000/product', newItem);
    setItems([...items, response.data]);
    setProduct('');
    setPrice('');
    setBrand('');
    setDescription('');
    setAmount('');
  };

  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:3000/product/${id}`);
    setItems(items.filter(item => item.id !== id));
  };

  const editItem = async (id) => {
    setEditingItem(id);
    const response = await axios.get(`http://localhost:3000/product/${id}`);
    const item = response.data;
    console.log(item);
    //let productInput = item.product.value;
    //productInput = document.getElementById("input__product").innerHTML;
    setProduct(item.product);
    setPrice(item.price);
    setBrand(item.brand);
    setDescription(item.description);
    setAmount(item.amount);
    setEditingItem(null);
    fetchItems();
  };

  const updateItem = async (e) => {
    e.preventDefault();
    const updatedItem = { product, price, brand, description, amount };
    const response = await axios.put(`http://localhost:3000/product/${editingItem}`, updatedItem);
    setItems(items.map(item => item.id === editingItem ? response.data : item));
    setProduct('');
    setPrice('');
    setBrand('');
    setDescription('');
    setAmount('');
    setEditingItem(null);
    fetchItems();
  };

    return (
        <>
        <Header />
        <form onSubmit={editingItem !== null ? updateItem : addItem} className='flex flex-row mb-4 mt-1 bg-white border-b-gray-200 border-b pl-96 pt-1 pb-2 ml-0'>
        <input type="text" value={product} placeholder='Produto' onChange={e => setProduct(e.target.value)} className='mr-2 border-gray-300 border rounded-md p-2 w-full outline-none appearance-none placeholder-gray-500 text-gray-500 sm:w-auto ' id='input__product'/>
        <input type="text" value={price} placeholder='Preço' onChange={e => setPrice(e.target.value)} className='mr-2 border-gray-300 border rounded-md p-2 w-full outline-none appearance-none placeholder-gray-500 text-gray-500 sm:w-auto'/>
        <input type="text" value={brand} placeholder='Marca' onChange={e => setBrand(e.target.value)} className='mr-2 border-gray-300 border rounded-md p-2 w-full outline-none appearance-none placeholder-gray-500 text-gray-500 sm:w-auto'/>
        <input type="text" value={description} placeholder='Descrição' onChange={e => setDescription(e.target.value)} className='mr-2 border-gray-300 border rounded-md p-2 w-full outline-none appearance-none placeholder-gray-500 text-gray-500 sm:w-auto'/>
        <input type="text" value={amount} placeholder='Quantidade' onChange={e => setAmount(e.target.value)} className='mr-2 border-gray-300 border rounded-md p-2 w-full outline-none appearance-none placeholder-gray-500 text-gray-500 sm:w-auto'/>
        <button type="submit" className='mr-2 border rounded-md p-2 bg-pink-500 text-white font-medium'>{editingItem !== null ? 'Editar Produto' : 'Adicionar Produto'}</button>
      </form>
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="mt-3 shadow-sm border rounded-lg overflow-x-auto overflow-y-scroll max-h-[47rem]">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 px-6">Produto</th>
                            <th className="py-3 px-6">Preço</th>
                            <th className="py-3 px-6">Marca</th>
                            <th className="py-6 px-3 pl-64">Descrição</th>
                            <th className="py-3 px-6">Quantidade</th>
                            <th className="py-3 px-6"></th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {
                            items.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.product}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.brand}</td>
                                    <td className="px-6 py-4 whitespace-normal break-words w-[90rem]">{item.description}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.amount}</td>
                                    <td className="text-right px-6 whitespace-nowrap">
                                        <button onClick={() => editItem(item.id)} className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                                            Edit
                                        </button>
                                        <button onClick={() => deleteItem(item.id)} className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}