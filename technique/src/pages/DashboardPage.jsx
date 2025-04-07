import MobileSubMenu from "../components/MobileSubMenu"
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const DashboardPage = () => {

    const navigate = useNavigate();
    
    const isAuthenticateCheck = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.warning("Vous devez être connecté pour accéder à cette page.");
            navigate("/login");
        }
    }

    useEffect(() => {
        isAuthenticateCheck();
    }, [navigate]);

    return (
        <div className="container mx-auto px-5 top-0">
            {/* Sous Menu*/}
            <div>
                <MobileSubMenu />
            </div>
            <ToastContainer/>
        </div>
    )
}

export default DashboardPage