import React from 'react';

const Comments = () => {
  return (
    <>
      <form className="bg-white w-full mb-6">
        <h2 className="text-xl font-bold mb-4">리뷰</h2>
        <div className="mb-4">
          <textarea
            id="comment"
            name="comment"
            rows="4"
            className="border border-secondary px-3 py-2 w-full resize-none focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>
        <button
          type="submit"
          className="text-xs hover:border-primary hover:bg-primary hover:text-white text-secondary border border-secondary font-bold py-2 px-4"
        >
          작성
        </button>
      </form>
    </>
  );
};

export default Comments;
