import React from 'react';

function Profile() {
  const emailByLocalStorage = JSON.parse(localStorage.getItem('user')).email;
  return (
    <section>
      <h1> Página de perfil</h1>
      <p data-testid="profile-email">{emailByLocalStorage}</p>
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
