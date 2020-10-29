import React, { createContext, useReducer } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";


import Home from './components/Home'
import About from './components/About'
import Error from './components/Error'
import Nav from "./components/Nav"
import API from "./components/API"


import { initialState, Reducer } from "./components/Reducer";

export const AppContext = createContext();

function App() {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const { currentTheme } = state;
  return (
    <div className="todoapp stack-large">
      <ThemeProvider theme={currentTheme}>
      <AppContext.Provider value={{ ...state, dispatch }}>
          <GlobalStyles />
          <Nav />
          <BrowserRouter>
          <Switch>
            <Route path='/' component={Home} exact />
            <Route path='/about' component={About} />
            <Route path='/api' component={API} />
            <Route component={Error} />
          </Switch>
          </BrowserRouter>
          </AppContext.Provider>
        </ThemeProvider>
    </div>
  );
}

const GlobalStyles = createGlobalStyle`
  html, body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    background: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.textColor};
    font-family: sans-serif;
  }
`;

export default App;