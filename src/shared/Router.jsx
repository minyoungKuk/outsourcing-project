import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';
import HomePage from '../page/homePage/HomePage';
<<<<<<< HEAD
import Detail from '../page/detailPage/Detail';
=======
import ListPage from '../page/listPage/ListPage.jsx';
>>>>>>> 69013a5d0c64a08c27c7330c2c23c154f128643e
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
