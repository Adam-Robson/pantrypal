import { useGoogleContext } from '../context/GoogleContext';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import useMapUtils from '../hooks/useMapUtils';

export default function CardArrows() {
  const { setFocus } = useMapUtils();
  const { activeMarkerId, setActiveMarkerId, organizations } = useGoogleContext();

  function handleNextClick() {
    let nextMarkerId = null;
    if (activeMarkerId === organizations.length - 1) {
      nextMarkerId = 0;
    } else {
      nextMarkerId = activeMarkerId + 1;
    }

    setActiveMarkerId(nextMarkerId);
    setFocus(organizations[nextMarkerId].position);
  }

  function handlePreviousClick() {
    let nextMarkerId = null;
    if (activeMarkerId === 0) {
      nextMarkerId = organizations.length - 1;
    } else {
      nextMarkerId = activeMarkerId - 1;
    }

    setActiveMarkerId(nextMarkerId);
    setFocus(organizations[nextMarkerId].position);
  }

  return (
    <>
      {
        organizations.length > 1 && (
          <div className="container w-full">
            <div className="absolute left-2" onClick={handlePreviousClick}>
              <FiChevronLeft />
            </div>
            <div className="absolute right-2" onClick={handleNextClick}>
              <FiChevronRight />
            </div>
          </div>
        )
      }
    </>
  );
}
