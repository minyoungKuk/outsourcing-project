import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';
import Detail from '../page/detailPage/Detail';
import HomePage from '../page/homePage/HomePage';
import ListPage from '../page/listPage/ListPage.jsx';
import MyEditPage from '../page/myPage/MyEditPage.jsx';
import MyLikePage from '../page/myPage/MyLikePage';
import MyListPage from '../page/myPage/MyListPage';
import WritePage from '../page/writePage';
import PrivateRoute from './PrivateRoute';

const Router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      {
        path: '/detail/:id',
        element: <Detail />,
      },
      {
        path: '/my-page',
        element: (
          <PrivateRoute>
            <MyEditPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/my-like-page',
        element: (
          <PrivateRoute>
            <MyLikePage />
          </PrivateRoute>
        ),
      },
      {
        path: '/my-list-page',
        element: (
          <PrivateRoute>
            <MyListPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/list',
        element: <ListPage />,
      },
      {
        path: '/write-page',
        element: (
          <PrivateRoute>
            <WritePage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default Router;
