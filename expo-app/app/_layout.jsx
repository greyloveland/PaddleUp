import { Stack } from "expo-router";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider } from 'react-redux';
import { store } from '@/state/store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Stack />
      </PaperProvider>
    </Provider>
  );
}
