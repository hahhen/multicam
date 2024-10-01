import { Product } from "./Product";
import { ThemedView } from "./ThemedView";
import { FlatList, StyleSheet, View } from "react-native";

interface ProductProps {
    title: string,
    image: string,
    currency: string,
    price: number,
    priceProvider: string,
    likes: number
    empty?: boolean
};

function createRows(list: ProductProps[], columns:number) {
    const rows = Math.floor(list.length / columns); // [A]
    let lastRowElements = list.length - rows * columns; // [B]
    while (lastRowElements !== columns) { // [C]
    list.push({ // [D]
        title: `Blank-${lastRowElements}`,
        image: 'https://via.placeholder.com/150',
        currency: 'USD',
        price: 0,
        priceProvider: 'none',
        likes: 0,
        empty: true
      });
      lastRowElements += 1; // [E]
    }
    return list; // [F]
  }

export function Feed({ list }: { list: ProductProps[] }) {
    return (
        <View>
            <FlatList
                contentContainerStyle={{gap: 64}}
                columnWrapperStyle={{gap: 16}}
                scrollEnabled={false}
                numColumns={2}
                style={styles.container}
                data={createRows(list, 2)}
                renderItem={({ item }) => {
                    if(item.empty) return <View style={{width: '50%'}} />
                    return <Product item={item} />
                }}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 16
    },
})