// page.js
'use client';
import React, { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot, deleteDoc, doc, query } from 'firebase/firestore';
import { firestore } from './firebase';
import styles from './styles/Home.module.css';

export default function Home() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: '', quantity: '' });
  const [total, setTotal] = useState(0);

  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.name !== '' && newItem.price !== '' && newItem.quantity !== '') {
      await addDoc(collection(firestore, 'items'), {
        name: newItem.name.trim(),
        price: parseFloat(newItem.price),
        quantity: parseInt(newItem.quantity),
      });
      setNewItem({ name: '', price: '', quantity: '' });
    }
  };

  useEffect(() => {
    const q = query(collection(firestore, 'items'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];
      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArr);

      const calculateTotal = () => {
        const totalPrice = itemsArr.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotal(totalPrice);
      };
      calculateTotal();
    });

    return () => unsubscribe();
  }, []);

  const deleteItem = async (id) => {
    await deleteDoc(doc(firestore, 'items', id));
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Pantry Tracker</h1>
        <form className={styles.form} onSubmit={addItem}>
          <input
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className={styles.input}
            type="text"
            placeholder="Enter Item"
          />
          <input
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            className={styles.input}
            type="number"
            placeholder="Enter $"
          />
          <input
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
            className={styles.input}
            type="number"
            placeholder="Enter Quantity"
          />
          <button className={styles.button} type="submit">+</button>
        </form>
        <ul className={styles.list}>
          {items.map((item, id) => (
            <li key={id} className={styles.listItem}>
              <div className={styles.itemDetails}>
                <span>{item.name}</span>
                <span>${item.price}</span>
                <span>Qty: {item.quantity}</span>
              </div>
              <button onClick={() => deleteItem(item.id)} className={styles.deleteButton}>X</button>
            </li>
          ))}
        </ul>
        {items.length > 0 && (
          <div className={styles.total}>
            <span>Total: ${total.toFixed(2)}</span>
          </div>
        )}
      </div>
    </main>
  );
}
