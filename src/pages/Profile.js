import React, { useContext } from 'react';
import { Context } from '../context/Context';

function Profile() {
  const { email } = useContext(Context);
  return (
    <section>
      <h1> Página de perfil</h1>
      <p data-testid="profile-email">{email}</p>
      <button
        type="button"
        data-testid="profile-done-btn"
      >
        Receitas Feitas

      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
      >
        Receitas Favoritas

      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
      >
        Sair

      </button>
    </section>
  );
}

export default Profile;
