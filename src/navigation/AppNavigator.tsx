import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Compass, Clock, MapPin, Sparkles } from 'lucide-react-native';

import { Colors, Typography, Spacing } from '../theme';
import { RootTabParamList, RootStackParamList } from '../types';

// Screens
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import TimelineScreen from '../screens/TimelineScreen';
import MapScreen from '../screens/MapScreen';
import AIStudyScreen from '../screens/AIStudyScreen';
import CharacterScreen from '../screens/CharacterScreen';

// Lazy text import for tab labels
import { Text } from 'react-native';

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.goldAccent,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ color, size }) => {
          const iconSize = 22;
          switch (route.name) {
            case 'Home':
              return <Home size={iconSize} color={color} strokeWidth={1.8} />;
            case 'Explore':
              return <Compass size={iconSize} color={color} strokeWidth={1.8} />;
            case 'Timeline':
              return <Clock size={iconSize} color={color} strokeWidth={1.8} />;
            case 'Map':
              return <MapPin size={iconSize} color={color} strokeWidth={1.8} />;
            case 'AIStudy':
              return <Sparkles size={iconSize} color={color} strokeWidth={1.8} />;
          }
        },
        tabBarLabel: ({ color }) => {
          const labels: Record<string, string> = {
            Home: 'Home',
            Explore: 'Explore',
            Timeline: 'Timeline',
            Map: 'Map',
            AIStudy: 'AI Study',
          };
          return (
            <Text style={[styles.tabLabel, { color }]}>
              {labels[route.name]}
            </Text>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Timeline" component={TimelineScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="AIStudy" component={AIStudyScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen
          name="Character"
          component={CharacterScreen}
          options={{
            animation: 'slide_from_right',
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.backgroundSecondary,
    borderTopColor: Colors.divider,
    borderTopWidth: 1,
    height: Platform.OS === 'ios' ? 84 : 64,
    paddingTop: Spacing.sm,
    paddingBottom: Platform.OS === 'ios' ? Spacing.lg : Spacing.sm,
  },
  tabLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 10,
    marginTop: 2,
  },
});
