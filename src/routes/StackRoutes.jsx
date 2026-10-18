// Arquivo responsável por registrar e configurar as rotas do projeto
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import Product from "../screens/Product";

const Stack = createNativeStackNavigator();

export function StackRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      // initialRouteName="product"
    >
      <Stack.Screen 
        name="home" 
        component={Home} />
      <Stack.Screen
        name="product"
        component={Product}
        options={{
          headerShown: true,
          headerTitle: "Listagem de Produtos",
        }}
      />
    </Stack.Navigator>
  );
}
