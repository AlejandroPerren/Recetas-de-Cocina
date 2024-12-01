import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from '../layout/AuthLayout';
import SignUp from '../pages/SignUp';
import LoginForm from '../pages/Login';
import UsersLayout from '../layout/UsersLayout';
import HomeLayout from '../layout/HomeLayout';
import Home from '../pages/Home';

const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: 'signup',
                element: <SignUp />,
            },
            {
                path: 'login',
                element: <LoginForm />,
            },
        ]
    },
    {
        path: '/',
        element: <HomeLayout />,
        children: [
            {
                path : 'home',
                element: <Home/>
            }
        ]
    },
    {
        path: '/',
        element: <UsersLayout />,
        children: [
            {
                path: '',
            }
        ]
    },

]);

export default router;
