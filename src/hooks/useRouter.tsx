import { createBrowserRouter } from 'react-router-dom';

import {
    Layout,
} from '@/components';

import {
    Home,
    NotFound
} from '@/pages';

export const useRouter = () => createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <NotFound />,
        children: [{ index: true, element: <Home /> }],
    },
]);