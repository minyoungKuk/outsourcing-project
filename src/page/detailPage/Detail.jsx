import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Comments from '../../components/Comments';
import Likes from '../../components/Likes';

const Detail = () => {
  return (
    <div className="p-4 mx-auto max-w-[900px] mt-10">
      <div className="flex items-end mb-6 gap-10">
        <div className="flex gap-5">
          <img className="w-5" src="/src/assets/images/pin.png" alt="pin-img" />
          <h1 className="text-2xl font-bold">방화수류정 공원</h1>
        </div>
        <p className="text-gray-600">
          경기도 수원시 장안구 어여큐 자캐구 010면 112치
        </p>
      </div>

      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        className="mx-auto mb-6 border-none"
      >
        <div>
          <img
            src="src/assets/images/665405_4101714264532_1057507630_o.jpg"
            alt="review-pics"
          />
        </div>
        <div>
          <img src="src/assets/images/IMG_0499.jpg" alt="review-pics" />
        </div>
        <div>
          <img src="src/assets/images/IMG_1532.jpg" alt="review-pics" />
        </div>
      </Carousel>

      <div className="mb-6 flex items-center p-8">
        <img
          src="src/assets/images/my_profile.png"
          alt="User"
          className="w-10 h-10 rounded-full mr-4"
        />
        <p>사용자1</p>
        <Likes id="user1" initialLiked={false} />
      </div>
      <p className="mb-6 p-8">리뷰 내용...</p>
      <div className="mb-6 flex justify-between items-center p-8">
        <p className="items-center bg-primary rounded-lg py-0.5 px-2 text-xs">
          #반려견동반
        </p>
        <div className="text-sm">
          <button className="text-gray-600 hover:text-gray-800 ml-4">
            수정
          </button>
          <button className="text-gray-600 hover:text-gray-800 ml-2">
            삭제
          </button>
        </div>
      </div>
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
