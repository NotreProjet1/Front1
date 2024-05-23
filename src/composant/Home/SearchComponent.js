import React, { useState } from 'react';

const SearchComponent = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log(`Searching for: ${searchText}`);
    // Ajoutez ici la logique pour effectuer une recherche réelle
  };

  return (
    <div style={{ padding: '20px', borderTop: '1px solid #ccc' }}>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchComponent;
