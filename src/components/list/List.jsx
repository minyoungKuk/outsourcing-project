import { useNavigate } from 'react-router-dom';
import PostItem from '../posts/PostItem.jsx';

function List({ postList = [] }) {
  const navigate = useNavigate();

  const moveDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  const truncateWithEllipsis = (text, maxLength) => {
    if (!text) {
      return '';
    }
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div
      className={'max-w-1080 mx-auto my-20 flex flex-wrap justify-center gap-10 h-auto'}>
      {
        postList?.map(post => {
          return <PostItem key={post.id} post={post}
                           truncateWithEllipsis={truncateWithEllipsis} />;
        })
      }
    </div>
  );
}

export default List;