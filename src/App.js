
import './App.css';
import FoodProvider from './pages/FoodProvider';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import {AuthProvider} from "./FakeAuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Group from "./pages/Group";
import Participant from "./pages/Participant";

function App() {
    return (
        <div>
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="participant/:participantID" element={<ProtectedRoute><Participant/></ProtectedRoute>} />
                    <Route path="groups" element={ <ProtectedRoute><FoodProvider /> </ProtectedRoute>} />
                    <Route path="group" element={<ProtectedRoute><Group /></ProtectedRoute>} />
                    <Route path="foodproviders" element={ <FoodProvider /> } />
                    <Route path="foodprovider" element={ <FoodProvider /> } />
                    <Route path = "*" element={ <ProtectedRoute><PageNotFound /> </ProtectedRoute> }/>
                </Routes>

            </BrowserRouter>
        </AuthProvider>
        </div>
    )
}
export default App;
