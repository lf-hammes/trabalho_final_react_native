import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import "react-native-gesture-handler";
import { FavCartContext } from "../context/FavCartContext";
import { Carrinho } from "../pages/Carrinho";
import { Favoritos } from "../pages/Favoritos";
import { Login } from "../pages/Login";
import { Search } from "../pages/Search";
import StackHome from "./StackHome";
import { useContext } from "react";
import { useEffect } from "react";

const Tab = createBottomTabNavigator();

const TabHome = () => {
  const { favoritos, getFavoritos, carrinho, getCarrinho } = useContext(FavCartContext);

  useEffect(()=> {
    getFavoritos();
    getCarrinho();
  }, [])

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "rgba(43, 51, 65, 1)",
        },
        tabBarShowLabel: false,
        headerTintColor: "#fcbc5c",
        headerStyle: {
          backgroundColor: "rgba(43, 51, 65, 1)",
        },
      }}
    >
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          tabBarStyle: {
            display: "none",
          },
          tabBarIcon: () => {
            return (
              <Ionicons name="log-out" size={30} style={{ color: "#fcbc5c" }} />
            );
          },
        }}
      />
      <Tab.Screen
        name="HomeStack"
        component={StackHome}
        options={{
          tabBarIcon: () => {
            return (
              <Ionicons name="home" size={30} style={{ color: "#fcbc5c" }} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Procura"
        component={Search}
        options={{
          tabBarIcon: () => {
            return (
              <Ionicons name="search" size={30} style={{ color: "#fcbc5c" }} />
            );
          },
          tabBarHideOnKeyboard: true,
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={Favoritos}
        options={{
          tabBarIcon: () => {
            return (
              <Ionicons name="heart" size={30} style={{ color: "#fcbc5c" }} />
            );
          },
          tabBarBadge: favoritos.length,
        }}
      />
      <Tab.Screen
        name="Carrinho"
        component={Carrinho}
        options={{
          tabBarIcon: () => {
            return (
              <Ionicons name="cart" size={30} style={{ color: "#fcbc5c" }} />
            );
          },
          tabBarBadge: carrinho,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabHome;
