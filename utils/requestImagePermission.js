import * as ImagePicker from 'expo-image-picker';

export async function requestImagePermission() {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (status !== 'granted') {
    alert('Permission to access gallery is required!');
    return false;
  }

  return true;
}