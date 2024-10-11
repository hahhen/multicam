import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { Bookmark, Heart } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { Href, Link } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
import { useEffect, useState } from 'react';

interface ProductProps {
    item: {
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
};

export function Product({ item }: ProductProps) {
    const [liked, setLiked] = useState(item.isLiked);
    const [bookmarked, setBookmarked] = useState(item.isBookmarked)
    const { user } = useUser();

    const updateLiked = async (isLiked: boolean) => {
        if (isLiked){
            await fetch(`https://multicam-bcknd.vercel.app/like/?cameraId=${item.pageid}&userId=${user?.id}`, {
                method: 'POST'
            });
        }else if(!isLiked){
            await fetch(`https://multicam-bcknd.vercel.app/like/?operation=delete&cameraId=${item.pageid}&userId=${user?.id}`, {
                method: 'POST'
            });
        }
    }

    const updateBookmarked = async (isBookmarked: boolean) => {
        if (isBookmarked){
            await fetch(`https://multicam-bcknd.vercel.app/bookmark/?cameraId=${item.pageid}&userId=${user?.id}`, {
                method: 'POST'
            });
        }else if(!isBookmarked){
            await fetch(`https://multicam-bcknd.vercel.app/bookmark/?operation=delete&cameraId=${item.pageid}&userId=${user?.id}`, {
                method: 'POST'
            });
        }
    }

    const providerimage = item.priceProvider == 'amazon' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' : 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/EBay_logo.png/640px-EBay_logo.png';
    return (
        <Link href={`/page?pageid=${item.pageid}` as Href} asChild>
            <Pressable style={styles.container}>
                <View style={styles.imagecontainer}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                </View>
                <View style={styles.textinfo}>
                    <ThemedText style={{ letterSpacing: -1, fontSize: 15 }}>{item.title}</ThemedText>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: "center", gap: 5 }}>
                        <ThemedText style={{ letterSpacing: -0.5, fontFamily: "Inter-Bold" }}>{item.currency + " " + item.price}</ThemedText>
                        <Image source={{ uri: providerimage }} style={{ width: 50, height: 20, resizeMode: "contain" }} />
                    </View>
                </View>
                <View style={styles.action}>
                    <Pressable onPress={() => {
                        updateLiked(!liked)
                        setLiked(!liked)
                    }} style={{flexGrow: 1, justifyContent: 'center', alignItems: "center"}}>
                        <Heart size={25} color={Colors.light.tint} fill={liked ? Colors.light.tint : Colors.light.background}/>
                    </Pressable>
                    <Pressable onPress={() => {
                        updateBookmarked(!bookmarked)
                        setBookmarked(!bookmarked)
                    }} style={{flexGrow: 1, justifyContent: 'center', alignItems: "center"}}>
                        <Bookmark size={25} color={Colors.light.tint} fill={bookmarked ? Colors.light.tint : Colors.light.background}/>
                    </Pressable>
                </View>
            </Pressable>
        </Link>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexBasis: 0,
        gap: 15
    },
    imagecontainer: {
        aspectRatio: 1,
        width: '100%',
        height: 'auto',
    },
    image: {
        borderRadius: 8,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    textinfo: {
        display: 'flex',
        flexDirection: 'column',
    },
    action: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    }
})
