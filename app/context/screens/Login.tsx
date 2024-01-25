import {
  View,
  Image,
  Button,
  StyleSheet,
  TextInput,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { openAuthSessionAsync, openBrowserAsync } from "expo-web-browser";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { onLogin, onRegister } = useAuth();

  const login = async () => {
    const result = await onLogin!(email, password);
    if (result && result.error) {
      alert(result.msg);
    }
  };

  const register = async () => {
    const result = await onRegister!(email, password);
    if (result && result.error) {
      alert(result.msg);
    } else {
      login();
    }
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: "https://galaxies.dev/img/logos/logo--blue.png" }}
      />
      <View style={styles.form}>
        <TextInput
          style={styles.form}
          placeholder="Email"
          onChangeText={(text: string) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.form}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text: string) => setPassword(text)}
          value={password}
        />
        <Button onPress={login} title="Sign" />
        <Button onPress={register} title="Create Account" />
        {loading ? (
          <View>
            <StatusBar barStyle="dark-content" />
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <Button
            title="Open Browser"
            onPress={() =>
              openBrowserAsync(
                "https://www.cozycozy.com/us/search/Paris%2C%20France/2024-01-20/2024-01-21/1-2-0/results"
              )
            }
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "50%",
    height: "50%",
    resizeMode: "contain",
  },
  form: {
    gap: 10,
    width: "60%",
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  container: {
    alignItems: "center",
    width: "100%",
  },
});

export default Login;
