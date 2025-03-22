import Home from "./customers/pages/home/Home";
import "./App.css";
import Navbar from "./customers/components/navbar/Navbar";
import customeTheme from "./Theme/customeTheme";
import { ThemeProvider } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={customeTheme}>
      <div>
        <Navbar></Navbar>
        <Home></Home>
      </div>
    </ThemeProvider>
  );
}

export default App;
