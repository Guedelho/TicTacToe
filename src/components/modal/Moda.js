import React from 'react';

import './Modal.css';

const onSubmitPlayerName = (e) => {
  e.preventDefault();
  e.target.parentElement.classList.add("hide");
};

const Modal = ({title, name, playerName, onChangePlayerName}) => (
  <div className="Modal">
    <form className="content" onSubmit={onSubmitPlayerName}>
      <h3>{title}</h3>
      <input name={name} minLength="2" maxLength="8" value={playerName} onChange={onChangePlayerName} required/>
      <button type="submit">Continuar</button>
    </form>
  </div>
);

export default Modal;
