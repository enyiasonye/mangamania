import { useSearchParams } from 'expo-router/build/hooks';
import { Text } from 'react-native';

const index = () => {
  // @ts-expect-error
  const { title } = useSearchParams();
  return <Text>TITLE: {title}</Text>;
};

export default index;
