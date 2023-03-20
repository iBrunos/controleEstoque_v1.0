import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Form() {
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
    <div className='flex flex-col'>
      <form onSubmit={editingItem !== null ? updateItem : addItem} className='flex flex-row mb-4 bg-white border-b-gray-100 border-2 pl-32 pt-1 pb-2'>
      <input type="text" value={product} placeholder='Produto' onChange={e => setProduct(e.target.value)} className='mr-2 border-black border-2 rounded-md pl-1 '/>
        <input type="text" value={price} placeholder='Preço' onChange={e => setPrice(e.target.value)} className='mr-2 border-black border-2 rounded-md pl-1'/>
        <input type="text" value={brand} placeholder='Marca' onChange={e => setBrand(e.target.value)} className='mr-2 border-black border-2 rounded-md pl-1'/>
        <input type="text" value={description} placeholder='Descrição' onChange={e => setDescription(e.target.value)} className='mr-2 border-black border-2 rounded-md pl-1'/>
        <input type="text" value={amount} placeholder='Quantidade' onChange={e => setAmount(e.target.value)} className='mr-2 border-black border-2 rounded-md pl-1'/>
        <button type="submit" className='border-black border-2 rounded-md p-1'>{editingItem !== null ? 'Update Item' : 'Add Item'}</button>
      </form>
      <table>
        <thead>
          <tr className=''>
            <th>Produto</th>
            <th>Preço</th>
            <th>Marca</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className='mb-1'>
          {items.map(item => (
            <tr key={item.id}>
              <td className='p-2'>{item.product}</td>
              <td className='p-2'>{item.price}</td>
              <td className='p-2 pr-4'>{item.brand}</td>
              <td className='p-2 pr-4'>{item.description}</td>
              <td className='p-2 pr-4'>{item.amount}</td>
              <td>
                <button onClick={() => deleteItem(item.id)} className='border-black border-2 rounded-md p-1 mb-1'>Delete</button>
                <button onClick={() => editItem(item.id)} className='border-black border-2 rounded-md p-1 mb-1'>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
  );
}
