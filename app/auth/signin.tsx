import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, Button, View, StyleSheet, Pressable } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Colors } from '@/constants/Colors'
import React from 'react'

export default function SignInPage() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [error, setError] = React.useState('')
  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
      const error = err.errors.map((error: any) => error.longMessage).join('\n')
      setError(error)
    }
  }, [isLoaded, emailAddress, password])

  return (
    <ThemedView style={styles.container}>
      <View>
            <ThemedText type='title' style={{ fontWeight: 800, letterSpacing: -1, color: Colors.light.tint }}>Sign in</ThemedText>
            {error && <ThemedText style={{ color: 'red' }}>{error}</ThemedText>}
          </View>
      <View style={{ marginBottom: 50, gap: 30 }}>
        <View>
          <ThemedText style={styles.smallText}>Username or e-mail:</ThemedText>
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
            style={styles.input} />
        </View>
        <View>
          <ThemedText style={styles.smallText}>Password:</ThemedText>
          <TextInput
            style={styles.input}
            value={password}
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
          <View style={{ alignItems: 'flex-end' }}>
            <ThemedText style={styles.smallText}><Link href={"/"}>Forgot your password?</Link></ThemedText>
          </View>
        </View>
      </View>
      <View>
        <Pressable onPress={onSignInPress}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              Sign in
            </Text>
          </View>
        </Pressable>
        <View style={{ alignItems: 'center', marginTop: 10 }}>
          <Link href={"/auth/signup"}>
            <Text style={styles.linkText}>
              Create an account
            </Text>
          </Link>
        </View>
      </View>
    </ThemedView >
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 30,
    padding: 30,
    flex: 1,
  },
  smallText: {
    fontSize: 12,
    marginBottom: 5,
  },
  input: {
    borderRadius: 8,
    padding: 10,
    backgroundColor: Colors.light.secondaryBackground,
  },
  button: {
    padding: 16,
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: Colors.light.tint,
  },
  buttonText: {
    letterSpacing: -1,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.background,
  },
  linkText: {
    color: Colors.light.tint,
    letterSpacing: -1,
  }
});