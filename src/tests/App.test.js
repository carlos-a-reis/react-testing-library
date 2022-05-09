import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente App.js', () => {
  test('Testa se o primeiro link possui o texto "Home"', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });

    expect(linkHome).toBeInTheDocument();
  });
  test('Testa se o segundo link possui o texto "About"', () => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });

    expect(linkAbout).toBeInTheDocument();
  });
  test('Testa se o terceiro link possui o texto "Favorite Pokémons"', () => {
    renderWithRouter(<App />);
    const linkFavorites = screen.getByRole('link', { name: /favorite pokémons/i });

    expect(linkFavorites).toBeInTheDocument();
  });
  test('Testa se a página inicial é renderizada ao clicar no link "Home"', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });

    userEvent.click(linkHome);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });
  test('Testa se a páginaabout é renderizada ao clicar no link "About"', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });

    userEvent.click(linkAbout);
    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });
  test('Testa se a página favoritos é renderizada ao clicar no link "Favorite Pokémons"',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkFavorites = screen.getByRole('link', { name: /favorite pokémons/i });

      userEvent.click(linkFavorites);
      const { pathname } = history.location;

      expect(pathname).toBe('/favorites');
    });
  test('Testa se a página not found é renderizada ao entrar em uma url desconhecida',
    () => {
      const { history } = renderWithRouter(<App />);

      history.push('/pagina-desconhecida');
      const notFound = screen.getByRole('heading',
        { name: /Page requested not found/i, level: 2 });

      expect(notFound).toBeInTheDocument();
    });
});
