import { useEffect, useRef } from 'react';
import { StatusBar } from 'react-native';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter'
import { Subscription } from 'expo-modules-core'
import * as Notications from 'expo-notifications'

import { Routes } from './src/routes';
import { Background } from './src/components/Background'
import { Loading } from './src/components/Loading';

import './src/services/noticationConfigs'
import { getPushNotificationToken } from './src/services/getPushNotificationToken'
import { Notification } from 'phosphor-react-native';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  })
  
  const getNotificationListener = useRef<Subscription>()
  const responseNtoficationListener = useRef<Subscription>()

  useEffect(() => {
    getPushNotificationToken()
  })

  useEffect(() => {
    getNotificationListener.current = Notications
    .addNotificationReceivedListener(notification => {
      console.log(notification)
    })

    responseNtoficationListener.current = Notications
    .addNotificationResponseReceivedListener(response => {
      console.log(response)
    })

    return () => {
      if(getNotificationListener.current && responseNtoficationListener.current) {
        Notications.removeNotificationSubscription(getNotificationListener.current)
        Notications.removeNotificationSubscription(responseNtoficationListener.current)
      }
    }
  },[])

  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Routes /> : <Loading />}
    </Background>
  );
}
