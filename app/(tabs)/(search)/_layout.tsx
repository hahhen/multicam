import { Stack } from "expo-router";

export default function SearchStack(){
    return(
        <Stack>
            <Stack.Screen name="search" 
            options={{
                headerShown: false
            }}/>
            <Stack.Screen name="page" options={{
                headerShown: false
            }} />
        </Stack>
    )
}