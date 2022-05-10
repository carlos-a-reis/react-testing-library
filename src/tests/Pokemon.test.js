import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente Pokemon', () => {
  test('Testa se as informações do card de pokemon são exibidas corretamente', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name').innerHTML;
    const pokemonType = screen.getByTestId('pokemon-type').innerHTML;
    const pokemonWeight = screen.getByTestId('pokemon-weight').innerHTML;
    const pokemonImage = screen.getByAltText('Pikachu sprite');

    expect(pokemonName).toBe('Pikachu');
    expect(pokemonType).toBe('Electric');
    expect(pokemonWeight).toMatch('Average weight: ');
    expect(pokemonWeight).toMatch('6.0');
    expect(pokemonWeight).toMatch('kg');
    expect(pokemonImage.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Testa se o card de pokemon contém um link que leva a detalhes do pokemon', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: /more details/i });

    expect(linkDetails.href).toBe('http://localhost/pokemons/25');
  });

  test(`Testa se ao click no link a aplicação é redireicionada 
  para a página de detalhes do pokemon`, () => {
    const { history } = renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);
    const { pathname } = history.location;

    expect(pathname).toBe('/pokemons/25');
  });

  test('Testa se é exibido o incone de estrela nos pokemons favoritos', () => {
    const { history } = renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);
    const addFavorite = screen.getByRole('checkbox');
    userEvent.click(addFavorite);
    history.push('/');
    const star = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });

    expect(star.src).toBe('http://localhost/star-icon.svg');
  });
});
