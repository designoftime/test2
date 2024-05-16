import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';

export default function ProductSearch() {
  const [searchResults, setSearchResults] = useState([]);

  const searchProducts = async (searchValue) => {
    try {
      let res = await axios.get('https://fakestoreapi.com/products');
      let response = res.data.filter((item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setSearchResults(response);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  const handleSearch = (searchQuery) => {
    searchProducts(searchQuery);
  };

  return (
    <div>
      <Header onSearch={handleSearch} />
      <div className="product-search-results">
        {searchResults.map((product) => (
          <div key={product.id} className="product">
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
            <img src={product.image} alt={product.title} />
          </div>
        ))}
      </div>
    </div>
  );
}
