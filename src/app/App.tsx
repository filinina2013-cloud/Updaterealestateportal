import { Navigation } from "./components/Navigation";
import { PersonsPage } from "./components/PersonsPage";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div style={{ backgroundColor: "#0D1B2A", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navigation />
      <div style={{ flex: 1 }}>
        <PersonsPage />
      </div>
      <Footer />
    </div>
  );
}
