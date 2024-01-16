import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key, // return the key itself as the translation
    i18n: { changeLanguage: jest.fn() },
  }),
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn(),
  },
}));

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText("LOG IN");
  expect(linkElement).toBeInTheDocument();
});
