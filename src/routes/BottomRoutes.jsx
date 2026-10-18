// ============================================================================
// BottomRoutes.jsx
// Arquivo responsável por registrar e configurar a navegação por ABAS INFERIORES
// (Bottom Tabs) do App.
//
// Documentação: https://reactnavigation.org/docs/bottom-tab-navigator
// Instalação: npm install @react-navigation/bottom-tabs
//
// DIFERENÇA EM RELAÇÃO AO STACK:
// - Stack -> empilha telas (uma "em cima" da outra) e tem botão de voltar.
// - Bottom -> todas as telas ficam "lado a lado" em uma barra fixa na parte
//             de baixo; o usuário troca de tela tocando no ícone da aba.
// ============================================================================

// Linha 1: importa a FÁBRICA de navegadores de abas inferiores.
// createBottomTabNavigator é uma função que, ao ser chamada, devolve um objeto
// com dois componentes: .Navigator (o container das abas) e .Screen (cada aba).
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Linha 2: importa o pacote de ícones. Usamos o MaterialIcons para desenhar o
// ícone de cada aba. Os nomes dos ícones saem de https://icons.expo.fyi/Index
import { MaterialIcons } from "@expo/vector-icons";

// Linhas 3 a 5: importa as TELAS (componentes) que cada aba vai renderizar.
// Repare que a tela não sabe que está dentro de abas — ela é um componente comum.
import Home from "../screens/Home";
import Product from "../screens/Product";
import Profile from "../screens/Profile";

// Linha 6: executa a fábrica UMA ÚNICA VEZ, fora do componente.
// Se isso fosse feito dentro do componente, um novo navegador seria criado a
// cada renderização e o app perderia o estado da navegação.
const Bottom = createBottomTabNavigator();

// Linha 7: exportamos uma função-componente. É ela que será colocada dentro do
// <NavigationContainer> no arquivo routes/index.jsx.
export function BottomRoutes() {
  return (
    // <Bottom.Navigator> é o container das abas.
    // Ele é quem desenha a barra inferior e controla qual tela está ativa.
    <Bottom.Navigator
      // initialRouteName: qual aba aparece quando o app abre.
      // O valor precisa ser IGUAL ao "name" de um <Bottom.Screen> abaixo.
      initialRouteName="home"
      // screenOptions: opções aplicadas a TODAS as abas de uma só vez.
      // (Para opções de uma aba específica, use a prop "options" no Screen.)
      screenOptions={{
        // headerShown: false -> esconde o cabeçalho que o React Navigation
        // desenha automaticamente no topo. Escondemos porque as nossas telas
        // já têm o próprio <Header> feito à mão.
        headerShown: false,

        // tabBarActiveTintColor: cor do ícone + texto da aba SELECIONADA.
        tabBarActiveTintColor: "#7C3AED",

        // tabBarInactiveTintColor: cor do ícone + texto das abas NÃO selecionadas.
        tabBarInactiveTintColor: "#9CA3AF",

        // tabBarShowLabel: mostra (true) ou esconde (false) o texto abaixo do
        // ícone. Troque para false em aula para mostrar a diferença visual.
        tabBarShowLabel: true,

        // tabBarLabelStyle: estilo do TEXTO da aba (é um style de <Text>).
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },

        // tabBarStyle: estilo da BARRA em si (é um style de <View>).
        // Cuidado com "height": se o valor for pequeno demais, o texto da aba
        // fica cortado. Reserve espaço para o ícone (~24) + o texto (~16).
        tabBarStyle: {
          height: 76,
          paddingBottom: 12,
          paddingTop: 10,
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
        },
      }}
    >
      {/* ---------------------------------------------------------------
          ABA 1 - HOME
          name      -> "apelido" da rota. É esta string que usamos em
                       navigation.navigate("home"). Precisa ser única.
          component -> o componente React que será renderizado na aba.
          options   -> configurações SÓ desta aba (sobrescrevem screenOptions).
      --------------------------------------------------------------- */}
      <Bottom.Screen
        name="home"
        component={Home}
        options={{
          // tabBarLabel: o texto exibido na aba. Se você não passar,
          // o React Navigation usa o próprio "name" da rota ("home").
          tabBarLabel: "Início",

          // tabBarIcon: função que DEVOLVE um elemento de ícone.
          // O React Navigation chama essa função e entrega um objeto com:
          //   color   -> já vem com a cor certa (ativa ou inativa)
          //   size    -> tamanho sugerido pela plataforma
          //   focused -> true/false, se esta aba está selecionada agora
          // Usamos "color" e "size" para o ícone acompanhar o tema sozinho.
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />

      {/* ---------------------------------------------------------------
          ABA 2 - PRODUCT
          Aqui mostramos o "badge": aquele balãozinho vermelho com um número,
          usado para notificações (ex.: itens no carrinho).
      --------------------------------------------------------------- */}
      <Bottom.Screen
        name="product"
        component={Product}
        options={{
          tabBarLabel: "Produtos",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="shopping-cart" size={size} color={color} />
          ),
          // tabBarBadge: número (ou texto) exibido no balãozinho sobre o ícone.
          // Em um app real esse valor viria de um estado/contexto global.
          tabBarBadge: 3,
          // tabBarBadgeStyle: estilo do balãozinho.
          tabBarBadgeStyle: {
            backgroundColor: "#EF4444",
            color: "#FFFFFF",
            fontSize: 11,
          },
        }}
      />

      {/* ---------------------------------------------------------------
          ABA 3 - PROFILE
          Aqui usamos o parâmetro "focused" para trocar o DESENHO do ícone:
          preenchido quando a aba está ativa, vazado quando não está.
      --------------------------------------------------------------- */}
      <Bottom.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Bottom.Navigator>
  );
}

// ============================================================================
// OBSERVAÇÕES PARA A AULA
//
// 1) Dentro das telas continuamos usando o MESMO hook de sempre:
//      const navigation = useNavigation();
//      navigation.navigate("product");
//    Ou seja: o código da tela não muda quando trocamos o tipo de navegador.
//    Isso é a grande vantagem do React Navigation.
//
// 2) navigation.goBack() no Bottom Tabs volta para a aba anterior visitada
//    (o histórico das abas), e não "fecha" a tela como acontece no Stack.
//
// 3) Outras opções úteis para experimentar em aula:
//    - tabBarPosition: "top"        -> joga a barra para o topo
//    - tabBarHideOnKeyboard: true   -> esconde a barra quando o teclado abre
//    - tabBarButton: () => null     -> "esconde" uma aba da barra, mas mantém
//                                      a rota acessível via navigate()
// ============================================================================