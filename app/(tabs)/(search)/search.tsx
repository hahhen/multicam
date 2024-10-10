import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from 'react-native';
import { ThemedScrollView } from '@/components/ThemedScrollView';
import { Scroll, Search } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { ThemedView } from '@/components/ThemedView';
import { Feed } from '@/components/Feed';
import Pagination from '@cherry-soft/react-native-basic-pagination';
import { useUser } from '@clerk/clerk-expo';

export default function TabTwoScreen() {
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

  const [isActive, setIsActive] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [cameras, setCameras] = React.useState<ProductProps[]>([]);
  const [page, setPage] = React.useState(1);
  const [totalItems, setTotalItems] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const { isSignedIn, user } = useUser();

  const getCameras = () => {
    if (query != '') {
      setLoading(true);
      return fetch(`https://multicam-bcknd.vercel.app/search?q=${query}&page=${page}${isSignedIn ? `&userId=${user.id}` : ''}`)
        .then(response => response.json())
        .then(json => {
          setCameras(json.cameras);
          setTotalItems(json.totalItems);
          setLoading(false);
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
        });
    }
  };

  React.useEffect(() => {
    getCameras();
  }, [page]);
  return (
    <ThemedView style={{ height: "100%" }}>
      <View style={styles.header}>
        <View style={styles.input}>
          <Search color={Colors.light.text} size={24} />
          <TextInput
            autoCorrect={false}
            value={query}
            onChangeText={(query) => setQuery(query)}
            placeholder="Search"
            onFocus={() => {
              setIsActive(true);
            }}
            onBlur={() => {
              setIsActive(false);
              getCameras();
            }}
            style={{ flex: 1, marginLeft: 10 }}
          />
        </View>
      </View>
      {cameras.length > 0 &&
        <>
          <Pagination
            showLastPagesButtons
            pagesToDisplay={2}
            btnStyle={styles.btnStyle}
            activeBtnStyle={styles.activeBtnStyle}
            textStyle={styles.textStyle}
            totalItems={totalItems}
            pageSize={10}
            currentPage={page}
            onPageChange={setPage}
          />
          {!loading &&
            <ThemedScrollView refreshFunction={getCameras} style={{ overflow: "hidden" }}>
              <Feed list={cameras} />
            </ThemedScrollView>
          }
        </>
      }
      {loading &&
        <ActivityIndicator size="large" color={Colors.light.tint} style={{ padding: 50 }} />
      }
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: "Inter",
    fontSize: 8,
    letterSpacing: -1.2,
    padding: 0,
  },
  activeBtnStyle: {
    backgroundColor: Colors.light.tint,
    borderWidth: 2,
    borderColor: "#7A5175",
  },
  btnStyle: {
    backgroundColor: Colors.light.tint,
    borderRadius: 8,
    borderWidth: 0,
    height: 30,
    width: 38,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    paddingHorizontal: 30,
  },
  input: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 8,
    padding: 10,
    backgroundColor: Colors.light.secondaryBackground,
  }
});
