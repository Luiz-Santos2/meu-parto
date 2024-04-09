import { createStackNavigator } from "@react-navigation/stack";
import { MamadasIniciaisScreen } from "../screens/mamadasInicias";
import { DetalheUmMamadasIniciaisScreen } from "../screens/mamadasInicias/detalheUm";
import { DetalheDoisMamadasIniciaisScreen } from "../screens/mamadasInicias/detalheDois";

export type MamadasIniciaisParams = {
    MamadasIniciais: any,
    DetalheUmMamadasIniciais: {item_id: any},
    DetalheDoisMamadasIniciais: {item_id: any},
}

const Stack = createStackNavigator<MamadasIniciaisParams>();

export const NavegacaoMamadasIniciaisScreen = () => {
   return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
         <Stack.Screen name="MamadasIniciais" component={MamadasIniciaisScreen} />
         <Stack.Screen name="DetalheUmMamadasIniciais" component={DetalheUmMamadasIniciaisScreen} />
         <Stack.Screen name="DetalheDoisMamadasIniciais" component={DetalheDoisMamadasIniciaisScreen} />
      </Stack.Navigator>
   )
}