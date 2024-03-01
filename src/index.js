import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AdminDashBoard from './Components/Router/AdminDashBoard';
import User from './Components/Admin/User';
import Blogs from './Components/Blogs';
import Catagories from './Components/Catagories';
import Profile from './Components/Router/Profile';
import SignUp from './Components/Router/SignUp';
import SignIn from './Components/Router/SignIn';
import Blog from './Components/Blog';
import BlogListProvider from './store/BlogStore';
import BlogForm from './Components/Admin/BlogForm';
import AddCatagories from './Components/Admin/AddCatagories';
import AddUsers from './Components/Admin/AddUsers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserLayout from './Components/User/UserLayout';
import AdminBlogs from './Components/Admin/AdminBlogs';

const router = createBrowserRouter([
  {
    path: '/',
    Component: SignIn,
  },
  {
    path: '/signup',
    Component: SignUp,
  },
  {
    path: '/user',
    Component: UserLayout,
    children: [
      {
        path: 'blogs',
        Component: Blogs,
      },
      {
        path: 'blog/:id',
        Component: Blog,
      },
      {
        path: 'users',
        Component: User,
      },
      {
        path: 'profile',
        Component: Profile,
      },
    ],
  },
  {
    path: '/admin',
    Component: AdminDashBoard,
    children: [
      // {
      //   index: true,
      //   Component: Profile,
      // },
      {
        path: 'adminBlogs',
        Component: AdminBlogs,
      },
      {
        path: 'users',
        Component: User,
      },
      {
        path: 'catagories',
        Component: Catagories,
      },
      {
        path: 'blog/add',
        Component: BlogForm,
      },
      {
        path: 'catagories/add',
        Component: AddCatagories,
      },
      {
        path: 'user/add',
        Component: AddUsers,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BlogListProvider>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BlogListProvider>
  </React.StrictMode>
);
reportWebVitals();
