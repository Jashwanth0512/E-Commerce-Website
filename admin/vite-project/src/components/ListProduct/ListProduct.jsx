import React, { useState, useEffect } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [newCollection, setNewCollection] = useState([]);

    const fetchInfo = async () => {
        await fetch('http://localhost:4000/allproducts')
        .then((resp) => resp.json())
        .then((data) => {
            setAllProducts(data);
        })
    }

    const fetchNewCollection = async () => {
        await fetch('http://localhost:4000/newcollection')
        .then((resp) => resp.json())
        .then((data) => {
            setNewCollection(data);
        })
    }

    useEffect(() => {
        fetchInfo();
        fetchNewCollection();
    }, []);

    const removeProduct = async (id) => {
        const resp = await fetch(`http://localhost:4000/removeproduct`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id })
        });
        const data = await resp.json();
        console.log(data);
        fetchInfo(); // Refresh the product list after removal
    }
    return(
        <div className='List-Product'>
           <h1>All products list</h1>
           <div className="listproduct-container">
             <div className="listproduct-header">
                <span>Products</span>
                <span>Title</span>
                <span>Old price</span>
                <span>New price</span>
                <span>Category</span>
                <span>Remove</span>
             </div>
             <div className="listproduct-allproducts">
                {allProducts.map((product,index)=>(
                    <div key={index} className="listproduct-row">
                      <img src={product.image} alt="" className="listproduct-product-icon"/>
                      <span>{product.name}</span>
                      <span>${product.old_price}</span>
                      <span>${product.new_price}</span>
                      <span>{product.category}</span>
                      <img onClick={() => { removeProduct(product.id) }} className='listproduct-remove-icon' src={cross_icon} alt="Remove"/>
                    </div>
                ))}
             </div>
           </div>
           {/* New Collection Section */}
           <h2 style={{marginTop: '40px'}}>New Collection</h2>
           <div className="listproduct-container">
             <div className="listproduct-header">
                <span>Products</span>
                <span>Title</span>
                <span>Old price</span>
                <span>New price</span>
                <span>Category</span>
                <span>Remove</span>
             </div>
             <div className="listproduct-allproducts">
                {newCollection.map((product,index)=>(
                    <div key={index} className="listproduct-row">
                      <img src={product.image} alt="" className="listproduct-product-icon"/>
                      <span>{product.name}</span>
                      <span>${product.old_price}</span>
                      <span>${product.new_price}</span>
                      <span>{product.category}</span>
                      {/* Remove button can be disabled or hidden for new collection if not needed */}
                    </div>
                ))}
             </div>
           </div>
        </div>
    )
}
export default ListProduct