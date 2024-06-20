import { BeatLoader } from 'react-spinners';

function Spinner() {
  return (
    <div className="mt-10 z-[999] flex items-center justify-center">
      <BeatLoader />
    </div>
  );
}

export default Spinner;