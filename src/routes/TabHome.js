import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../pages/Home";
import { Search } from "../pages/Search";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Editoras } from '../pages/Editoras'
import { Editora } from '../pages/Editora'
import { Livro } from '../pages/Livro'
import { Login } from "../pages/Login";
import StackHome from "./StackHome";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const TabHome = () => {
  return (
    <NavigationContainer>
        <Tab.Navigator screenOptions={
          {
            headerShown: false,
            tabBarStyle: {
              backgroundColor: 'rgba(43, 51, 65, 1)'
            },
            tabBarShowLabel: false,
            headerTintColor: "#fcbc5c",
          }
        }>
          <Tab.Screen name="Login" component={Login} options={{
            headerShown: false,
            tabBarStyle: {
              display: 'none'
            },
            tabBarIcon: () => {
              return <Ionicons name="log-out" size={30} style={{color: '#fcbc5c'}}/>
            }
          }}/>
          <Tab.Screen name="Home" component={StackHome} options={{tabBarIcon: () => {
            return <Ionicons name="home" size={30} style={{color: '#fcbc5c'}}/>
          } }}/>
        </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabHome;
