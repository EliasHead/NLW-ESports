import * as Notications from 'expo-notifications'


export async function getPushNotificationToken() {
  const { granted } = await Notications.getPermissionsAsync()

  if(!granted) {
    await Notications.requestPermissionsAsync()
  }

  if(granted) {
    const pushToken = await Notications.getExpoPushTokenAsync()

    return pushToken.data
  }
}