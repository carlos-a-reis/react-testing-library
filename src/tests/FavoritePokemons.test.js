import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente FavoritePokemons', () => {
  test(`Testa se é exibido "No favorite pokemon found"
      caso não haja pokemons favoritos`, () => {
    const NOFAVORITEMSG = 'No favorite pokemon found';

    const { history } = renderWithRouter(<App />);
    history.push('/favorites');

    const noFavorite = screen.getByText(NOFAVORITEMSG);

    expect(noFavorite).toBeInTheDocument();
  });
  test('Testa se todos os cards de pokemons favoritos são exibidos', () => {
    const { history } = renderWithRouter(<App />);

    const pokemonID = screen.getByTestId('pokemon-name').innerHTML;
    const pokemonLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pokemonLink);
    const addFavorite = screen.getByRole('checkbox');
    userEvent.click(addFavorite);
    history.push('/favorites');
    const pokemonFavorite = screen.getByTestId('pokemon-name');

    expect(pokemonFavorite).toHaveTextContent(pokemonID);
  });
});
