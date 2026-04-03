import React, { forwardRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  useColorScheme,
} from 'react-native';

type Props = TextInputProps & {
  label: string;
  required?: boolean;
};

export const Input = forwardRef<TextInput, Props>(
  ({ label, required, style, ...props }, ref) => {
    const scheme = useColorScheme();
    const isDark = scheme === 'dark';

    const colors = {
      background: isDark ? '#1c1c1e' : '#f2f2f7',
      text: isDark ? '#fff' : '#000',
      label: isDark ? '#aaa' : '#555',
      border: isDark ? '#2c2c2e' : '#ddd',
    };

    return (
      <View style={styles.wrapper}>
        <Text style={[styles.label, { color: colors.label }]}>
          {label} {required && '*'}
        </Text>

        <TextInput
          ref={ref}
          placeholderTextColor={colors.label}
          style={[
            styles.input,
            {
              backgroundColor: colors.background,
              color: colors.text,
              borderColor: colors.border,
            },
            style,
          ]}
          {...props}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  wrapper: {
    gap: 6,
  },
  label: {
    fontSize: 12,
  },
  input: {
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
  },
});