import { StyleSheet, Text, View, Image, StatusBar } from "react-native";
import { useState, useContext, useEffect } from "react";
import AxiosInstance from "../../api/AxiosInstance";
import { DataContext } from "../../context/DataContext";
import { Footer } from "../../../global/Footer";

export function Livro({ route }) {
  const { dadosUsuario } = useContext(DataContext);
  const [livro, setLivro] = useState(null);
  const idLivro = route.params?.idLivro;
  const [isLoading, setIsLoading] = useState(true);

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
    textAlign: "center",
    height: "100%",
  },
  info: {
    color: "#fcbc5c",
    fontSize: 20,
    marginHorizontal: 10,
  },
  image: {
    width: 231,
    height: 350,
    marginVertical: 50,
  },
  loading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fcbc5c",
    marginHorizontal: 10,
    marginVertical: 200,
  }
});
