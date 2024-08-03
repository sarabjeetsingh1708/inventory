// components/PantryForm.js
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { firestore } from '../firebase';

const PantryForm = ({ itemToUpdate, onUpdate }) => {
  const [item, setItem] = useState(itemToUpdate || { name: '', price: '', quantity: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (itemToUpdate) {
      await updateDoc(doc(firestore, 'items', itemToUpdate.id), item);
      onUpdate();
    } else {
      await addDoc(collection(firestore, 'items'), item);
    }
    setItem({ name: '', price: '', quantity: '' });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="Item Name" value={item.name} onChange={(e) => setItem({ ...item, name: e.target.value })} />
      <TextField label="Price" type="number" value={item.price} onChange={(e) => setItem({ ...item, price: e.target.value })} />
      <TextField label="Quantity" type="number" value={item.quantity} onChange={(e) => setItem({ ...item, quantity: e.target.value })} />
      <Button variant="contained" color="primary" type="submit">{itemToUpdate ? 'Update' : 'Add'} Item</Button>
    </Box>
  );
};

export default PantryForm;
