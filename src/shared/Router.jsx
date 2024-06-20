import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';
import HomePage from '../page/homePage/HomePage';
import ListPage from '../page/listPage/ListPage.jsx';
import MyLikePage from '../page/myPage/MyLikePage';
import MyListPage from '../page/myPage/MyListPage';
import MyPage from '../page/myPage/MyPageEdit';
import Detail from '../page/detailPage/Detail';

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
        element: <MyPage />,
      },
      {
        path: '/my-like-page',
        element: <MyLikePage />,
      },
      {
        path: '/my-list-page',
        element: <MyListPage />,
      },
      {
        path: '/list',
        element: <ListPage />,
      },
    ],
  },
]);

export default Router;
