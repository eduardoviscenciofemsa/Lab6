import React from 'react';
import {SafeAreaView, Text, Button} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import type {StackT} from '../../types/stack.type';

import {logout} from '../../services/AuthService';

type PropsT = StackScreenProps<StackT, 'Profile'>;

const ProfileScreen = ({navigation}: PropsT) => {
  const handleLogout = async () => {
    await logout();
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  return (
    <SafeAreaView>
      <Text>Welcome to the Profile Screen!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </SafeAreaView>
  );
};

export default ProfileScreen;
