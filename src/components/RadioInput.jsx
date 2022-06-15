import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

export default function RadioInput({ label, value, setValue, size = 'big' }) {
  const selected = label === value;
  return (
    <TouchableOpacity onPress={() => setValue(label)}>
      <View style={styles.container}>
        <View
          style={[
            styles.outerCircle,
            selected && styles.selectedOuterCircle,
            size === 'big' && styles.bigOuterCircle,
          ]}
        >
          <View
            style={[
              styles.innerCircle,
              selected && styles.selectedInnerCircle,
              size === 'big' && styles.bigInnerCircle,
            ]}
          />
        </View>
        <Text style={styles.radioText}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  outerCircle: {
    height: 20,
    width: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#cfcfcf',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    height: 10,
    width: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#cfcfcf',
  },
  radioText: {
    marginLeft: 10,
    fontSize: 'bold',
  },
  selectedOuterCircle: {
    borderColor: 'orange',
  },
  selectedInnerCircle: {
    borderColor: 'orange',
    backgroundColor: 'orange',
  },
  bigOuterCircle: {
    height: 30,
    width: 30,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#cfcfcf',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigInnerCircle: {
    height: 15,
    width: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#cfcfcf',
  },
});
