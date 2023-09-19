"use client";

import React, { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import {
    useSessionContext,
    useSupabaseClient
} from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';


import Modal from './Modal';
import useAuthModal from '../../hooks/useAuthModal';
import { useTheme } from 'next-themes';

const AuthModal = () => {
    const { session } = useSessionContext();
    const router = useRouter();

    const { theme } = useTheme()

    const { onClose, isOpen } = useAuthModal();

    const supabaseClient = useSupabaseClient();

    useEffect(() => {
        if (session) {
            router.refresh();
            onClose();
        }
    }, [session, router, onClose]);

    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    }

    return (
        <Modal
            title="Welcome back"
            description="Login to your account."
            isOpen={isOpen}
            onChange={onChange}
        >
            <Auth
                supabaseClient={supabaseClient}
                providers={['google']}
                magicLink={true}
                appearance={{
                    theme: ThemeSupa,
                }}
                theme={theme}
            />
        </Modal>
    );
}

export default AuthModal;