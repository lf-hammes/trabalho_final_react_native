import Ionicons from "@expo/vector-icons/Ionicons";
import { useContext, useEffect, useState } from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AxiosInstance from "../../api/AxiosInstance";
import { DataContext } from "../../context/DataContext";
import {
  increment,
  incrementCart,
} from "../../services/DataServices";
import { FavCartContext } from "../../context/FavCartContext";

export function Livro({ route }) {
  const { dadosUsuario } = useContext(DataContext);
  const [livro, setLivro] = useState(null);
  const idLivro = route.params?.idLivro;
  const [isLoading, setIsLoading] = useState(true);
  const { getFavoritos, getCarrinho } = useContext(FavCartContext);

  async function getLivros() {
    try {
      const newLivro = await AxiosInstance.get(`/livros/${idLivro}`, {
        headers: { Authorization: `Bearer ${dadosUsuario?.token}` },
      });
      setLivro(newLivro.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getLivros();
  }, []);

  async function atualizar(key) {
      await increment(key, idLivro);
      getFavoritos();
  }

  async function carrinho() {
    await incrementCart('cart', idLivro);
    getCarrinho();
  }

  return (
    <>
      <View style={styles.container}>
        <StatusBar />
        {isLoading ? (
          <Text style={styles.loading}>Loading...</Text>
        ) : (
          <>
            <Image
              source={{ uri: `data:image/png;base64,${livro.img}` }}
              style={styles.image}
            />
            <Text style={styles.info}>Livro: {livro.nomeLivro}</Text>
            <Text style={styles.info}>Autor: {livro.autorDTO.nomeAutor}</Text>
            <Text style={styles.info}>
              Editora: {livro.editoraDTO.nomeEditora}
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button}
              onPress={carrinho}>
                <Ionicons
                  name="cart-outline"
                  size={30}
                  style={{ color: "black" }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => atualizar('fav')}
              >
                <Ionicons name='heart-outline' size={30} style={{ color: "black" }} />
              </TouchableOpacity>
            </View>
          </>
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
    height: "100%",
    paddingTop: 20
  },
  info: {
    color: "#fcbc5c",
    fontSize: 20,
    marginHorizontal: 10,
    textAlign: "center",
  },
  image: {
    width: 231,
    height: 350,
    marginVertical: 10,
  },
  loading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fcbc5c",
    marginHorizontal: 10,
    marginVertical: 200,
  },
  buttonContainer: {
    width: "50%",
    height: 50,
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  button: {
    width: "40%",
    height: "100%",
    backgroundColor: "#a47b3d",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
