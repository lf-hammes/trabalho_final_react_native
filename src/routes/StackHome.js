import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { Editoras } from "../pages/Editoras";
import { Editora } from "../pages/Editora";
import { Livro } from "../pages/Livro";
import { Home } from "../pages/Home";

const Stack = createStackNavigator();

const StackHome = () => {
  return (
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "rgba(43, 51, 65, 1)",
            },
            headerTintColor: "#fcbc5c",
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Editoras" component={Editoras}/>
          <Stack.Screen name="Editora" component={Editora}/>
          <Stack.Screen name="Livro" component={Livro}/>
        </Stack.Navigator>
  );
};

export default StackHome;