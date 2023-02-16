import React from 'react';

function Modal(props) {
  function closeModal() {
    props.closeModal();
  }

  return (
    <div className="Modal" onClick={closeModal}>
      <div className="modalBody" onClick={(e) => e.stopPropagation()}>
        <button id="modalCloseBtn" onClick={closeModal}>
          ✖
        </button>
        <p>안녕제발</p>
      </div>
    </div>
  );
}

export default Modal;
