import { createStackNavigator } from "@react-navigation/stack";
import { PeriodoFasesScreen } from "../screens/menuPeriodoFases/index";
import { PeriodoFasesSecundariaScreen } from "../screens/menuPeriodoFases/detalhe";

export type PeriodoFaseParams = {
   PeriodoFases: any,
   DetalhesPeriodoFases: { item_id: any },
}

const Stack = createStackNavigator<PeriodoFaseParams>();

export const NavegacaoPeriodoFaseScreen = () => {
   return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
         <Stack.Screen name="PeriodoFases" component={PeriodoFasesScreen} />
         <Stack.Screen name="DetalhesPeriodoFases" component={PeriodoFasesSecundariaScreen} />
      </Stack.Navigator>
   )
}