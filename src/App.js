import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MDBBtn, MDBContainer } from "mdb-react-ui-kit";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import Login from "./pages/Login";
import UserDetails from "./pages/UserDetails";
import OtherUserDetails from "./pages/OtherUserDetails";
import UserList from "./pages/UserList";
import ConcertDetails from "./pages/ConcertDetails";
import ConcertList from "./pages/ConcertList";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

function App() {
  const [userId, setUserId] = useState("");
  const [concertId, setConcertId] = useState("");
  const [matchedUserIds, setMatchedUserIds] = useState([]);
  const [otheruUserId, setOtherUserId] = useState("");
  const [inApp, setInApp] = useState(false);

  const resourceUrl = "http://localhost"

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout inApp={inApp}/>}>
          <Route index element={<Home />} />
          <Route
            path="userList"
            element={
              <UserList
                userIds={matchedUserIds}
                setOtherUserId={setOtherUserId}
                resourceUrl={resourceUrl}
              />
            }
          />
          <Route
            path="userDetails"
            element={
              <UserDetails userId={userId} resourceUrl={resourceUrl} />
            }
          />
          <Route
            path="otherUserDetails"
            element={
              <OtherUserDetails userId={otheruUserId} resourceUrl={resourceUrl} />
            }
          />
          <Route
            path="concertList"
            element={<ConcertList setConcertId={setConcertId} resourceUrl={resourceUrl} />}
          />
          <Route
            path="concertDetails"
            element={
              <ConcertDetails
                concertId={concertId}
                userId={"2f549ace-7ce8-466e-b9c4-b973f2bb69bc"}
                setMatchedUserIds={setMatchedUserIds}
                resourceUrl={resourceUrl}
              />
            }
          />
          <Route path="login" element={<Login userId={userId} setUserId={setUserId} setInApp={setInApp} resourceUrl={resourceUrl}/>} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
