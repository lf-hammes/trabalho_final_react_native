import { StyleSheet, Text, View, Image, StatusBar } from "react-native";
import { useState, useContext, useEffect } from "react";
import AxiosInstance from "../../api/AxiosInstance";
import { DataContext } from "../../context/DataContext";
import { Footer } from "../../../global/Footer";

export function Livro({ route }) {
  const { dadosUsuario } = useContext(DataContext);
  const [livro, setLivro] = useState(null);
  const idLivro = route.params?.idLivro;

  async function getLivros() {
    try {
      const newLivro = await AxiosInstance.get(`/livros/${idLivro}`, {
        headers: { Authorization: `Bearer ${dadosUsuario?.token}` },
      });
      setLivro(newLivro.data);
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
        {livro != null ? (
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
        ) : (
          <Text style={styles.info}>Carregando...</Text>
        )}
      </View>
      <Footer />
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
    
  }
});
