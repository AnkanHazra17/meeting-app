import {Route, Routes, useNavigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import UserLayout from "./layouts/user";
import AdminLayout from "./layouts/admin";
import AuthLayout from "./layouts/auth";
import React from "react";
import StartMeeting from "@/meeting/StartMeeting";
import MeetingLayout from "@/meeting/MeetingLayout";

function App() {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    const user = JSON.parse(localStorage.getItem("user"))
    useNavigate()

    return (
        <>
            <ToastContainer />
            <Routes>
                {token && user?.role ? (
                    user?.role === 'user' ?
                        <Route path="/*" element={<UserLayout />} />
                        : user?.role === 'superAdmin' ?
                            <Route path="/*" element={<AdminLayout />} />
                            : ''
                ) : (
                    <Route path="/*" element={<AuthLayout />} />
                )}
                <Route path="/meeting" element={<StartMeeting/>}></Route>
                <Route path="/meeting/:meetingId" element={<MeetingLayout/>}></Route>
            </Routes>
        </>
    );
}

export default App;