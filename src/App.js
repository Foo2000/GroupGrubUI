
import './App.css';
import FoodProvider from './FoodProvider';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Homepage from "./Homepage";
import PageNotFound from "./PageNotFound";
import Login from "./Login";
import {AuthProvider} from "./FakeAuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Group from "./Group";

function App() {
    return (
        <div>

        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="FoodProvider" element={ <ProtectedRoute><FoodProvider /> </ProtectedRoute>} />
                    <Route path="homepage" element={<Homepage />} />
                    <Route path="Login" element={<Login />} />
                    <Route path="group" element={<ProtectedRoute><Group /></ProtectedRoute>} >
                        <Route path="participantOrder" element={<p>Here is the hub view for participantOrder</p>}/>
                    </Route>
                    <Route path = "*" element={ <ProtectedRoute><PageNotFound /> </ProtectedRoute> }/>
                </Routes>

            </BrowserRouter>
        </AuthProvider>
        </div>
    )
}
export default App;
