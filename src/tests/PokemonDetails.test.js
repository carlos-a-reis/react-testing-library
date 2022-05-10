import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente PokemonDetails', () => {
  test('Testa se as informações detalhadas do pokemon são exibidas na tela', () => {
    const POKEMONRESUME = 'This intelligent Pokémon roasts hard berries'
    + ' with electricity to make them tender enough to eat.';

    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);

    const titleDetails = screen.getByRole('heading',
      { name: /pikachu details/i, level: 2 });
    const summary = screen.getByRole('heading', { name: /summary/i, level: 2 });
    const resume = screen.getByText(POKEMONRESUME);

    expect(titleDetails).toBeInTheDocument();
    expect(linkDetails).not.toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(resume).toBeInTheDocument();
  });

  test('Testa se existe na página os mapas das localizações do pokemon', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);

    const titleLocation = screen.getByRole('heading',
      { name: /Game Locations of Pikachu/i, level: 2 });
    const imgLocations = screen.getAllByRole('img', { name: /pikachu location/i });
    const locationName1 = screen.getByText('Kanto Viridian Forest');
    const locationName2 = screen.getByText('Kanto Power Plant');

    expect(titleLocation).toBeInTheDocument();
    expect(imgLocations[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imgLocations[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(locationName1).toBeInTheDocument();
    expect(locationName2).toBeInTheDocument();
  });

  test('Testa se o pokemon pode ser favoritado pela página de detalhes', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);

    const addFavorite = screen.getByRole('checkbox');
    const checkboxLabel = screen.getByLabelText(/Pokémon favoritado?/i);

    expect(addFavorite).toBeInTheDocument();
    expect(checkboxLabel).toBeInTheDocument();
  });

  test('Testa se os cliques no checkbox adicionam'
  + ' e removem o pokemon dos favoritos', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);

    const pokemonName = screen.getByTestId('pokemon-name');

    const addFavorite = screen.getByRole('checkbox');
    userEvent.click(addFavorite);
    const favoritePage = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoritePage);

    const pokemonFavoriteName = screen.getByTestId('pokemon-name');

    expect(pokemonFavoriteName.innerHTML).toBe(pokemonName.innerHTML);
  });
});
