import * as React from 'react'
import { TextInput, View, StyleSheet, Pressable, Text, Button } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { useRouter, Link } from 'expo-router'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Colors } from '@/constants/Colors'
import { useSignIn } from '@clerk/clerk-expo'

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [username, setUsername] = React.useState('')
  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmedPassword, setConfirmedPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [error, setError] = React.useState('')
  const [code, setCode] = React.useState('')


  const onSignUpPress = async () => {
    if (password !== confirmedPassword) {
      setError('Passwords do not match')
      return
    }

    if (!isLoaded) {
      return
    }

    try {
      await signUp.create({
        emailAddress,
        password,
        username,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setPendingVerification(true)
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      const error = err.errors.map((error: any) => error.longMessage).join('\n')
      setError(error)
      console.error(JSON.stringify(err, null, 2))
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded) {
      return
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId })
        router.replace('/')
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2))
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
      const error = err.errors.map((error: any) => error.longMessage).join('\n')
      setError(error)
    }
  }

  return (
    <ThemedView style={styles.container}>
      {!pendingVerification ?
        <>
          <View>
            <ThemedText type='title' style={{ fontWeight: 800, letterSpacing: -1, color: Colors.light.tint }}>Sign up</ThemedText>
            {error && <ThemedText style={{ color: 'red' }}>{error}</ThemedText>}
          </View>
          <View style={{ marginBottom: 50, gap: 30 }}>
          <View>
              <ThemedText style={styles.smallText}>Username:</ThemedText>
              <TextInput
                autoCapitalize="none"
                value={username}
                onChangeText={setUsername}
                style={styles.input} />
            </View>
            <View>
              <ThemedText style={styles.smallText}>E-mail:</ThemedText>
              <TextInput
                autoCapitalize="none"
                value={emailAddress}
                onChangeText={setEmailAddress}
                style={styles.input} />
            </View>
            <View>
              <ThemedText style={styles.smallText}>Password:</ThemedText>
              <TextInput
                style={styles.input}
                value={password}
                secureTextEntry={true}
                onChangeText={setPassword}
              />
            </View>
            <View>
              <ThemedText style={styles.smallText}>Confirm your password:</ThemedText>
              <TextInput
                style={styles.input}
                value={confirmedPassword}
                secureTextEntry={true}
                onChangeText={setConfirmedPassword}
              />
            </View>
          </View>
          <View>
            <Pressable onPress={onSignUpPress}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>
                  Sign up
                </Text>
              </View>
            </Pressable>
            <View style={{ alignItems: 'center', marginTop: 10 }}>
              <Link href={"/auth/signin"}>
                <Text style={styles.linkText}>
                  Sign in existing account
                </Text>
              </Link>
            </View>
          </View>
        </>
        :
        <>
          <ThemedText style={styles.smallText}>Check your e-mail for a verification code</ThemedText>
          <TextInput
            autoCapitalize="none"
            value={code}
            onChangeText={(code) => setCode(code)}
            style={styles.input} />
          <Pressable onPress={onPressVerify}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>
                Verify
              </Text>
            </View>
          </Pressable>
        </>
      }
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