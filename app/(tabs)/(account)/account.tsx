import { StyleSheet, Image, Platform, View, TextInput, Button, Text, Pressable, useWindowDimensions } from 'react-native';
import * as React from 'react'
import { useSignUp } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { ThemedText } from '@/components/ThemedText';
import { useUser } from '@clerk/clerk-expo'
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Camera, PenBox } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState, useEffect } from 'react';
import { Feed } from '@/components/Feed';
import { ThemedScrollView } from '@/components/ThemedScrollView';
import { Tabs } from 'react-native-collapsible-tab-view'
import { GestureHandlerRootView, NativeViewGestureHandler, RefreshControl } from 'react-native-gesture-handler';

interface ProductProps {
  title: string,
  image: string,
  currency: string,
  price: number,
  priceProvider: string,
  likes: number
  pageid: number
  isLiked?: boolean
  isBookmarked?: boolean
}

const HEADER_HEIGHT = 250

export function LikedScreen({ likedList }: { likedList: ProductProps[] }) {
  return (
    <Feed list={likedList} />
  )
}

export function BookmarkedList({ bookmarkedList }: { bookmarkedList: ProductProps[] }) {
  return (
    <Feed list={bookmarkedList} />
  )
}


export default function TabThreeScreen() {
  const { user } = useUser()
  const [likedList, setLikedList] = useState<ProductProps[]>([])
  const [bookmarkedList, setBookmarkedList] = useState<ProductProps[]>([])
  const [index, setIndex] = useState(0);
  const layout = useWindowDimensions();
  const [routes] = useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);


  const getLikedList = () => {
    return fetch(`https://multicam-bcknd.vercel.app/like?userId=${user?.id}`)
      .then(response => response.json())
      .then(json => {
        let preLikedList: ProductProps[] = []
        json.likes.map((like: any) => {
          preLikedList.push(like.camera)
        })
        setLikedList(preLikedList)
      })
      .catch(error => {
        console.error(error);
      });
  };

  const getBookmarkedList = () => {
    return fetch(`https://multicam-bcknd.vercel.app/bookmark?userId=${user?.id}`)
      .then(response => response.json())
      .then(json => {
        let preBookmarkedList: ProductProps[] = []
        json.bookmarks.map((bookmark: any) => {
          preBookmarkedList.push(bookmark.camera)
        })
        setBookmarkedList(preBookmarkedList)
      })
      .catch(error => {
        console.error(error);
      });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0].base64) {
      const base64 = result.assets[0].base64;
      const mimeType = result.assets[0].mimeType;

      const image = `data:${mimeType};base64,${base64}`;

      uploadImage(image);
    }
  }

  const uploadImage = async (imagebase64: string) => {
    user?.setProfileImage({ file: imagebase64 })
      .then((res) => console.log(res))
      .catch((error) => console.log('An error occurred:', error.errors))
  }

  useEffect(() => {
    getLikedList()
    getBookmarkedList()
  }, [])

  useEffect(() => {
  }, [user]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    getLikedList().then(() =>
      getBookmarkedList()
    ).finally(() => {
      setRefreshing(false);
    })
  }

  return (
    <GestureHandlerRootView>
      <Tabs.Container
        renderHeader={() => (
          <View style={styles.accountContainer}>
            {user?.hasImage ?
              <View style={{ position: 'relative' }}>
                <Image source={{ uri: user?.imageUrl }} style={{ width: 100, height: 100, borderRadius: 50 }} />
                <Pressable onPress={pickImage} style={styles.editPictureTopBtn}><PenBox color={Colors.light.text} size={14} /></Pressable>
              </View>
              :
              <Pressable onPress={pickImage} style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: Colors.light.secondaryBackground, justifyContent: 'center', alignItems: 'center' }}>
                <Camera size={30} color={Colors.light.tint} />
              </Pressable>
            }
            <View>
              <ThemedText style={styles.username}>{user?.username}</ThemedText>
              <ThemedText style={styles.smallText}>{user?.primaryEmailAddress?.emailAddress}</ThemedText>
              <View style={{ gap: 24, flexDirection: 'row' }}>
                <View style={styles.statLabelContainer}>
                  <ThemedText style={[styles.smallText, { fontWeight: 'bold' }]}>{likedList.length}</ThemedText><ThemedText style={styles.smallText}>&nbsp;likes</ThemedText>
                </View>
                <View style={styles.statLabelContainer}>
                  <ThemedText style={[styles.smallText, { fontWeight: 'bold' }]}>{bookmarkedList.length}</ThemedText><ThemedText style={styles.smallText}>&nbsp;bookmarks</ThemedText>
                </View>
              </View>
            </View>
          </View>
        )}
        headerHeight={HEADER_HEIGHT} // optional
      >
        <Tabs.Tab name="Liked">
          <Tabs.ScrollView style={styles.scrollView} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => onRefresh()} />}>
            <Feed list={[...likedList]} />
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab name="Bookmarked">
          <Tabs.ScrollView style={styles.scrollView} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => onRefresh()} />}>
            <Feed list={[...bookmarkedList]} />
          </Tabs.ScrollView>
        </Tabs.Tab>
      </Tabs.Container>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    padding: 30,
    backgroundColor: Colors.light.background,
  },
  container: {
    flex: 1,
  },
  smallText: {
    fontSize: 14,
    lineHeight: 14
  },
  input: {
    borderRadius: 8,
    padding: 10,
    backgroundColor: Colors.light.secondaryBackground,
  },
  accountContainer: {
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 32,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 24,
    letterSpacing: -1.5,
  },
  statLabelContainer: {
    marginTop: 10,
    flexDirection: 'row',
    letterSpacing: -1,
  },
  editPictureTopBtn: {
    padding: 8,
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: 15,
    backgroundColor: Colors.light.secondaryBackground,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
