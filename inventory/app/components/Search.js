// components/Search.js
import React from 'react';
import { TextField, Box } from '@mui/material';

const Search = ({ searchQuery, setSearchQuery }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        label="Search Items"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </Box>
  );
};

export default Search;
