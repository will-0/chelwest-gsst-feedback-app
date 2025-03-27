import BaseView from '@/components/BaseView';
import LoginButton from '@/components/custom/LoginButton';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { useEffect, useState } from 'react';
import * as AuthSession from 'expo-auth-session';
import { useRouter } from 'expo-router';
import { AUTH_ENDPOINT, CLIENT_ID, TOKEN_ENDPOINT } from '@/constants/Endpoints';

const redirectUri = AuthSession.makeRedirectUri();

export default function InitialScreen() {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        if (isLoggedIn) {
            router.navigate('/(tabs)/add')
        }
    }, [isLoggedIn]);

    return (
        <BaseView>
            <Box className='flex-1 justify-center items-center w-full gap-4'>
                <Heading size="2xl">Welcome to the app!</Heading>
                <LoginButton
                    auth_endpoint={AUTH_ENDPOINT}
                    token_endpoint={TOKEN_ENDPOINT}
                    client_id={CLIENT_ID}
                    redirect_uri={redirectUri}
                    scopes={['api://8cbc0547-74cd-4434-9445-54daeae995d9/FinomicsData.ReadWrite','openid', 'profile', 'email']}
                    setIsLoggedIn={setIsLoggedIn}
                />
            </Box>
        </BaseView>
    );
}