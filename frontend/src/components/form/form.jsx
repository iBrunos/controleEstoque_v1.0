import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Form() {
  const [items, setItems] = useState([]);
  const [product, setProduct] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

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
  
  return (
    <div>
      <form onSubmit={addItem}>
        <input type="text" value={product} onChange={e => setProduct(e.target.value)} />
        <input type="text" value={price} onChange={e => setPrice(e.target.value)} />
        <input type="text" value={brand} onChange={e => setBrand(e.target.value)} />
        <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
        <input type="text" value={amount} onChange={e => setAmount(e.target.value)} />
        <button type="submit">Add Item</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Preço</th>
            <th>Marca</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.product}</td>
              <td>{item.price}</td>
              <td>{item.brand}</td>
              <td>{item.description}</td>
              <td>{item.amount}</td>
              <td>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
                <button onClick={() => deleteItem(item.id)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
  );
}
