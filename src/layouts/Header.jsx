import { Link } from 'react-router-dom';
import { useModal } from '../context/modal.context';
import useAuthStore from '../zustand/authStore';
import SignInPage from './../page/login/SignInPage';

function Header() {
  const { open } = useModal();
  const openLogInModal = () => {
    open({
      type: 'login',
      content: <SignInPage />,
    });
  };
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <>
      <header className="sticky top-0 w-full bg-primary py-2 px-12 flex align-center items-center justify-between text-white">
        <Link to="/" className="flex cursor-pointer items-center">
          <img src="/images/logo.png" alt="GILDONGMU logo" />
          <h1 className="text-xl pl-2"> GILDONGMU </h1>
        </Link>

        <ul className="flex items-center space-x-5 *:cursor-pointer">
          <li>
            <Link to="/list" className="pr-5">
              산책리스트
            </Link>
          </li>
          <li>
            <Link to="/write" className="pr-5">
              글쓰기
            </Link>
          </li>
          <li className="pr-0">
            <div>
              <img
                className="w-12 h-12 rounded-full bg-danger"
                src="/images/logo.png"
                alt="user profile"
              />
            </div>
          </li>
          <li className="pl-0">
            {isAuthenticated ? (
              <button onClick={logout}>로그아웃</button>
            ) : (
              <button onClick={openLogInModal}>로그인</button>
            )}
          </li>
        </ul>
      </header>
    </>
  );
}

export default Header;
