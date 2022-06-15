import { StyleSheet, TextInput } from 'react-native';
import React from 'react';
import { colors } from '../themes/colors';

const Input = ({
  placeholder,
  secureTextEntry,
  onChangeText,
  autoCapitalize,
  multiline,
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      style={styles.input}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      autoCapitalize={autoCapitalize}
      multiline={multiline}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    marginBottom: 20,
    paddingLeft: 5,
  },
});
