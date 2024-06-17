import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Layout from '../component/Layout';
import Home from '../page/Home';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
