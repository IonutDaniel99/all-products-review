export type UserDetailsType = {
    instance_id: string;
    id: string;
    aud: string;
    role: string;
    email: string;
    encrypted_password: string;
    email_confirmed_at: null | string;
    invited_at: null | string;
    confirmation_token: string;
    confirmation_sent_at: null | string;
    recovery_token: string;
    recovery_sent_at: null | string;
    email_change_token_new: string;
    email_change: string;
    email_change_sent_at: null | string;
    last_sign_in_at: null | string;
    raw_app_meta_data: {
        provider: string;
        providers: string[];
    };
    raw_user_meta_data: {
        iss: string;
        sub: string;
        name: string;
        email: string;
        picture: string;
        full_name: string;
        avatar_url: string;
        provider_id: string;
        email_verified: boolean;
    };
    is_super_admin: boolean;
    created_at: string;
    updated_at: string;
    phone: null | string;
    phone_confirmed_at: null | string;
    phone_change: string;
    phone_change_token: string;
    phone_change_sent_at: null | string;
    confirmed_at: null | string;
    email_change_token_current: string;
    email_change_confirm_status: number;
    banned_until: null | string;
    reauthentication_token: string;
    reauthentication_sent_at: null | string;
    is_sso_user: boolean;
    deleted_at: null | string;
    profile_name: null | string;
}