import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';

function Forums() {
  const [forums, setforums] = useState([]);
  const getforums = () => {
    axios
      .get('/forums')
      .then((res) => {
        setforums(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getforums();
  }, []);
  const formik = useFormik({
    initialValues: {
      title: 'Beauty of ancient Life',
      date: '2010-12-09',
      body: 'Acoording to the author the life of ancient time is beautiful ,this forum is all about it',
      author: 'ferandos',
    },
    onSubmit(values) {
      const forumObject = {
        title: values.title,
        date: values.date,
        body: values.body,
        author: values.author,
      };
      axios
        .post('/forums', forumObject)
        .then((res) => {
          console.log(res.data);
          getforums();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    validate() {
      const errors = {};
      if (formik.values.title.length < 10 || formik.values.title.length > 100) {
        errors.title = 'Title should have minimum 10 chars, maximum 100 chars';
      }
      if (formik.values.body.length < 50 || formik.values.title.length > 500) {
        errors.body =
          'Forum body should have minimum 50 chars, maximum 500 chars';
      }
      if (
        formik.values.author.length < 5 ||
        formik.values.author.length > 50 ||
        !formik.values.author.match(/^[a-zA-Z0-9]+$/)
      ) {
        errors.author =
          'Author name should be alpha numeric and it should have minimum 5 chars, maximum 50 chars';
      }
      return errors;
    },
  });
  const deleteForum = (index) => {
    axios
      .delete(`/forums/${index}`)
      .then((res) => {
        console.log(res.data);
        getforums();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const clearAll = () => {
    axios
      .get('/forums/clearAll')
      .then((res) => {
        getforums();
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="forums">
      <div className="form">
        <h1>Add Forum</h1>
        <form onSubmit={formik.handleSubmit} noValidate>
          <label>Forum Title:</label>
          <input
            type="text"
            name="title"
            placeholder="Enter forum title"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          <br />
          <div className="error">
            {formik.errors.title ? formik.errors.title : null}
          </div>
          <label>Choose date of creation: </label>
          <input
            type="date"
            name="date"
            placeholder="Choose date"
            value={formik.values.date}
            onChange={formik.handleChange}
          />
          <br />
          <label>Forum Body:</label>
          <textarea
            placeholder="Enter Forum body"
            name="body"
            value={formik.values.body}
            onChange={formik.handleChange}
          />
          <br />
          <div className="error">
            {formik.errors.body ? formik.errors.body : null}
          </div>
          <label>Author Name:</label>
          <input
            type="text"
            name="author"
            placeholder="Enter Author name"
            value={formik.values.author}
            onChange={formik.handleChange}
          />
          <br />
          <div className="error">
            {formik.errors.author ? formik.errors.author : null}
          </div>
          <button className="add-btn">Add Forum</button>
        </form>
        <button onClick={clearAll} className="delAll-btn">
          Delete All forums
        </button>
      </div>
      <div className="forumsList">
        <h1>Forums List</h1>
        <table>
          <tr>
            <th>Title</th>
            <th>Body</th>
            <th>Date of Creation</th>
            <th>Author</th>
            <th>Delete</th>
          </tr>
          {forums.map((value, index) => (
            <tr>
              <td>{value.title}</td>
              <td>{value.body}</td>
              <td>{value.date}</td>
              <td>{value.author}</td>
              <td>
                <button
                  className="del-btn"
                  onClick={() => {
                    deleteForum(index);
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
export default Forums;
