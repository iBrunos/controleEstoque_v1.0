import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Form() {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [level, setLevel] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await axios.get('http://localhost:3000/user');
    setItems(response.data);
  };

  const addItem = async (e) => {
    e.preventDefault();
    const newItem = { user, password, level, email, phone };
    const response = await axios.post('http://localhost:3000/user', newItem);
    setItems([...items, response.data]);
    setUser('');
    setPassword('');
    setLevel('');
    setEmail('');
    setPhone('');
  };

  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:3000/user/${id}`);
    setItems(items.filter(item => item.id !== id));
  };

  const editItem = async (id) => {
    setEditingItem(id);
    const response = await axios.get(`http://localhost:3000/user/${id}`);
    const item = response.data;
    setUser(item.user);
    setPassword(item.password);
    setLevel(item.level);
    setEmail(item.email);
    setPhone(item.phone);
    fetchItems();
  };

  const updateItem = async (e) => {
    e.preventDefault();
    const updatedItem = { user, password, level, email, phone };
    const response = await axios.put(`http://localhost:3000/user/${editingItem}`, updatedItem);
    setItems(items.map(item => item.id === editingItem ? response.data : item));
    setUser('');
    setPassword('');
    setLevel('');
    setEmail('');
    setPhone('');
    setEditingItem(null);
    fetchItems();
  };

  return (
    <div className='flex flex-col'>
      <form onSubmit={editingItem !== null ? updateItem : addItem} className='flex flex-row mb-4 bg-white border-b-gray-100 border-2 pl-32 pt-1 pb-2'>
        <input type="text" value={user} placeholder='Usuário' onChange={e => setUser(e.target.value)} className='mr-2 border-black border-2 rounded-md pl-1 '/>
        <input type="password" value={password} placeholder='Senha' onChange={e =>  setPassword(e.target.value)} className='mr-2 border-black border-2 rounded-md pl-1'/>
        <input type="number" value={level} placeholder='Level' onChange={e => setLevel(e.target.value)} className='mr-2 border-black border-2 rounded-md pl-1'/>
        <input type="text" value={email} placeholder='Email' onChange={e => setEmail(e.target.value)} className='mr-2 border-black border-2 rounded-md pl-1'/>
        <input type="text" value={phone} placeholder='Telefone' onChange={e => setPhone(e.target.value)} className='mr-2 border-black border-2 rounded-md pl-1'/>
        <button type="submit" className='border-black border-2 rounded-md p-1'>{editingItem !== null ? 'Update Item' : 'Add Item'}</button>
      </form>
      <table>
        <thead>
          <tr className=''>
            <th>User</th>
            <th>Senha</th>
            <th>Level</th>
            <th>Level</th>
            <th>Level</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className='mb-1'>
          {items.map(item => (
            <tr key={item.id}>
              <td className='p-2'>{item.user}</td>
              <td className='p-2'>{item.password} </td>
              <td className='p-2 pr-4'>{item.level}</td>
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
