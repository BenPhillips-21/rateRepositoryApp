import { useContext } from 'react';
import AuthStorageContext from '../contexts/AuthStorageContext';

const UseAuthStorage = () => {
  return useContext(AuthStorageContext);
};

export default UseAuthStorage;