import { RouterProvider } from "react-router";
import router from "./routes";
import { Toaster } from "sonner";
import { CustomDrawer } from "./components/molecules/CustomDrawer";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-center" />
      <CustomDrawer/>
    </>
  );
}

export default App;
