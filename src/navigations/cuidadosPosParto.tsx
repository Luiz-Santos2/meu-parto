import { createStackNavigator } from "@react-navigation/stack";
import { CuidadosPosPartoScreen } from "../screens/cuidadosPosParto";

export type CuidadosPosPartoParams = {
    CuidadosPosParto: any,
}

const Stack = createStackNavigator<CuidadosPosPartoParams>();

export const NavegacaoCuidadosPosPartoScreen = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="CuidadosPosParto" component={CuidadosPosPartoScreen} />
        </Stack.Navigator>
    )
}