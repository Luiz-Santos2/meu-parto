import { createStackNavigator } from "@react-navigation/stack";
import { MamadasIniciaisScreen } from "../screens/mamadasInicias";

export type MamadasIniciaisParams = {
    MamadasIniciais: any,
}

const Stack = createStackNavigator<MamadasIniciaisParams>();

export const NavegacaoMamadasIniciaisScreen = () => {
   return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
         <Stack.Screen name="MamadasIniciais" component={MamadasIniciaisScreen} />
      </Stack.Navigator>
   )
}