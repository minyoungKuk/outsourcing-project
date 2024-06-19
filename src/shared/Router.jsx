import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../page/homePage/HomePage';
import Detail from '../page/detailPage/Detail';
import DefaultLayout from '../layouts/DefaultLayout';
import MyPage from '../page/myPage/MyPage';
import ListPage from '../page/listPage/ListPage';

const Router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      {
        path: '/detail',
        element: <Detail />,
      },
      {
        path: '/my-page',
        element: <MyPage />,
      },
      {
        path: '/list',
        element: <ListPage />,
      },
    ],
  },
]);

export default Router;
