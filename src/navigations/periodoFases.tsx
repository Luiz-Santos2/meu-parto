import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/home";
import { PeriodoFasesScreen } from "../screens/menuPeriodoFases";

const Stack = createStackNavigator();
export const NavegacaoPeriodoFaseScreen = () => {
   return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
         <Stack.Screen name="PeriodoFases" component={PeriodoFasesScreen} />
      </Stack.Navigator>
   )
}