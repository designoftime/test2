import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Styles/Shop.css';

export const Shop = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showAllProducts, setShowAllProducts] = useState(false);

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then((response) => {
                setProducts(response.data.slice(0, 6)); // Limit to first 6 products initially
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const openModal = (product) => {
        setSelectedProduct(product);
    };

    const closeModal = () => {
        setSelectedProduct(null);
    };

    const handleViewMore = () => {
        axios.get('https://fakestoreapi.com/products')
            .then((response) => {
                setProducts(response.data);
                setShowAllProducts(true);
            })
            .catch((error) => {
                console.error('Error fetching more products:', error);
            });
    };

    return (
        <div className="main">
            <div className="row equal-height">
                {products.map((product, index) => (
                    <div key={index} className="col-sm-4">
                        <div className="card mt-3">
                            <img className="card-img-top" src={product.image} alt="Product" onClick={() => openModal(product)} />
                            <div className="card-body">
                                <h5 className="card-title">{product.title.slice(0, 20)}{product.title.length > 20 ? '...' : ''}</h5>
                                <p className="card-text">Price: Rs{product.price}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {!showAllProducts && products.length === 6 && (
                <div className="row">
                    <div className="col-12 text-center mt-3">
                        <button className="btn btn-primary" onClick={handleViewMore}>View More</button>
                    </div>
                </div>
            )}
            {showAllProducts && (
                <div className="row equal-height">
                    {products.map((product, index) => (
                        <div key={index} className="col-sm-4">
                            <div className="card mt-3">
                                <img className="card-img-top" src={product.image} alt="Product" onClick={() => openModal(product)} />
                                <div className="card-body">
                                    <h5 className="card-title">{product.title.slice(0, 20)}{product.title.length > 20 ? '...' : ''}</h5>
                                    <p className="card-text">Price: Rs{product.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {selectedProduct && (
                <div className="modal fade" id="productModal" tabIndex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="productModalLabel">{selectedProduct.title}</h5>
                                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <img className="card-img-top" src={selectedProduct.image} alt="Product" />
                                <p>Description: {selectedProduct.description}</p>
                                <p>Category: {selectedProduct.category}</p>
                                <p>ID: {selectedProduct.id}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
