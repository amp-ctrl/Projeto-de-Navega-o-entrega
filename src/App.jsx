// GestureHandlerRootView é EXIGIDO pelo react-native-gesture-handler, que é a
// biblioteca que o Drawer usa para reconhecer o gesto de arrastar o dedo.
// Ele precisa envolver TODO o app e ocupar a tela inteira (flex: 1).
// Sem ele, a gaveta não abre pelo gesto (principalmente no Android).
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Routes } from "./routes";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Routes />
    </GestureHandlerRootView>
  );
}
