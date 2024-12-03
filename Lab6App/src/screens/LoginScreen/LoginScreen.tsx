import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  SafeAreaView,
  TextInput,
  Button,
  Text,
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import type {StackT} from '../../types/stack.type';

import {login} from '../../services/AuthService';

type PropsT = StackScreenProps<StackT, 'Login'>;

const mayusRgx = /[A-Z]/;
const minusRgx = /[a-z]/;
const numberRgx = /[0-9]/;
const specialCharRgx = /[^\w\d\s]/;

const LoginScreen = ({navigation}: PropsT) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [disableButton, setDisableButton] = useState<boolean>(true);

  const areCredentialValids = useCallback(() => {
    if (username === '' || password === '') {
      setDisableButton(true);
    } else if (username.length > 0 && isPasswordValid) {
      setDisableButton(false);
    }
  }, [username, password, isPasswordValid]);

  useEffect(() => {
    areCredentialValids();
  }, [password, areCredentialValids]);

  const handleUserChange = (text: string) => {
    setUsername(text);
  };

  const handlePasswordChange = (text: string) => {
    let _passWordErrors = [];

    if (!mayusRgx.test(text)) {
      _passWordErrors.push('Password must contain at least one uppercase');
      setIsPasswordValid(false);
    }
    if (!minusRgx.test(text)) {
      _passWordErrors.push('Password must contain at least one lowercase');
      setIsPasswordValid(false);
    }
    if (!numberRgx.test(text)) {
      _passWordErrors.push('Password must contain at least one number');
      setIsPasswordValid(false);
    }
    if (!specialCharRgx.test(text)) {
      _passWordErrors.push(
        'Password must contain at least one special character',
      );
      setIsPasswordValid(false);
    }

    setPassword(text);

    if (_passWordErrors.length > 0) {
      setPasswordErrors(_passWordErrors);
    } else if (!isPasswordValid) {
      setPasswordErrors([]);
      setIsPasswordValid(true);
    }

    areCredentialValids();
  };

  const handleLogin = async () => {
    try {
      await login(username, password);

      navigation.reset({
        index: 0,
        routes: [{name: 'Profile'}],
      });
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <SafeAreaView>
      <TextInput
        placeholder="Username"
        onChangeText={handleUserChange}
        autoCapitalize="none"
      />
      <View>
        <TextInput
          placeholder="Password"
          secureTextEntry
          onChangeText={handlePasswordChange}
        />
        <FlatList
          data={passwordErrors}
          renderItem={({item}) => {
            return <Text>{item}</Text>;
          }}
        />
      </View>
      <Button title="Login" onPress={handleLogin} disabled={disableButton} />
      {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
    </SafeAreaView>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  errorMessage: {
    color: 'red',
  },
});
