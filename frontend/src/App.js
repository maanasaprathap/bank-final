import { Provider } from 'react-redux';
import './App.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './app/store';
import Redirect from './pages/Redirect';
import RegisterSuccessful from './pages/RegisterSuccessful';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Redirect />
    },
    {
      path: '/dashboard/*',
      element: <ProtectedRoute><Dashboard /></ProtectedRoute>
    }, 
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signup',
      element: <Register />
    },
    {
      path: '/successful',
      element: <RegisterSuccessful />
    }
  ]); // Added closing bracket and colon here
  return (
    <Provider store={store}>
      <RouterProvider router={router}>
      </RouterProvider>
    </Provider>
  );
}

export default App;
