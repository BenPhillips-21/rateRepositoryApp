import React from 'react';
import { Pressable, TextInput, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import useSignUp from '../hooks/UseSignUp';
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
    borderRadius: '20%',
    margin: 5,
    padding: 10, 
  },
  submitButton: {
    backgroundColor: '#0366d6',
    padding: 10,
    borderRadius: '20%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14
  },
});

const loginSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
  confirmedPassword: yup.string()
  .oneOf([yup.ref('password'), null])
  .required('Password confirm is required')
});

const handleSubmit = async (values, signUp) => {
  const { username, password } = values;

  try {
    await signUp({ username, password });
  } catch (e) {
    console.log(e);
  }
};

export const SignUpContainer = ({ handleSubmit }) => {
  const [signUp, { data, loading, error }] = useSignUp();

  return (
    <Formik
      validationSchema={loginSchema}
      initialValues={{ username: '', password: '', confirmedPassword: '' }}
      onSubmit={(values) => handleSubmit(values, signUp)}
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
          <TextInput
            style={styles.inputBox}
            placeholder="Confirm Password..."
            onChangeText={handleChange('confirmedPassword')}
            onBlur={handleBlur('confirmedPassword')}
            value={values.confirmedPassword}
            secureTextEntry={true}
          />
          {errors.confirmedPassword && <Text style={{ color: 'red' }}>{errors.confirmedPassword}</Text>}
          <Pressable style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

const SignUp = () => {
  return <SignUpContainer handleSubmit={handleSubmit} />;
};

export default SignUp;
