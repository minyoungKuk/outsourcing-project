import { RouterProvider } from 'react-router-dom';
import Router from './shared/Router';

const App = () => {
  return (
    <div>
      <RouterProvider router={Router} />
    </div>
  );
};

export default App;
