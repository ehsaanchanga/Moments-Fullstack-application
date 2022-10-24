import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`;
  }
  return req;
});

// !Post Creation
export const fetchPost = (id) => API.get(`/posts/${id}`);

export const fetchPosts = () => {
  return API.get('/posts');
};

export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${
      searchQuery.tags
    }`
  );

export const createPost = (newPost) => {
  return API.post('/posts', newPost);
};

export const likePost = (id) => {
  return API.patch(`/posts/${id}/likePost`);
};

export const comment = (value, id) => {
  return API.post(`/posts/${id}/commentPost`, { value });
};

export const updatePost = (id, updatedPost) => {
  return API.patch(`/posts/${id}`, updatedPost);
};

export const deletePost = (id) => {
  return API.delete(`/posts/${id}`);
};

//! Authentication
export const signIn = (formData) => API.post(`/user/signin`, formData);
export const signUp = (formData) => API.post(`/user/signup`, formData);
