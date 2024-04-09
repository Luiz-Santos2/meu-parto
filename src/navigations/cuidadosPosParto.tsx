import { createStackNavigator } from "@react-navigation/stack";
import { CuidadosPosPartoScreen } from "../screens/cuidadosPosParto";
import { DetalheUmPosPartoScreen } from "../screens/cuidadosPosParto/detalheUm";
import { DetalheDoisPosPartoScreen } from "../screens/cuidadosPosParto/detalheDois";

export type CuidadosPosPartoParams = {
    CuidadosPosParto: any,
    DetalheUmCuidadosPosParto: {item_id: any},
    DetalheDoisCuidadosPosParto: {item_id: any},
}

const Stack = createStackNavigator<CuidadosPosPartoParams>();

export const NavegacaoCuidadosPosPartoScreen = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="CuidadosPosParto" component={CuidadosPosPartoScreen} />
            <Stack.Screen name="DetalheUmCuidadosPosParto" component={DetalheUmPosPartoScreen} />
            <Stack.Screen name="DetalheDoisCuidadosPosParto" component={DetalheDoisPosPartoScreen} />
        </Stack.Navigator>
    )
}