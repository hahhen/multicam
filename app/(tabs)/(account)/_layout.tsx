import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
import TabThreeScreen from './account'

export default function AccountLayout() {
    const { isSignedIn } = useAuth()
    if (!isSignedIn) {
        return <Redirect href={'/auth/signin'} />
    }
    return  (
        <Stack>
            <Stack.Screen name="account" 
            options={{
                headerShown: false
            }}/>
            <Stack.Screen name="page" options={{
                headerShown: false
            }} />
            <Stack.Screen name="map" options={{
                headerShown: false
            }} />
        </Stack>
    )

}