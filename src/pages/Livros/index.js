import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    StatusBar,
    FlatList,
  } from "react-native";
  import { useState, useContext, useEffect } from "react";
  import AxiosInstance from "../../api/AxiosInstance";
  import { DataContext } from "../../context/DataContext";
  import { ScrollView } from "react-native-gesture-handler";
  import { useNavigation } from "@react-navigation/native";
  import { Header } from "../../../global/Header";
  import { Footer } from "../../../global/Footer";
  
  export function Livros() {
    const navigation = useNavigation();
    const { dadosUsuario } = useContext(DataContext);
    const [livros, setLivros] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
      
    async function getLivros() {
      await AxiosInstance.get(
        "\livros",
        {
            headers: {Authorization:`Bearer ${dadosUsuario?.token}`}
        }
      ).then((response)=>{
        setLivros(response.data);
        setIsLoading(false);
      }).catch((error)=>{
        console.log(error);
      })
    }
  
    useEffect(() => {
      getLivros();
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
                livros.map((livro) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("Livro", {
                          idLivro: livro.codigoLivro,
                        });
                      }}
                    >
                      <View style={styles.itemLivro}>
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
            {/* {editora != null ? (
            <View>
              <FlatList
                data={editora.listaLivrosDTO}
                renderItem={({ item }) => <Livro item={item} />}
              />
            </View>
          ) : (
            <Text style={styles.loading}>Loading...</Text>
          )} */}
          </ScrollView>
        </View>
      </>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "rgba(57,68,87,1)",
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
      height: 268,
      backgroundColor: "white",
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
      color: "black",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 10,
    },
  });
  