import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import AxiosInstance from "../../api/AxiosInstance";
import { DataContext } from "../../context/DataContext";
import { useNavigation } from "@react-navigation/native";
import { decrement, getValueFor } from "../../services/DataServices";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFocusEffect } from '@react-navigation/native';

export function Favoritos() {
  const navigation = useNavigation();
  const { dadosUsuario } = useContext(DataContext);
  const [favoritos, setFavoritos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const Livro = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemLivro}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Livro", { idLivro: item.codigoLivro });
          }}
        >
          <Image
            style={styles.livro}
            source={{ uri: `data:image/png;base64,${item.img}` }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{item.nomeLivro}</Text>
        <Text style={styles.text}>{item.autorDTO.nomeAutor}</Text>
      </View>
      <View style={styles.delete}>
        <TouchableOpacity
          onPress={() => {
            removerFavorito(item.codigoLivro);
          }}
        >
          <Ionicons name="trash-outline" size={25} color={"#fb3e3ec5"} />
        </TouchableOpacity>
      </View>
    </View>
  );

  async function getFavoritos() {
    let idsString = await getValueFor("fav");
    let ids = idsString != null ? JSON.parse(idsString) : [];
    let arrayLivros = [];

    for (const id of ids) {
      await AxiosInstance.get(`/livros/${id}`, {
        headers: { Authorization: `Bearer ${dadosUsuario?.token}` },
      })
        .then((response) => {
          arrayLivros.push(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setFavoritos(arrayLivros);
    setIsLoading(false);
  };

  useFocusEffect(
    React.useCallback(()=> {
        getFavoritos();
    }, [])
  );

  async function removerFavorito(id) {
    await decrement("fav", id);
    getFavoritos();
  };

  return (
    <>
      <View style={styles.container}>
        <StatusBar />
        {isLoading ? (
          <Text style={styles.loading}>Loading...</Text>
        ) : (
          <View style={styles.favoritosContainer}>
            {favoritos != null ? (
              <FlatList
                data={favoritos}
                renderItem={({ item }) => <Livro item={item} />}
              />
            ) : null}
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(57,68,87,1)",
    alignItems: "center",
  },
  favoritosContainer: {
    marginTop: 10,
    width: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 40,
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginVertical: 10,
  },
  itemLivro: {
    height: 91,
    width: 60,
  },
  livro: {
    height: 91,
    width: 60,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  info: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingLeft: 15,
    justifyContent: "space-evenly",
    width: 230,
    height: 91,
    textAlign: "center",
    backgroundColor: "rgba(43, 51, 65, 1)",
  },
  title: {
    color: "#fcbc5c",
    fontSize: 16,
  },
  text: {
    color: "white",
    fontSize: 13,
  },
  loading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fcbc5c",
    marginHorizontal: 10,
    marginVertical: 200,
  },
  delete: {
    height: 91,
    width: 30,
    backgroundColor: "rgba(43, 51, 65, 1)",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
