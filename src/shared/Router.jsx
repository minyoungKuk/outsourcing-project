import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../component/Layout';
import Home from '../page/Home';
import Detail from '../page/Detail';
import EditProfile from '../page/EditProfile';
import List from '../page/List';
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
