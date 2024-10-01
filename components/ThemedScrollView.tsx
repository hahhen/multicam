import { StyleSheet, ScrollView, type ScrollViewProps, View } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedScrollViewProps = ScrollViewProps & {
    lightColor?: string;
    darkColor?: string;
};

export function ThemedScrollView({ style, lightColor, darkColor, ...otherProps }: ThemedScrollViewProps) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

    return (
        <ScrollView contentContainerStyle={{padding: 30}} style={[{ backgroundColor }, styles.container, style]} {...otherProps} />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 16,
        overflow: 'visible',
    },
});