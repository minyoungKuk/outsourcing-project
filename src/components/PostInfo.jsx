import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Likes from '../components/Likes';
import ReviewContent from './ReviewContent';

const PostInfo = ({ post }) => {
  return (
    <>
      <div className="flex justify-center items-end mb-6 gap-3">
        <div className="flex gap-5">
          <img className="w-5" src="/public/images/pointer.png" alt="pin-img" />
          {!post?.placeName || (
            <h1 className="text-2xl font-bold">{post?.placeName}</h1>
          )}
        </div>
        <p className="text-gray-600">{post?.address}</p>
      </div>

      <div className="mx-auto mb-6 border-none flex justify-center">
        <img src={post?.img_url} alt="review-pics" />
      </div>

      <div className="text-base	mb-6 flex items-center justify-between p-8">
        <div className="text-base flex items-center">
          <img
            src="src/assets/images/my_profile.png"
            alt="User"
            className="w-10 h-10 rounded-full mr-4"
          />
          <p>사용자1</p>
        </div>
        <Likes id="user1" initialLiked={false} />
      </div>
      <ReviewContent post={post} />
    </>
  );
};

export default PostInfo;
