import { Text, View } from "react-native";
import Login from "../components/Login";
import { auth } from "../configs/FirebaseConfig";
import { Redirect, useRouter } from "expo-router";

export default function Index() {
  const user = auth.currentUser;
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      {user ? <Redirect href={"/my-trips"} /> : <Login />}
    </View>
  );
}
