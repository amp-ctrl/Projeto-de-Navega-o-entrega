import { View } from "react-native";
import Header from "../components/Header";
import Title from "../components/Title";

export default function Profile() {
  return (
    <View style={{ flex: 1, padding: 32, paddingTop: 54 }}>
      <Header>
        <Title>Profile</Title>
      </Header>
    </View>
  );
}
