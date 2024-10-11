import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { SafeAreaView, ScrollView} from 'react-native';
import { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/Colors';
import FitImage from 'react-native-fit-image';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function Page() {
  const { pageid } = useLocalSearchParams<{ pageid?: string }>();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const getContent = () => {
    return fetch(`https://multicam-bcknd.vercel.app/page?pageid=${pageid}`)
      .then(response => response.json())
      .then(json => {
        setContent(json.cameras.query.pages[0].revisions[0].content);
        setTitle(json.cameras.query.pages[0].title);
        setCategories(json.categories);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getContent();
  }, []);
  return (
    loading ? 
    <ThemedView style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <ActivityIndicator size="large" color={Colors.light.tint} />
    </ThemedView> 
    :
    <>
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{ height: '100%', backgroundColor: Colors.light.background }}
        >
          <ThemedView style={{ paddingHorizontal: 30, paddingTop: 30}}>
            <ThemedText style={{ fontSize: 30, fontFamily: "Inter-Bold", lineHeight: 30 }}>{title}</ThemedText>
            <ThemedText style={{ fontSize: 15, color: Colors.light.text, marginBottom: 20 }}>Categories: {categories.map((category) => (
              category+ ", "
            ))}</ThemedText>
          </ThemedView>
          <Markdown style={markdownStyles} rules={rules}>
            {content}
          </Markdown>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const rules = {
  image: (
    node: any,
    children: any,
    parent: any,
    styles: any,
    allowedImageHandlers: any,
    defaultImageHandler: any,
  ) => {
    const { src, alt } = node.attributes;

    // we check that the source starts with at least one of the elements in allowedImageHandlers
    const show =
      allowedImageHandlers.filter((value: any) => {
        return src.toLowerCase().startsWith(value.toLowerCase());
      }).length > 0;

    if (show === false && defaultImageHandler === null) {
      return null;
    }

    const imageProps = {
      indicator: true,
      key: node.key,
      style: styles._VIEW_SAFE_image,
      source: {
        uri: show === true ? src : `${defaultImageHandler}${src}`,
      },
      accessible: false,
      accessibilityLabel: ""
    };

    if (alt) {
      imageProps.accessible = true;
      imageProps.accessibilityLabel = alt;
    }

    return (
      <View key={node.key} style={{width: "100%", aspectRatio: 1}}>
        <Image {...imageProps} />
      </View>
    );
  },
}

const markdownStyles = StyleSheet.create({
  body: {
    backgroundColor: Colors.light.background,
    display: "flex",
    padding: 30,
    fontFamily: "Inter",
    letterSpacing: 0,
    fontSize: 16,
  },
  image: {
    borderRadius: 10,
    overflow: "hidden",
    // flexBasis: 0
  }
})