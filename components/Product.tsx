import { View, Text, StyleSheet, Image } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { Bookmark, Heart } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';

interface ProductProps {
    item: {
        title: string,
        image: string,
        currency: string,
        price: number,
        priceProvider: string,
        likes: number
    }
};

export function Product({ item }: ProductProps) {
    const providerimage = item.priceProvider == 'amazon' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' : 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/EBay_logo.png/640px-EBay_logo.png';
    return (
        <ThemedView style={styles.container}>
            <View style={styles.imagecontainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
            </View>
            <View style={styles.textinfo}>
                <ThemedText style={{letterSpacing: -1}}>{item.title}</ThemedText>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: "center", gap: 5 }}>
                    <ThemedText style={{letterSpacing: -1, fontWeight: 700}}>{item.currency + item.price}</ThemedText>
                    <Image source={{ uri: providerimage }} style={{ width: 50, height: 20, resizeMode: "contain" }} />
                </View>
            </View>
            <View style={styles.action}>
                <Heart size={25} color={Colors.light.tint} />
                <Bookmark size={25} color={Colors.light.tint} />
            </View>
        </ThemedView>
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
    action:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    }
})
