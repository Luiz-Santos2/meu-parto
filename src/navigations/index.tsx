import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { InicioScreen } from '../screens/inicio';

const Stack = createStackNavigator();

export type NavegacaoParamsPrincipal = {
    inicio: any;
}
 
const Tab = createStackNavigator<NavegacaoParamsPrincipal>();
export function NavegacaoPrincipal() {

   return (
      <NavigationContainer>
         <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="inicio" component={InicioScreen} />
        </Stack.Navigator>
      </NavigationContainer>
   )
}