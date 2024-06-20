import { useNavigate } from 'react-router-dom';

const PostItem = ({ post, truncateWithEllipsis }) => {
  const navigate = useNavigate();
  return (
    <div
      key={post.id}
      className="relative h-64 bg-cover bg-center cursor-pointer"
      style={{ backgroundImage: `url(${post.imgUrl})` }}
      onClick={() => navigate(`/detail/${post.id}`)}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="flex p-4 text-left">
          <img src="/images/pointer.png" alt="pointer icon" />
          <h4 className="text-white text-xl px-3 text-left">
            {post.placeName || truncateWithEllipsis(post.address, 10)}
          </h4>
        </div>

        <div className="p-4 absolute bottom-0 text-white w-full">
          <p className="text-sm"> {truncateWithEllipsis(post.content, 40)} </p>
          <p className="pt-3 text-xs text-secondary"> more &gt; </p>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
