import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../page/homePage/HomePage';
import Detail from '../page/detailPage/Detail';
import List from '../page/listPage/List';
import DefaultLayout from '../layouts/DefaultLayout';
import MyPage from '../page/myPage/MyPage';
import WritePage from '../page/writePage';

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
      {
        path: '/write-page',
        element: <WritePage />,
      },
    ],
  },
]);

export default Router;
