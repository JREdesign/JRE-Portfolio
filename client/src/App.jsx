import { BrowserRouter, Routes, Route } from "react-router-dom";
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";
import Login from "./components/Login"; // Asegúrate de que la ruta sea correcta
import Dashboard from "./components/Dashboard"; // Importa el componente Dashboard
import Links from "./components/Links";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className='relative z-0' style={{ backgroundColor: '#000003' }}>
            <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
              <Navbar />
              <Hero />
            </div>
            <About />
            <Experience />
            <Tech />
            <Works />
            <Feedbacks />
            <div className='relative z-0'>
              <Contact />
              <StarsCanvas />
            </div>
            <Links />
          </div>
        }/>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Añade la ruta del Dashboard aquí */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

