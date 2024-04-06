import { createStackNavigator } from "@react-navigation/stack";
import { AliviarDorScreen } from "../screens/aliviarDor/index";
import { AliviarDorSecundariaScreen } from "../screens/aliviarDor/detalhe";

export type AliviarDorParams = {
    AliviarDor: any,
    DetalhesAliviarDor: { item_id: any },
}

const Stack = createStackNavigator<AliviarDorParams>();

export const NavegacaoAliviarDorScreen = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AliviarDor" component={AliviarDorScreen} />
            <Stack.Screen name="DetalhesAliviarDor" component={AliviarDorSecundariaScreen} />
        </Stack.Navigator>
    )
}