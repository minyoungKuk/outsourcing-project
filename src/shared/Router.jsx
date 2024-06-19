import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';
import Detail from '../page/detailPage/Detail';
import HomePage from '../page/homePage/HomePage';
import ListPage from '../page/listPage/ListPage.jsx';
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
        element: <ListPage />,
      },
      {
        path: '/write-page',
        element: <WritePage />,
      },
    ],
  },
]);

export default Router;
