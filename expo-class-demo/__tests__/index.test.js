import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useRouter } from 'expo-router';
import SignInScreen from '../app/index';

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

describe('SignInScreen', () => {
  let mockRouter;

  beforeEach(() => {
    jest.useFakeTimers();
    mockRouter = { push: jest.fn() };
    useRouter.mockReturnValue(mockRouter);
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders correctly', () => {
    const { getByText } = render(<SignInScreen />);
    expect(getByText('Welcome')).toBeTruthy();
    expect(getByText('Sign In')).toBeTruthy();
  });

  it('navigates to SubmitForm on sign in button press', async () => {
    const { getByText } = render(<SignInScreen />);
    const signInButton = getByText('Sign In');

    fireEvent.press(signInButton);

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/SubmitForm');
    });
  });
});
