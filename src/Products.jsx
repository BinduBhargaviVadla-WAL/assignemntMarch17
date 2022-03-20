import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Products() {
  const [products, setProducts] = useState([
    {
      name: 'womens watch',
      price: '2999',
      description: 'water proof and guaranteed 5 years ',
      category: 'womens',
      status: 'available',
    },
  ]);
  const getProducts = () => {
    axios
      .get('/products')
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getProducts();
  }, []);
  const addProduct = (event) => {
    event.preventDefault();
    const productObject = {
      name: event.target.name.value,
      price: event.target.price.value,
      description: event.target.description.value,
      category: event.target.category.value,
      status: event.target.status.value,
    };
    axios
      .post('/products', productObject)
      .then((res) => {
        console.log(res);
        getProducts();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteProduct = (index) => {
    axios
      .delete(`/products/${index}`)
      .then((res) => {
        console.log(res.data);
        getProducts();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const clearAll = () => {
    axios
      .get('/products/clearAll')
      .then((res) => {
        getProducts();
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="products">
      <div className="form">
        <h1>Add Product</h1>
        <form onSubmit={addProduct}>
          <label>Product Name:</label>
          <input type="text" name="name" placeholder="Enter product name" />
          <br />
          <label>Product Price:</label>
          <input type="number" name="price" placeholder="Enter product Price" />
          <br />
          <label>Product Description:</label>
          <textarea placeholder="Enter description" name="description" />
          <br />
          <label>Select Category:</label>
          <select name="category">
            <option value="toys">Toys</option>
            <option value="clothes">Clothes</option>
            <option value="fooditems">FoodItems</option>
          </select>
          <label>Select Status:</label>
          <select name="status">
            <option value="available">Available</option>
            <option value="notavailable">Not Available</option>
          </select>
          <button className="add-btn">Add Product</button>
        </form>
        <button onClick={clearAll} className="delAll-btn">
          Delete All Products
        </button>
      </div>
      <div className="productsList">
        <h1>Products List</h1>
        <table>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Status</th>
            <th>Delete</th>
          </tr>
          {products.map((value, index) => (
            <tr>
              <td>{value.name}</td>
              <td>{value.price}</td>
              <td>{value.description}</td>
              <td>{value.category}</td>
              <td>{value.status}</td>
              <td>
                <button
                  className="del-btn"
                  onClick={() => {
                    deleteProduct(index);
                  }}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
export default Products;
