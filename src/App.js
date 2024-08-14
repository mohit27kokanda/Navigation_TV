import styled, { createGlobalStyle } from "styled-components";
import { Menu } from "./components/Menu";
import { Content } from "./components/Content";

const AppContainer = styled.div`
  background-color: #221c35;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const GlobalStyle = createGlobalStyle`
  ::-webkit-scrollbar {
    display: none;
  }
`;

function App() {
  return (
    <AppContainer>
      <GlobalStyle />
      <Menu focusKey="MENU" />
      <Content />
    </AppContainer>
  );
}

export default App;
