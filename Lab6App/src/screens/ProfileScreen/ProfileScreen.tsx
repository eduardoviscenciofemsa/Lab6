import React from 'react';
import {SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import type {StackT} from '../../types/stack.type';

import {logout} from '../../services/AuthService';

import {styles} from './ProfileScreen.styles';

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
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Welcome to the Profile Screen!</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.button}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
