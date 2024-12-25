import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useColorScheme } from '~/lib/useColorScheme';
import TabBarBackground from '~/components/ui/TabBarBackground';
import { HapticTab } from '~/components/ui/HapticTab';
import { NAV_THEME } from '~/lib/constants';

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  const fillColor = NAV_THEME[colorScheme ?? 'light'].primary;
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: fillColor,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Library',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'book-sharp' : 'book-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="browse"
        options={{
          title: 'Browse',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'paper-plane-sharp' : 'paper-plane-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={
                focused
                  ? 'ellipsis-horizontal-sharp'
                  : 'ellipsis-horizontal-outline'
              }
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
