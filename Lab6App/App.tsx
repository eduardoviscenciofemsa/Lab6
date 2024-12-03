import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen, ProfileScreen} from './src/screens';
import {StackT} from './src/types/stack.type';
import {getToken} from './src/utils/storage';
import {ActivityIndicator, View} from 'react-native';

const Stack = createStackNavigator<StackT>();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await getToken('user');

      if (token) {
        setIsAuthenticated(true);
      }

      setIsLoading(false);
    };

    checkAuthentication();
  });

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={!isAuthenticated ? 'Login' : 'Profile'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
