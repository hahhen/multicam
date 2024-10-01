import { StyleSheet, Image, Platform, View, TextInput, Button } from 'react-native';
import * as React from 'react'
import { useSignUp } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';

export default function TabThreeScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')

  return (
    <ThemedView style={styles.container}>
      <ThemedText type='title' style={{fontWeight: 800, letterSpacing: -1, color: Colors.light.tint}}>Sign in</ThemedText>
      <View>
        <ThemedText style={styles.smallText}>Username:</ThemedText>
        <TextInput style={styles.input} />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
  },
  smallText:{
    fontSize: 14,
  },
  input:{
    borderRadius: 8,
    padding: 10,
    backgroundColor: Colors.light.secondaryBackground,
  }
});
