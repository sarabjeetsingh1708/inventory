// components/ItemList.js
import React from 'react';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ItemList = ({ items, onDelete, onEdit }) => {
  return (
    <List>
      {items.map((item) => (
        <ListItem key={item.id} secondaryAction={
          <IconButton edge="end" aria-label="delete" onClick={() => onDelete(item.id)}>
            <DeleteIcon />
          </IconButton>
        }>
          <ListItemText primary={item.name} secondary={`Price: $${item.price} | Quantity: ${item.quantity}`} onClick={() => onEdit(item)} />
        </ListItem>
      ))}
    </List>
  );
};

export default ItemList;
