import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import supabase from '../../config/supabase';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';

const MyListPage = () => {
  const [userPosts, setUserPosts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const userId = '89895a0e-d365-4995-aa96-d1b2d68d9aa9';
  const { id } = useParams();

  // 현재 경로 확인하여 클래스명 동적 할당
  const getButtonClass = (path) => {
    return location.pathname === path
      ? 'm-4 p-2 border rounded-[7px] font-bold bg-primary text-white' // 현재 페이지일 때 스타일
      : 'm-4'; // 기본 스타일
  };

  useEffect(() => {
    const fetchUserPosts = async () => {
      const { data, error } = await supabase
        .from('POST')
        .select()
        .eq('user_id', userId);
      if (error) {
        console.log(error);
      } else {
        setUserPosts(data);
      }
    };
    fetchUserPosts();
  }, [userId]);

  return (
    <>
      <div className="border border-black border-t-0 border-b-0 mr-40 ml-40 h-auto pb-40">
        <div className="flex">
          <button
            onClick={() => navigate('/my-page')}
            className={getButtonClass('/my-page')}
          >
            프로필 수정
          </button>
          <button
            onClick={() => navigate('/my-list-page')}
            className={getButtonClass('/my-list-page')}
          >
            내가 쓴 글
          </button>
          <button
            onClick={() => navigate('/my-like-page')}
            className={getButtonClass('/my-like-page')}
          >
            좋아요 한 글
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4 m-4 p-10 ">
          {userPosts.map((post) => (
            <div key={post.id} className="border p-4">
              <Link to={`/my-list-page/${post.id}`} className="font-bold">
                {post.content}
                <img src={post.img_url} alt="게시물 이미지"></img>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyListPage;
