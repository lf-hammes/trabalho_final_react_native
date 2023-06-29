import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { Editoras } from "../pages/Editoras";
import { Editora } from "../pages/Editora";
import { Livro } from "../pages/Livro";
import { Home } from "../pages/Home";
import { Livros } from "../pages/Livros";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { getValueFor } from "../services/DataServices";
import { FavCartProvider } from "../context/FavCartContext";

const Stack = createStackNavigator();

const StackHome = () => {
  return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Editoras" component={Editoras} />
        <Stack.Screen name="Editora" component={Editora} />
        <Stack.Screen name="Livro" component={Livro} />
        <Stack.Screen name="Livros" component={Livros} />
      </Stack.Navigator>
  );
};

export default StackHome;
