import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UsuarioProvider } from '../providers/usuario-provider';
import { InicioScreen } from '../screens/inicio';
import { SobreScreen } from '../screens/sobre';
import { HomeScreen } from '../screens/home';
import { NavegacaoPeriodoFaseScreen } from './periodoFases';
import { NavegacaoAliviarDorScreen } from './aliviarDor';
import { NavegacaoPosicaoParirScreen } from './posicaoParir';
import { NavegacaoCuidadosPosPartoScreen } from './cuidadosPosParto';
import { NavegacaoMamadasIniciaisScreen } from './mamadasIniciais';

const Stack = createStackNavigator();

export type NavegacaoParamsPrincipal = {
   inicio: any;
   sobre: any;
   home: { type_id: any, type: any }
}

const Tab = createStackNavigator<NavegacaoParamsPrincipal>();
export function NavegacaoPrincipal() {

   return (
      <UsuarioProvider>
         <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
               <Stack.Screen name="inicio" component={InicioScreen} />
               <Stack.Screen name="sobre" component={SobreScreen} />
               <Stack.Screen name="home" component={HomeScreen} />
               <Stack.Screen name="periodoFases" component={NavegacaoPeriodoFaseScreen} />
               <Stack.Screen name="aliviarDor" component={NavegacaoAliviarDorScreen} />
               <Stack.Screen name="posicaoParir" component={NavegacaoPosicaoParirScreen} />
               <Stack.Screen name="cuidadosPosParto" component={NavegacaoCuidadosPosPartoScreen} />
               <Stack.Screen name="mamadasIniciais" component={NavegacaoMamadasIniciaisScreen} />
            </Stack.Navigator>
         </NavigationContainer>
      </UsuarioProvider>
   )
}