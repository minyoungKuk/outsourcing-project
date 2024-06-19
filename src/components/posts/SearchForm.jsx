import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';

function SearchForm({ handleSearch, searchQuery, setSearchQuery, inputRef }) {

  const defaultRef = useRef("");
  const ref = inputRef || defaultRef;

  return (
    <form
      onSubmit={handleSearch}
      className="relative w-9/12 my-10 mx-auto h-14 drop-shadow-lg flex items-center"
    >
      <input
        ref={ref}
        className="w-full h-14 bg-white rounded-3xl pl-4 pr-14 drop-shadow"
        placeholder="키워드를 입력해주세요."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        type="submit"
        className="absolute right-4 w-10 h-10 rounded-full flex items-center justify-center"
      >
        <FontAwesomeIcon icon={faSearch} className="text-black/50" />
      </button>
    </form>
  );
}

export default SearchForm;
