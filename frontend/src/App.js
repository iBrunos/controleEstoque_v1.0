import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ItemList() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await axios.get('http://localhost:3000/items');
    setItems(response.data);
  };

  const addItem = async (e) => {
    e.preventDefault();
    const newItem = { name, description };
    const response = await axios.post('http://localhost:3000/items', newItem);
    setItems([...items, response.data]);
    setName('');
    setDescription('');
  };

  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:3000/items/${id}`);
    setItems(items.filter(item => item.id !== id));
  };
  
  return (
    <div>
      <form onSubmit={addItem}>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
        <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
        <button type="submit">Add Item</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
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


export default ItemList;
