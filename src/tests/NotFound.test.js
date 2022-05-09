import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente NotFound', () => {
  test('Testa se a página tem o heading com o texto "Page requested not found"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/NotFound');

    const title = screen.getByRole('heading', { level: 2 });

    expect(title).toBeInTheDocument();
    expect(title.innerHTML).toMatch('Page requested not found');
  });
  test('Testa se a página mostra a imagem', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/NotFound');

    const img = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );

    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
