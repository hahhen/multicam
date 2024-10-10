import { Image, StyleSheet, Platform, ScrollView } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { ThemedScrollView } from '@/components/ThemedScrollView';
import { Feed } from '@/components/Feed';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-expo';

export default function HomeScreen() {

  const {isSignedIn, user} = useUser()

  interface ProductProps {
    title: string,
    image: string,
    currency: string,
    price: number,
    priceProvider: string,
    likes: number
    pageid: number
    empty?: boolean
    isLiked?: boolean
  }

  const [cameras, setCameras] = useState<ProductProps[]>([]);

  const getCameras = () => {
    return fetch(`https://multicam-bcknd.vercel.app/${isSignedIn ? `?userId=${user.id}`: ''}`)
      .then(response => response.json())
      .then(json => {
        setCameras(json.cameras);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    getCameras();
  }, []);

  return (
    <ThemedScrollView refreshFunction={getCameras}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText style={styles.title} type="title">Featured articles</ThemedText>
      </ThemedView>
      <ThemedView style={styles.featured}>
        <Image
          source={require('@/assets/images/featured.png')}
          style={styles.reactLogo}
        />
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText style={styles.title} type="title">Recommended</ThemedText>
      </ThemedView>
      <Feed list={cameras} />
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: Colors.light.tint,
    letterSpacing: -2,
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  featured: {
    marginBottom: 64,
    width: '100%',
    height: 'auto',
    aspectRatio: 155 / 57,
    borderRadius: 8,
    overflow: 'hidden',
  },
  reactLogo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
