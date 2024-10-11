import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    letterSpacing: -1,
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    letterSpacing: -1,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Inter-Bold",
  },
  title: {
    letterSpacing: -1,
    fontSize: 32,
    fontFamily: "Inter-Bold",
    lineHeight: 32,
  },
  subtitle: {
    letterSpacing: -1,
    fontSize: 20,
    fontFamily: "Inter-Bold",
  },
  link: {
    letterSpacing: -1,
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
