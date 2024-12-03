import React from 'react';
import {
  SafeAreaView,
  TextInput,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import type {StackT} from '../../types/stack.type';

import {useLoginForm} from '../../hooks/useLoginForm';
import {login} from '../../services/AuthService';

import {styles} from './LoginScreen.styles';

type PropsT = StackScreenProps<StackT, 'Login'>;

const LoginScreen = ({navigation}: PropsT) => {
  const {
    formValues,
    setFormErrors,
    formErrors,
    handleUserChange,
    handlePasswordChange,
    validateUsername,
    validatePassword,
  } = useLoginForm();

  const handleLogin = async () => {
    try {
      setFormErrors([]);

      const isValidUsername = validateUsername();

      const isValidPassword = validatePassword();

      if (!isValidUsername || !isValidPassword) {
        return;
      }

      await login(formValues.username, formValues.password);

      navigation.reset({
        index: 0,
        routes: [{name: 'Profile'}],
      });
    } catch (err) {
      setFormErrors(prevValues => [
        ...prevValues,
        {
          type: 'login',
          msg: 'Invalid username or password',
        },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Username"
          onChangeText={handleUserChange}
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          onChangeText={handlePasswordChange}
        />
        <FlatList
          bounces={false}
          data={formErrors}
          renderItem={({item}) => {
            return <Text style={styles.textError}>{item.msg}</Text>;
          }}
        />
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
