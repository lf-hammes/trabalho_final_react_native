import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
} from "react-native";
import { ScrollView } from "react-native";
import { useContext, useState, useEffect } from "react";
import AxiosInstance from "../../api/AxiosInstance";
import { DataContext } from "../../context/DataContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export function Editoras() {
  const navigation = useNavigation();
  const { dadosUsuario } = useContext(DataContext);
  const [editoras, setEditoras] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("Loading...");
 

  async function getEditoras() {
    await AxiosInstance.get("/editoras", {
      headers: {
        Authorization: `Bearer ${dadosUsuario?.token}`,
      },
    })
      .then((response) => {
        setEditoras(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // setInterval(() => {
  //   let newMessage = message + ".";
  //   if (newMessage == "Loading....") {
  //     setMessage("Loading.");
  //   } else {
  //     setMessage(newMessage);
  //   }
  //   console.log('loading')
  // }, 500)    

  useEffect(() => {
    getEditoras();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar />
      <ScrollView>
        <View style={styles.editoraContainer}>
          {isLoading ? (
            <Text style={styles.loading}>{message}</Text>
          ) : (
            editoras.map((editora) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Editora", {
                      idEditora: editora.codigoEditora,
                    });
                  }}
                >
                  <View style={styles.itemEditora} key={editora.codigoEditora}>
                    <Image
                      style={styles.editora}
                      source={{ uri: `data:image/png;base64,${editora.img}` }}
                    />
                    <Text style={styles.nome}>{editora.nomeEditora}</Text>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(57,68,87,1)",
  },
  editoraContainer: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  itemEditora: {
    height: 160,
    width: 150,
    backgroundColor: "white",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  editora: {
    width: 100,
    height: 100,
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
  },
});
