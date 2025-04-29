import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../../constants/Color";
import { auth } from "../../../configs/FirebaseConfig";
import { ToastAndroid } from "react-native"; // make sure this is imported
import { signInWithEmailAndPassword } from "firebase/auth";
export default function SignIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigation = useNavigation();
  const router = useRouter();

  const onSignIn = async () => {
    if (!email || !password) {
      ToastAndroid.show("Please fill all the fields", ToastAndroid.SHORT);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Signed in:", user.email);

      ToastAndroid.show("Sign in successful 🎉", ToastAndroid.SHORT);

      // Optional: Navigate to home/dashboard page
      router.replace("/(tabs)/my-trips");
    } catch (error) {
      const errorCode = error.code;

      if (errorCode === "auth/user-not-found") {
        ToastAndroid.show("User not found", ToastAndroid.SHORT);
      } else if (errorCode === "auth/wrong-password") {
        ToastAndroid.show("Wrong password", ToastAndroid.SHORT);
      } else if (errorCode === "auth/invalid-email") {
        ToastAndroid.show("Invalid email", ToastAndroid.SHORT);
      } else if (errorCode === "auth/too-many-requests") {
        ToastAndroid.show("Too many requests", ToastAndroid.SHORT);
      } else {
        ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
        console.log("Sign-in error:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.heading}>Welcome Back</Text>
      <Text style={styles.subHeading}>Sign in to continue</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="you@example.com"
          placeholderTextColor="#999"
          onChangeText={(e) => setEmail(e)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          placeholderTextColor="#999"
          secureTextEntry
          onChangeText={(e) => setPassword(e)}
        />
      </View>

      <TouchableOpacity onPress={onSignIn} style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.replace("auth/signup")}
        style={styles.outlineButton}
      >
        <Text style={styles.outlineButtonText}>Create an Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // deep black background
    paddingHorizontal: 25,
    paddingTop: 100,
  },
  heading: {
    fontSize: 36,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 18,
    color: "#ccc",
    marginBottom: 50,
  },
  inputContainer: {
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    color: "#bbb",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#111",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#333",
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  outlineButton: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
    marginTop: 15,
  },
  outlineButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
