// ============================================================================
// routes/index.jsx
// Arquivo responsável por criar um CONTEXTO DE NAVEGAÇÃO.
//
// Este é o único ponto do app que conversa com o React Navigation "por fora".
// Aqui nós escolhemos QUAL navegador será usado. As telas continuam iguais.
// ============================================================================

// NavigationContainer: guarda o ESTADO da navegação (qual tela está aberta,
// qual é o histórico) e o disponibiliza, via Context API, para todo o app.
// É por causa dele que o hook useNavigation() funciona dentro das telas.
// Regra: ele deve existir UMA única vez, envolvendo todos os navegadores.
import { NavigationContainer } from "@react-navigation/native";

// Importamos os três navegadores que criamos. Note que cada arquivo exporta
// uma função-componente com o mesmo formato, então eles são intercambiáveis.
import { StackRoutes } from "./StackRoutes";
import { BottomRoutes } from "./BottomRoutes";
import { DrawerRoutes } from "./DrawerRoutes";

// ----------------------------------------------------------------------------
// CHAVE DE AULA
// Troque o valor abaixo para demonstrar cada tipo de navegação sem apagar
// código. Valores aceitos: "stack" | "bottom" | "drawer"
// ----------------------------------------------------------------------------
const TIPO_DE_NAVEGACAO = "drawer";

export function Routes() {
  return (
    <NavigationContainer>
      {/* Renderização condicional: só UM navegador entra na árvore por vez. */}
      {TIPO_DE_NAVEGACAO === "stack" && <StackRoutes />}
      {TIPO_DE_NAVEGACAO === "bottom" && <BottomRoutes />}
      {TIPO_DE_NAVEGACAO === "drawer" && <DrawerRoutes />}
    </NavigationContainer>
  );
}

// ============================================================================
// PRÓXIMO PASSO: NAVEGADORES ANINHADOS (nesting)
//
// Em apps reais os três tipos convivem. O padrão mais comum é:
//
// Drawer (menu lateral)
// └── Bottom Tabs (abas de baixo)
//     └── Stack (empilha detalhes dentro de cada aba)
//
// Para fazer isso, basta passar um navegador como "component" de um Screen:
//
// <Drawer.Screen name="tabs" component={BottomRoutes} />
// <Bottom.Screen name="homeStack" component={StackRoutes} />
//
// Cuidado: ao aninhar, navigation.navigate() precisa do caminho completo
// quando a rota está em outro navegador:
//
// navigation.navigate("tabs", { screen: "product" });
// ============================================================================
