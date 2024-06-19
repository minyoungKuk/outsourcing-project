import React from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Comments from '../../components/Comments';
import PostInfo from '../../components/PostInfo';

const Detail = () => {
  return (
    <div className="p-4 mx-auto max-w-[900px] mt-10">
      <PostInfo />
      <Comments />
      <div className="mb-6">
        <h2 className="text-xl font-bold">지도</h2>
        <Map
          center={{ lat: 37.5662952, lng: 126.9779451 }}
          style={{ width: '100%', height: '400px' }}
        >
          <MapMarker
            position={{ lat: 37.5662952, lng: 126.9779451 }}
          ></MapMarker>
        </Map>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold">이 곳의 다른 리뷰</h2>
        <div className="flex space-x-4 overflow-x-auto">
          <img
            src="path_to_other_review_image1.jpg"
            alt="Other Review"
            className="w-48 h-32"
          />
          <img
            src="path_to_other_review_image2.jpg"
            alt="Other Review"
            className="w-48 h-32"
          />
          <img
            src="path_to_other_review_image3.jpg"
            alt="Other Review"
            className="w-48 h-32"
          />
        </div>
      </div>
    </div>
  );
};

export default Detail;
