import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import { QueryClient, QueryClientProvider } from "react-query";
import MainPage from "./MainPage";
const queryClient = new QueryClient();
const App = () => {
 
  
  return (
    <QueryClientProvider client={queryClient}>
      <MainPage />

    </QueryClientProvider>
  );
};

export default App;
