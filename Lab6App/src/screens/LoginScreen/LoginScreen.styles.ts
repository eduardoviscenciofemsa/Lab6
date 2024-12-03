import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  formContainer: {
    padding: 20,
    gap: 10,
  },
  input: {
    padding: 10,
    borderWidth: 0.4,
    borderRadius: 5,
  },
  textError: {
    color: '#c04657',
    fontWeight: 'bold',
    fontSize: 10,
  },
  button: {
    padding: 10,
    backgroundColor: 'darkturquoise',
    borderRadius: 5,
    alignItems: 'center',
  },
});
