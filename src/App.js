import { useSelector } from "react-redux";

import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import NavigationScroll from "./template/layout/NavigationScroll";
import ThemeRoutes from "./template/routes/ThemeRoutes";
import themes from "./template/themes/theme";

function App() {
  const customization = useSelector((state) => state.customization);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <ThemeRoutes />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;