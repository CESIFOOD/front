"use client";
import MobileSubMenu from "../components/MobileSubMenu"
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const DashboardPage = () => {
    const navigate = useNavigate();

    const isAuthenticateCheck = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.warn("Vous devez être connecté pour accéder à cette page.");
            navigate("/login"); 
        }
    }

    useEffect(() => {
        isAuthenticateCheck();
    }, [navigate]);


    return(
        <div className="container mx-auto px-5 top-0">
            {/* Sous Menu*/}
            <div>
                <MobileSubMenu/>
            </div>
        </div>
    )
}

export default DashboardPage