import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import AxiosInstance from "../../api/AxiosInstance";
import { DataContext } from "../../context/DataContext";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export function Editora({ route }) {
  const navigation = useNavigation();
  const { dadosUsuario } = useContext(DataContext);
  const [editora, setEditora] = useState(null);
  const idEditora = route.params?.idEditora;
  const [isLoading, setIsLoading] = useState(true);

  async function getEditora() {
    try {
      const newEditora = await AxiosInstance.get(`/editoras/${idEditora}`, {
        headers: { Authorization: `Bearer ${dadosUsuario?.token}` },
      });
      setEditora(newEditora.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getEditora();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <StatusBar />
          <View style={styles.livrosContainer}>
            {isLoading ? (
              <Text style={styles.loading}>Loading...</Text>
            ) : (
              editora.listaLivrosDTO.map((livro) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Livro", {
                        idLivro: livro.codigoLivro,
                      });
                    }}
                    key={livro.codigoLivro}
                  >
                    <View style={styles.itemLivro} >
                      <Image
                        style={styles.livro}
                        source={{
                          uri: `data:image/png;base64,${livro.imagem}`,
                        }}
                      />
                      <Text style={styles.nome}>{livro.nomeLivro}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(57,68,87,1)",
    padding: 20
  },
  livrosContainer: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  itemLivro: {
    marginVertical: 20,
    width: 150,
    height: 288,
    backgroundColor: "rgba(43, 51, 65, 1)",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  livro: {
    width: 150,
    height: 228,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  loading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fcbc5c",
    marginHorizontal: 10,
    marginVertical: 200,
  },
  nome: {
    fontSize: 15,
    color: "#fcbc5c",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});
