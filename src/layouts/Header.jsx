import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import supabase from '../config/supabase';
import { useModal } from '../context/modal.context';
import useAuthStore from '../zustand/authStore';
import SignInPage from './../page/login/SignInPage';

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuthStore();
  const { open } = useModal();

  const openLogInModal = () => {
    open({
      type: 'login',
      content: <SignInPage />,
    });
  };

  const handleLogout = () => {
    open({
      type: 'confirm',
      content: '정말 로그아웃 하시겠습니까?',
      onConfirm: () => {
        logout();
      },
    });
  };

  const fetchUserProfile = async (userId) => {
    const { data: userData, error } = await supabase
      .from('user')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      throw new Error('Error fetching user profile:', error.message);
    }
    return userData;
  };

  const {
    data: profile,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['userProfile', user?.id],
    queryFn: () => fetchUserProfile(user.id),
    enabled: !!user,
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user profile</div>;
  }

  return (
    <>
      <header className="sticky top-0 w-full bg-primary py-2 px-12 flex align-center items-center justify-between text-white z-10">
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
            <Link to="/write-page" className="pr-5">
              글쓰기
            </Link>
          </li>
          <li>
            <div>
              {isAuthenticated && (
                <div
                  className="w-12 h-12 rounded-full bg-cover bg-center"
                  onClick={() => navigate('/my-page')}
                  style={{
                    backgroundImage: `url(${profile?.profile_image_url})`,
                  }}
                  alt="/images/logo.png"
                />
              )}
            </div>
          </li>
          <li>
            {isAuthenticated ? (
              <button onClick={handleLogout}>로그아웃</button>
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
