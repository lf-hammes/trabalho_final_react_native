import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import AxiosInstance from "../../api/AxiosInstance";
import { DataContext } from "../../context/DataContext";
import Ionicons from "@expo/vector-icons/Ionicons";

export function Login({ navigation }) {
  const [usuario, setUsuario] = useState();
  const [senha, setSenha] = useState();
  const { armazenarDadosUsuario } = useContext(DataContext);
  const [showSenha, setShowSenha] = useState(false);

  async function handleLogin() {
    try {
      const resultado = await AxiosInstance.post("/auth/signin", {
        username: usuario,
        password: senha,
      });

      if (resultado.status === 200) {
        var jwtToken = resultado.data;
        armazenarDadosUsuario(jwtToken["accessToken"]);

        navigation.navigate("HomeStack");
      } else {
        console.log("Erro ao realizar o login!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar />
      <Text style={styles.titulo}>Livraria</Text>
      <View style={styles.logoContainer}>
        <Image
          source={{
            uri: "https://media.discordapp.net/attachments/1110785958359601204/1121062552802168903/Logo.png",
          }}
          style={styles.logo}
        />
      </View>
      <Text style={styles.saudacao}>Bem-vindo(a)</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome de usuário"
        onChangeText={setUsuario}
        value={usuario}
      />
      <View style={styles.senhaContainer}>
        <TextInput
          secureTextEntry={!showSenha}
          style={styles.senha}
          placeholder="Senha"
          onChangeText={setSenha}
          value={senha}
        />
        <TouchableOpacity
          onPress={() => {
            showSenha == false ? setShowSenha(true) : setShowSenha(false);
          }}
        >
          <Ionicons name="eye-outline" size={18} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text>Login</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(57,68,87,1)",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  titulo: {
    fontSize: 40,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    color: 'white'
  },
  saudacao: {
    fontSize: 30,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    color: 'white'
  },
  input: {
    fontSize: 15,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginTop: 10,
    borderRadius: 20,
    backgroundColor: "#FFF",
    width: 200,
  },
  senhaContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginTop: 10,
  },
  senha: {
    fontSize: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#FFF",
    width: 165,
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffbd59",
    width: 70,
    height: 40,
    marginTop: 50,
    borderRadius: 20,
    fontSize: 15,
    padding: 10,
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 150,
  },
  logo: {
    height: "100%",
    width: 120,
  },
});
