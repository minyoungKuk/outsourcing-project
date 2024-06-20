function Categories({ categoryList, setCategoryList }) {

  const toggleSelect = (id) => {
    setCategoryList(categoryList?.map(tag => {
      if (tag.id === id) {
        tag.isSelect = !tag.isSelect;
      }
      return tag;
    }));
  };

  return (
    <div className={'flex gap-3 mx-auto'}>
      {
        categoryList?.map(tag => {
          return (
            <div key={tag.id}
                 className={`transition-transform  hover:scale-105 h-9 w-28 rounded-2xl cursor-pointer ${tag.isSelect
                   ? 'bg-[#2CC4F6]' : 'bg-neutral-400 '}`}
                 onClick={() => toggleSelect(tag.id)}>
              <p
                className={`text-xl font-sans not-italic font-normal leading-6 text-center pt-1 text-white`}>{tag.data}</p>
            </div>);
        })
      }
    </div>
  );
}

export default Categories;