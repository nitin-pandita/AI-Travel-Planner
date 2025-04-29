import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Colors } from "../../../constants/Color";
import { auth } from "../../../configs/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
export default function SignUp() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fullName, setFullName] = React.useState("");

  const router = useRouter();
  const onCreateAccount = async () => {
    if (!email || !password || !fullName) {
      ToastAndroid.show("Please fill all the fields", ToastAndroid.SHORT);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User created:", user.email);

      ToastAndroid.show("Account created successfully ✅", ToastAndroid.SHORT);

      // Optional: navigate to sign-in screen after success
      setTimeout(() => {
        router.replace("auth/signin");
      }, 1500); // small delay to let the toast show
    } catch (error) {
      const errorCode = error.code;

      if (errorCode === "auth/email-already-in-use") {
        ToastAndroid.show("Email already in use", ToastAndroid.SHORT);
      } else if (errorCode === "auth/invalid-email") {
        ToastAndroid.show("Invalid email format", ToastAndroid.SHORT);
      } else if (errorCode === "auth/weak-password") {
        ToastAndroid.show(
          "Password should be at least 6 characters",
          ToastAndroid.SHORT
        );
      } else {
        ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
        console.log("Signup error:", error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create an Account</Text>
      <Text style={styles.subHeading}>Start your next journey with us 🌍</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="John Doe"
          placeholderTextColor="#888"
          onChangeText={(e) => setFullName(e)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="you@example.com"
          placeholderTextColor="#888"
          onChangeText={(e) => setEmail(e)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          onChangeText={(e) => setPassword(e)}
          style={styles.input}
          placeholder="Create a strong password"
          placeholderTextColor="#888"
          secureTextEntry
        />
      </View>

      <TouchableOpacity onPress={onCreateAccount} style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.replace("auth/signin")}
        style={styles.linkContainer}
      >
        <Text style={styles.linkText}>
          Already have an account?{" "}
          <Text style={styles.linkHighlight}>Sign In</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 80,
    backgroundColor: "#0D0D0D", // very dark background
    flex: 1,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#f2f2f2",
    marginBottom: 8,
  },
  subHeading: {
    fontSize: 16,
    color: "#a6a6a6",
    marginBottom: 35,
  },
  inputContainer: {
    marginBottom: 22,
  },
  label: {
    fontSize: 14,
    color: "#cccccc",
    marginBottom: 6,
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 10,
    backgroundColor: "#1a1a1a",
    color: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#ffffff",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 25,
  },
  buttonText: {
    color: "#0D0D0D",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  linkText: {
    color: "#888",
    fontSize: 14,
  },
  linkHighlight: {
    color: "#fff",
    fontWeight: "bold",
  },
});
