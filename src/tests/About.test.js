import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente About', () => {
  test('Testa se a página contém um h2 com o texto "About Pokédex"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const titlePokedex = screen.getByRole('heading',
      { name: /about pokédex/i, level: 2 });

    expect(titlePokedex).toBeInTheDocument();
  });
  test('Testa se a página contém dois parágrafos sobre a Pokedex', () => {
    const PARAG1 = (
      'This application simulates a Pokédex,'
      + ' a digital encyclopedia containing all Pokémons');
    const PARAG2 = (
      'One can filter Pokémons by type, and see more details for each one of them');

    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const parag1 = screen.getByText(PARAG1);
    const parag2 = screen.getByText(PARAG2);

    expect(parag1).toBeInTheDocument();
    expect(parag2).toBeInTheDocument();
  });
  test('Testa se a página contém a imagem de uma Pokedex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const pokedexImg = screen.getByRole('img');

    expect(pokedexImg.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(pokedexImg.alt).toBe('Pokédex');
  });
});
