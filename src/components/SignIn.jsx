import React from 'react';
import { Button, TextInput, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/UseSignIn';
import Text from './Text';

const styles = StyleSheet.create({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    borderWidth: 1,
    borderColor: 'black',
    width: 320,
    margin: 5,
    padding: 10, 
  },
});

const loginSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const handleSubmit = async (values, signIn) => {
  const { username, password } = values;

  try {
    await signIn({ username, password });
  } catch (e) {
    console.log(e);
  }
};

export const SignInContainer = ({ handleSubmit }) => {
  const [signIn, { data, loading, error }] = useSignIn();

  return (
    <Formik
      validationSchema={loginSchema}
      initialValues={{ username: '', password: '' }}
      onSubmit={(values) => handleSubmit(values, signIn)}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.inputBox}
            placeholder="Username..."
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            value={values.username}
          />
          {errors.username && <Text style={{ color: 'red' }}>{errors.username}</Text>}
          <TextInput
            style={styles.inputBox}
            placeholder="Password..."
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            secureTextEntry={true}
          />
          {errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
          <Button onPress={handleSubmit} title="Submit" />
        </View>
      )}
    </Formik>
  );
};

const SignIn = () => {
  return <SignInContainer handleSubmit={handleSubmit} />;
};

export default SignIn;
