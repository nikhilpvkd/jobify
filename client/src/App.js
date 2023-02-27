import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
    SharedLayout,
    Error,
    Landing,
    Register,
    ProtectedRoute,
} from "./pages";
import { AddJob, AllJobs, Profile, Statics } from "./pages/dashbord";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <SharedLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Statics />} />
                    <Route path="all-jobs" element={<AllJobs />} />
                    <Route path="add-job" element={<AddJob />} />
                    <Route path="profile" element={<Profile />} />
                </Route>
                <Route path="/landing" element={<Landing />} />
                <Route path="/Register" element={<Register />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
