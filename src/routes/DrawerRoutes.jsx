// ============================================================================
// DrawerRoutes.jsx
// Arquivo responsável por registrar e configurar a navegação por MENU LATERAL
// (Drawer / "gaveta") do App.
//
// Documentação: https://reactnavigation.org/docs/drawer-navigator
// Instalação:   npm install @react-navigation/drawer
//               npx expo install react-native-gesture-handler react-native-reanimated
//
// POR QUE O DRAWER PRECISA DE 2 BIBLIOTECAS EXTRAS?
// - react-native-gesture-handler -> reconhece o gesto de ARRASTAR o dedo da
//   borda da tela para abrir/fechar a gaveta.
// - react-native-reanimated      -> faz a ANIMAÇÃO da gaveta rodar na thread
//   nativa, para o movimento ficar fluido (60fps).
//
// ATENÇÃO: por causa do gesture-handler, o App precisa estar envolvido por
// <GestureHandlerRootView> — isso já foi feito no arquivo src/App.jsx.
// ============================================================================

// Linha 1: importa a FÁBRICA de navegadores do tipo gaveta.
// Igual às outras fábricas, ela devolve um objeto com .Navigator e .Screen.
import { createDrawerNavigator } from "@react-navigation/drawer";

// Linha 2: importa o pacote de ícones, usado nos itens do menu lateral.
import { MaterialIcons } from "@expo/vector-icons";

// Linhas 3 a 6: importa as TELAS que cada item do menu vai abrir.
import Home from "../screens/Home";
import Product from "../screens/Product";
import Profile from "../screens/Profile";
import Settings from "../screens/Settings";

// Linha 7: cria o navegador UMA ÚNICA VEZ, fora do componente (mesmo motivo
// do Stack e do Bottom: evitar recriar o navegador em cada renderização).
const Drawer = createDrawerNavigator();

// Linha 8: componente que será usado dentro do <NavigationContainer>.
export function DrawerRoutes() {
  return (
    // <Drawer.Navigator> é o container da gaveta.
    // Ele desenha 2 coisas: a gaveta (menu lateral) e a tela ativa.
    <Drawer.Navigator
      // initialRouteName: qual tela aparece ao abrir o app.
      initialRouteName="home"
      // screenOptions: opções aplicadas a TODAS as telas da gaveta.
      screenOptions={{
        // headerShown: true -> aqui MANTEMOS o cabeçalho visível de propósito,
        // porque é ele que desenha o botão "hambúrguer" (☰) que abre a gaveta.
        // Se você colocar false, a gaveta só abre pelo gesto de arrastar
        // ou chamando navigation.openDrawer() na mão.
        headerShown: true,

        // headerTintColor: cor do texto e do ícone ☰ do cabeçalho.
        headerTintColor: "#111827",

        // headerStyle: estilo da BARRA do cabeçalho.
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },

        // drawerPosition: de qual lado a gaveta abre -> "left" (padrão) ou "right".
        drawerPosition: "left",

        // drawerType: COMO a gaveta aparece.
        // "front"     -> desliza por cima da tela (padrão no celular)
        // "back"      -> a tela desliza e revela a gaveta atrás
        // "slide"     -> gaveta e tela deslizam juntas
        // "permanent" -> gaveta sempre visível (ótimo para tablet/web)
        drawerType: "front",

        // drawerActiveTintColor: cor do texto/ícone do item SELECIONADO.
        drawerActiveTintColor: "#7C3AED",

        // drawerActiveBackgroundColor: cor de fundo do item selecionado.
        drawerActiveBackgroundColor: "#EDE9FE",

        // drawerInactiveTintColor: cor dos itens NÃO selecionados.
        drawerInactiveTintColor: "#6B7280",

        // drawerLabelStyle: estilo do TEXTO de cada item do menu.
        drawerLabelStyle: {
          fontSize: 15,
          fontWeight: "600",
        },

        // drawerStyle: estilo do PAINEL da gaveta (largura, cor de fundo...).
        drawerStyle: {
          backgroundColor: "#FFFFFF",
          width: 260,
        },
      }}
    >
      {/* ---------------------------------------------------------------
          ITEM 1 - HOME
          name      -> apelido da rota, usado em navigation.navigate("home")
          component -> componente renderizado quando o item é tocado
          options   -> configurações SÓ deste item
      --------------------------------------------------------------- */}
      <Drawer.Screen
        name="home"
        component={Home}
        options={{
          // drawerLabel: texto do item DENTRO da gaveta.
          drawerLabel: "Início",

          // title: texto que aparece no CABEÇALHO da tela (barra do topo).
          // Repare: drawerLabel e title são coisas diferentes e podem divergir.
          title: "Início",

          // drawerIcon: função que devolve o ícone do item.
          // Recebe { color, size, focused }, exatamente como o tabBarIcon.
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />

      {/* ---------------------------------------------------------------
          ITEM 2 - PRODUCT
      --------------------------------------------------------------- */}
      <Drawer.Screen
        name="product"
        component={Product}
        options={{
          drawerLabel: "Produtos",
          title: "Produtos",
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="shopping-cart" size={size} color={color} />
          ),
        }}
      />

      {/* ---------------------------------------------------------------
          ITEM 3 - PROFILE
      --------------------------------------------------------------- */}
      <Drawer.Screen
        name="profile"
        component={Profile}
        options={{
          drawerLabel: "Perfil",
          title: "Perfil",
          drawerIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* ---------------------------------------------------------------
          ITEM 4 - SETTINGS
      --------------------------------------------------------------- */}
      <Drawer.Screen
        name="settings"
        component={Settings}
        options={{
          drawerLabel: "Configurações",
          title: "Configurações",
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

// ============================================================================
// OBSERVAÇÕES PARA A AULA
//
// 1) Três jeitos de abrir/fechar a gaveta de DENTRO de uma tela:
//      const navigation = useNavigation();
//      navigation.openDrawer();   // abre
//      navigation.closeDrawer();  // fecha
//      navigation.toggleDrawer(); // abre se fechada, fecha se aberta
//    Isso é útil quando você usa headerShown: false e cria o seu próprio
//    botão ☰ com o componente <ButtonIcon icon="menu" />.
//
// 2) Para descobrir se a gaveta está aberta:
//      import { useDrawerStatus } from "@react-navigation/drawer";
//      const status = useDrawerStatus(); // "open" | "closed"
//
// 3) Para desenhar a gaveta do zero (foto do usuário, botão de sair, etc.),
//    use a opção drawerContent do Navigator:
//      <Drawer.Navigator drawerContent={(props) => <MeuMenu {...props} />}>
//    Dentro de MeuMenu você usa <DrawerContentScrollView> e <DrawerItem>.
//
// 4) Se a gaveta não abrir com o gesto de arrastar, quase sempre o motivo é
//    o <GestureHandlerRootView> faltando no topo do App (veja src/App.jsx).
// ============================================================================