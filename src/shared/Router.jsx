import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';
import HomePage from '../page/homePage/HomePage';
import ListPage from '../page/listPage/ListPage.jsx';
import Detail from '../page/detailPage/Detail';
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
        element: <ListPage />,
      },
    ],
  },
]);

export default Router;
