import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';
import Detail from '../page/detailPage/Detail';
import HomePage from '../page/homePage/HomePage';
import List from '../page/listPage/List';
import MyPage from '../page/myPage/MyPage';

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
        element: <List />,
      },
    ],
  },
]);

export default Router;
