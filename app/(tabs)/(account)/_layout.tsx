import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
import TabThreeScreen from './account'

export default function AccountLayout() {
    const { isSignedIn } = useAuth()
    if (!isSignedIn) {
        return <Redirect href={'/auth/signin'} />
    }
    return <Stack screenOptions={{headerShown: false}} />

}