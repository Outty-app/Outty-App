import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Image } from 'react-native';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Index'>;
};

export default function IndexScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.bg}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
            <View style={styles.profileImageOuterDiv}>
                 <Image
                source={require('../temp-images/hiker_stock.png')}
                style={styles.profileImage}/>
            </View>
           

          <Text style={styles.title}>Welcome to Outty</Text>
          <Text>Main app content goes here.</Text>

          {/* Temp Navigation To Get To Messaging Page */}
            <TouchableOpacity onPress={() => navigation.navigate('Messaging')}>
                <Text>Go to Messaging</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#e8f5f0',
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    height: 500,
    width: '100%',
    maxWidth: 520,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 60,
    marginBottom: 16,
  },
  profileImageOuterDiv: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
  },
});