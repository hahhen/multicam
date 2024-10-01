import { Tabs } from 'expo-router';
import React from 'react';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Bell, Home, Search, User } from 'lucide-react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle:{height: 80},
        tabBarItemStyle:{justifyContent: 'center'},
        tabBarLabelPosition: 'below-icon',
        tabBarLabelStyle: { fontSize: 10, marginTop: 5 },
        tabBarIconStyle: { maxHeight: 24,},
        tabBarActiveTintColor: Colors.light.tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Home fillOpacity={focused ? 1 : 0} fill={color} color={color}/>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <Search fillOpacity={focused ? 1 : 0} fill={color} color={color}/>
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color, focused }) => (
            <Bell fillOpacity={focused ? 1 : 0} fill={color} color={color}/>
          ),
        }}
      />
      <Tabs.Screen
        name="(account)"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <User fillOpacity={focused ? 1 : 0} fill={color} color={color}/>
          ),
        }}
      />
    </Tabs>
  );
}
