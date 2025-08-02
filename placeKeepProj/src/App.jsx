import { useRef, useState } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';

function App() {
  const modal = useRef();
  const selectedPlace = useRef();
  const [pickedPlaces, setPickedPlaces] = useState([]);
  const [modalKey, setModalKey] = useState(0); // force reset component on reopen

  function handleStartRemovePlace(id) {
    selectedPlace.current = id;
    setModalKey(prev => prev + 1); // reset progress bar
    modal.current.open();
  }

  function handleStopRemovePlace() {
    selectedPlace.current = null;
    modal.current.close();
  }

  function handleRemovePlace() {
    setPickedPlaces(prev =>
      prev.filter((place) => place.id !== selectedPlace.current)
    );
    handleStopRemovePlace();
  }

  function handleSelectPlace(id) {
    setPickedPlaces(prev => {
      if (prev.some((place) => place.id === id)) return prev;
      const place = AVAILABLE_PLACES.find((p) => p.id === id);
      return [place, ...prev];
    });
  }

  return (
    <>
      <Modal ref={modal}>
        <DeleteConfirmation
          key={modalKey}
          timeout={3000}
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={AVAILABLE_PLACES}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
