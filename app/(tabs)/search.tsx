import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { ThemedScrollView } from '@/components/ThemedScrollView';
import { Search } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';

export default function TabTwoScreen() {
  const [isActive, setIsActive] = React.useState(false);
  const [query, setQuery] = React.useState('');
  return (
    <ThemedScrollView>
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
          }}
          style={{ flex: 1, marginLeft: 10 }}
        />
      </View>
      {isActive && <Text>{query}</Text>}
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 8,
    padding: 10,
    backgroundColor: Colors.light.secondaryBackground,
  }
});
