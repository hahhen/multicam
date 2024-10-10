import { StyleSheet, ScrollView, type ScrollViewProps, View } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { GestureHandlerRootView, RefreshControl } from 'react-native-gesture-handler';
import { useState } from 'react';

export type ThemedScrollViewProps = ScrollViewProps & {
    lightColor?: string;
    darkColor?: string;
    refreshFunction: Function;
};

export function ThemedScrollView({ style, lightColor, darkColor, refreshFunction, ...otherProps }: ThemedScrollViewProps) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        refreshFunction().then(
            setRefreshing(false)
        )
    };
    return (
        <GestureHandlerRootView>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} nestedScrollEnabled contentContainerStyle={{ padding: 30 }} style={[{ backgroundColor }, styles.container, style]} {...otherProps} />
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 16,
        overflow: 'visible',
    },
});