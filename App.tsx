import { NavegacaoPrincipal } from './src/navigations';
import { initializeApp } from '@firebase/app';
import { firebaseConfig } from './src/config/firebase-config';
import { UsuarioProvider } from './src/providers/usuario-provider';

export default function App() {

  initializeApp(firebaseConfig)

  return (
      <NavegacaoPrincipal />
  );
}