import { Link } from 'react-router-dom';

function Header() {
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
          <li className="pl-0">로그아웃</li>
        </ul>
      </header>
    </>
  );
}

export default Header;
