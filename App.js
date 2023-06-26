import "react-native-gesture-handler";
import { Home } from "./src/pages/Home";
import { Login } from "./src/pages/Login";
import { DataProvider } from "./src/context/DataContext";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Editora } from "./src/pages/Editora";
import { Livro } from "./src/pages/Livro";
import { Search } from "./src/pages/Search";

const Stack = createStackNavigator();

const App = () => {
  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerStyle: {
          backgroundColor: 'rgba(43, 51, 65, 1)'
        }, headerTintColor: '#fcbc5c'}}>
          <Stack.Screen name="Login" component={Login} options = {{headerShown: false}}/>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Editora" component={Editora} />
          <Stack.Screen name="Livro" component={Livro} />
          <Stack.Screen name="Procura" component={Search} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
};

export default App;
