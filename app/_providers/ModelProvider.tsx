"use client";

import { useEffect, useState } from "react";

import AuthModal from "@/_components/AuthModal";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div className="z-50">
            <AuthModal />
        </div>
    );
}

export default ModalProvider;