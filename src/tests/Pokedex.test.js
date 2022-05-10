import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente Pokedex', () => {
  test('Testa se a página contém um h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const title = screen.getByRole('heading',
      { name: /encountered pokémons/i, level: 2 });

    expect(title).toBeInTheDocument();
  });
  test('Testa se o botão contém o texto "Próximo pokémon"', () => {
    renderWithRouter(<App />);

    const buttonNext = screen.getByRole('button', { name: /Próximo pokémon/i });

    expect(buttonNext).toBeInTheDocument();
  });
  test('Testa a funcionalidade do botão', () => {
    renderWithRouter(<App />);

    const testPokemon = 'pokemon-name';
    let pokemonName = screen.getByTestId(testPokemon).innerHTML;

    expect(pokemonName).toBe('Pikachu');
    const buttonNext = screen.getByRole('button', { name: /Próximo pokémon/i });

    userEvent.click(buttonNext);
    pokemonName = screen.getByTestId(testPokemon).innerHTML;
    expect(pokemonName).toBe('Charmander');

    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    pokemonName = screen.getByTestId(testPokemon).innerHTML;

    expect(pokemonName).toBe('Pikachu');
    expect(buttonNext).toBeInTheDocument();
  });
  test('Testa se existe um botão de filtro para cada tipo de pokemon', () => {
    renderWithRouter(<App />);

    const typeId = 'pokemon-type';
    const allFilter = screen.getByRole('button', { name: /all/i });
    expect(allFilter).toBeInTheDocument();

    const buttonType = screen.getAllByTestId('pokemon-type-button');
    userEvent.click(buttonType[0]);
    let pokemonType = screen.getByTestId(typeId).innerHTML;
    expect(buttonType[0].innerHTML).toBe('Electric');
    expect(pokemonType).toBe('Electric');
    expect(allFilter).toBeInTheDocument();

    userEvent.click(buttonType[1]);
    pokemonType = screen.getByTestId(typeId).innerHTML;
    expect(buttonType[1].innerHTML).toBe('Fire');
    expect(pokemonType).toBe('Fire');
    expect(allFilter).toBeInTheDocument();

    userEvent.click(buttonType[2]);
    pokemonType = screen.getByTestId(typeId).innerHTML;
    expect(buttonType[2].innerHTML).toBe('Bug');
    expect(pokemonType).toBe('Bug');
    expect(allFilter).toBeInTheDocument();

    userEvent.click(buttonType[3]);
    pokemonType = screen.getByTestId(typeId).innerHTML;
    expect(buttonType[3].innerHTML).toBe('Poison');
    expect(pokemonType).toBe('Poison');
    expect(allFilter).toBeInTheDocument();

    userEvent.click(buttonType[4]);
    pokemonType = screen.getByTestId(typeId).innerHTML;
    expect(buttonType[4].innerHTML).toBe('Psychic');
    expect(pokemonType).toBe('Psychic');
    expect(allFilter).toBeInTheDocument();

    userEvent.click(buttonType[5]);
    pokemonType = screen.getByTestId(typeId).innerHTML;
    expect(buttonType[5].innerHTML).toBe('Normal');
    expect(pokemonType).toBe('Normal');
    expect(allFilter).toBeInTheDocument();

    userEvent.click(buttonType[6]);
    pokemonType = screen.getByTestId(typeId).innerHTML;
    expect(buttonType[6].innerHTML).toBe('Dragon');
    expect(pokemonType).toBe('Dragon');
    expect(allFilter).toBeInTheDocument();
  });
  test('Testa o botão de filtro "All', () => {
    renderWithRouter(<App />);

    const allFilter = screen.getByRole('button', { name: /all/i });
    expect(allFilter).toBeInTheDocument();

    userEvent.click(allFilter);
    const firstPokemon = screen.getByTestId('pokemon-name').innerHTML;
    expect(firstPokemon).toBe('Pikachu');
    const buttonNext = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(buttonNext.disabled).toBe(false);
  });
});
