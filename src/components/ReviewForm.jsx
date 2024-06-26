import { View, TextInput, StyleSheet, Pressable } from 'react-native'
import Text from './Text';
import { Formik } from 'formik';
import usePostReview from '../hooks/UsePostReview';
import * as yup from 'yup';

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

const postReviewSchema = yup.object().shape({
    ownerName: yup.string().required('Owner name is required'),
    rating: yup.string().required('Rating is required'),
    repositoryName: yup.string().required('Repository name is required'),
  });
  
  const handleSubmit = async (values, postReview) => {
    const { ownerName, rating, repositoryName, text } = values;
  
    try {
      await postReview({ ownerName, rating, repositoryName, text });
    } catch (e) {
      console.log(e);
    }
  };

const ReviewFormContainer = () => {
    const [postReview, { data, loading, error }] = usePostReview();

    console.log(data)

    return (
        <Formik
          validationSchema={postReviewSchema}
          initialValues={{ ownerName: '', rating: '', repositoryName: '', text: '' }}
          onSubmit={(values) => handleSubmit(values, postReview)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View style={styles.formContainer}>
              <TextInput
                style={styles.inputBox}
                placeholder="Repository Owner Name"
                onChangeText={handleChange('ownerName')}
                onBlur={handleBlur('ownerName')}
                value={values.ownerName}
              />
              {errors.ownerName && <Text style={{ color: 'red' }}>{errors.ownerName}</Text>}
              <TextInput
                style={styles.inputBox}
                placeholder="Rating"
                onChangeText={handleChange('rating')}
                onBlur={handleBlur('rating')}
                value={values.rating}
              />
              {errors.rating && <Text style={{ color: 'red' }}>{errors.rating}</Text>}
              <TextInput
                style={styles.inputBox}
                placeholder="Repository Name"
                onChangeText={handleChange('repositoryName')}
                onBlur={handleBlur('repositoryName')}
                value={values.repositoryName}
              />
              {errors.repositoryName && <Text style={{ color: 'red' }}>{errors.repositoryName}</Text>}
              <TextInput
                style={styles.inputBox}
                placeholder="Text..."
                onChangeText={handleChange('text')}
                onBlur={handleBlur('text')}
                value={values.text}
              />
              {errors.text && <Text style={{ color: 'red' }}>{errors.text}</Text>}
              <Pressable onPress={handleSubmit} title="Submit"><Text>Submit</Text></Pressable>
            </View>
          )}
        </Formik>
      );
}

const ReviewForm = () => {
    return <ReviewFormContainer />
}

export default ReviewForm