import { Image, StyleSheet, Platform, ScrollView } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { ThemedScrollView } from '@/components/ThemedScrollView';
import { Feed } from '@/components/Feed';

export default function HomeScreen() {
  const list = [
    {
      title: "Fujifilm X-T4",
      image: "http://farm6.staticflickr.com/5075/5908389383_c69efcc2d7.jpg",
      currency: "$",
      price: 310.99,
      priceProvider: "ebay",
      likes: 30
    },
    {
      title: "Camera",
      image: "http://farm6.staticflickr.com/5075/5908389383_c69efcc2d7.jpg",
      currency: "$",
      price: 430.99,
      priceProvider: "amazon",
      likes: 30
    },
    {
      title: "Camera",
      image: "http://farm6.staticflickr.com/5075/5908389383_c69efcc2d7.jpg",
      currency: "$",
      price: 430.99,
      priceProvider: "amazon",
      likes: 30
    },
    

  ]
  return (
    <ThemedScrollView>
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
      <Feed list={list} />
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
