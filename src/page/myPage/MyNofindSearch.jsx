function MyNotFindSearch() {
  return (
    <div className="flex w-full mx-auto justify-center py-20">
      <div className="flex flex-col justify-center items-center">
        <img
          src="/images/group.png"
          alt="리스트가 없을 떄 보여지는 이미지"
          className={'w-[500px]'}
        />
        <div className="w-full text-center py-10 text-3xl text-secondary">
          작성된 글이 없습니다!
        </div>
      </div>
    </div>
  );
}

export default MyNotFindSearch;
