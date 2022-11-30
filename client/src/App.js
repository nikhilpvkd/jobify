import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashbord, Error, Landing, Register } from "./pages";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashbord />} />
                <Route path="/landing" element={<Landing />} />
                <Route path="/Register" element={<Register />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
