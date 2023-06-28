import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Search } from "../pages/Search";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Login } from "../pages/Login";
import StackHome from "./StackHome";
import { NavigationContainer } from "@react-navigation/native";
import { Favoritos } from "../pages/Favoritos";
import { Carrinho } from "../pages/Carrinho";

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
            headerStyle: {
              backgroundColor: 'rgba(43, 51, 65, 1)'
            }
          }
        }>
          <Tab.Screen name="Login" component={Login} options={{
            headerShown: false,
            tabBarStyle: {
              display: 'none'
            },
            tabBarIcon: () => {
              return <Ionicons name="log-out" size={30} style={{color: '#fcbc5c'}}/>
            },
          }}/>
          <Tab.Screen name="HomeStack" component={StackHome} options={{tabBarIcon: () => {
            return <Ionicons name="home" size={30} style={{color: '#fcbc5c'}}/>
          } }}/>
          <Tab.Screen name="Procura" component={Search} options={{tabBarIcon: () => {
            return <Ionicons name="search" size={30} style={{color: '#fcbc5c'}}/>
          }, tabBarHideOnKeyboard: true  }}/>
          <Tab.Screen name="Favoritos" component={Favoritos} options={{tabBarIcon: () => {
            return <Ionicons name="heart" size={30} style={{color: '#fcbc5c'}}/>
          },  }}/>
          <Tab.Screen name="Carrinho" component={Carrinho} options={{tabBarIcon: () => {
            return <Ionicons name="cart" size={30} style={{color: '#fcbc5c'}}/>
          },  }}/>
        </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabHome;
