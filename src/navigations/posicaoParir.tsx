import { createStackNavigator } from "@react-navigation/stack";
import { PosicaoParirScreen } from "../screens/PosicaoParir";

export type PosicaoParirParams = {
    PosicaoParir: any,
}

const Stack = createStackNavigator<PosicaoParirParams>();

export const NavegacaoPosicaoParirScreen = () => {
   return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
         <Stack.Screen name="PosicaoParir" component={PosicaoParirScreen} />
      </Stack.Navigator>
   )
}