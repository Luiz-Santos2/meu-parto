import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { InicioScreen } from '../screens/inicio';
import { SobreScreen } from '../screens/sobre';
import { UsuarioProvider } from '../providers/usuario-provider';

const Stack = createStackNavigator();

export type NavegacaoParamsPrincipal = {
    inicio: any;
}
 
const Tab = createStackNavigator<NavegacaoParamsPrincipal>();
export function NavegacaoPrincipal() {

   return (
      <UsuarioProvider>
         <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
               <Stack.Screen name="inicio" component={InicioScreen} />
               <Stack.Screen name="sobre" component={SobreScreen} />
         </Stack.Navigator>
         </NavigationContainer>
      </UsuarioProvider>
   )
}