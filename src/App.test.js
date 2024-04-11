import { render, screen } from '@testing-library/react';
import App from './App';
import { store } from 'utils/store';
import { Provider } from 'react-redux';

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

test('renders auth page by default', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = screen.getByAltText('Logo');
  expect(linkElement).toBeInTheDocument();
});
