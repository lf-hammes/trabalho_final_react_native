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
import {
  removeItenCart,
  decrementCart,
  incrementCart,
  getValueFor,
  deleteValueFor,
} from "../../services/DataServices";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";

export function Carrinho() {
  const navigation = useNavigation();
  const { dadosUsuario } = useContext(DataContext);
  const [carrinho, setCarrinho] = useState([]);
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
        <Text style={styles.text}>Quantidade: {item.qtd}</Text>
      </View>
      <View style={styles.delete}>
        <TouchableOpacity
          onPress={() => {
            removerItem(item.codigoLivro);
          }}
        >
          <Ionicons name="trash-outline" size={25} color={"#fb3e3ec5"} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            incrementarItem(item.codigoLivro);
          }}
        >
          <Ionicons name="add-circle" size={25} color={"#fcbc5c"} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            decrementarItem(item.codigoLivro);
          }}
        >
          <Ionicons name="remove-circle" size={25} color={"#fcbc5c"} />
        </TouchableOpacity>
      </View>
    </View>
  );

  async function removerItem(id) {
    await removeItenCart("cart", id);
    getCarrinho();
  }
  async function incrementarItem(id) {
    await incrementCart("cart", id);
    getCarrinho();
  }
  async function decrementarItem(id) {
    await decrementCart("cart", id);
    getCarrinho();
  }
  async function finalizar() {
    await deleteValueFor('cart');
    navigation.navigate('Home');
  }

  async function deletar() {
    await deleteValueFor('cart');
    getCarrinho();
  }

  async function getCarrinho() {
    let carrinhoString = await getValueFor("cart");
    let cart = carrinhoString != null ? JSON.parse(carrinhoString) : [];
    let arrayLivros = [];

    for (const item of cart) {
      await AxiosInstance.get(`/livros/${item.id}`, {
        headers: { Authorization: `Bearer ${dadosUsuario?.token}` },
      })
        .then((response) => {
          arrayLivros.push({ ...response.data, qtd: item.qtd });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setCarrinho(arrayLivros);
    setIsLoading(false);
  }

  useFocusEffect(
    React.useCallback(() => {
      getCarrinho();
    }, [])
  );

  return (
    <>
      <View style={styles.container}>
        <StatusBar />
        {isLoading ? (
          <Text style={styles.loading}>Loading...</Text>
        ) : (
          <View style={styles.favoritosContainer}>
            {carrinho.length !== 0 ? (
              <>
                <FlatList
                  data={carrinho}
                  renderItem={({ item }) => <Livro item={item} />}
                />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={{ margin: 10 }} onPress={finalizar}>
                    <Ionicons name="checkbox" size={50} color={"#18b4009b"} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ margin: 10 }} onPress={deletar}>
                    <Ionicons name="trash" size={50} color={"#fb3e3ec5"} />
                  </TouchableOpacity>
                </View>
              </>
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
    justifyContent: "center",
    marginBottom: 40,
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginVertical: 10,
  },
  itemLivro: {
    width: 110,
    height: 167,
  },
  livro: {
    height: 167,
    width: 110,
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
    height: 167,
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
    height: 167,
    width: 30,
    backgroundColor: "rgba(43, 51, 65, 1)",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "space-around",
  },
  buttonContainer: {
    width: '100%',
    height: 70,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
