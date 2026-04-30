import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {
  useNavigation,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
} from 'firebase/firestore';

// @ts-expect-error - firebase module lacks type declarations
import { db } from '../firebase';
import { RootStackParamList } from '../../../../types';
import { useAuth } from '../../src/context/AuthContext';

const GREEN = '#2D9B6F';

type MessagingScreenRouteProp = RouteProp<RootStackParamList, 'MessagingScreen'>;

type Message = {
  id: string;
  senderUid: string;
  text?: string;
  sentAt?: { seconds: number; nanoseconds: number } | Date | null;
  type?: 'text' | string;
  readBy?: string[];
};

export default function MessagingScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<MessagingScreenRouteProp>();
  const { firebaseUser, userProfile } = useAuth();

  const currentUserUid = firebaseUser?.uid || userProfile?.uid;
  const conversationId = route.params.conversationId;
  const otherUserUid = route.params.otherUserUid;
  const otherUserName = route.params.name || 'Chat';

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const flatListRef = useRef<FlatList<Message>>(null);

  useEffect(() => {
    if (!conversationId) {
      setInitialLoading(false);
      return;
    }

    const messagesQuery = query(
      collection(db, 'conversations', conversationId, 'messages'),
      orderBy('sentAt', 'asc')
    );

    const unsubscribe = onSnapshot(
      messagesQuery,
      (snapshot) => {
        const messageList = snapshot.docs.map((messageDoc) => ({
          id: messageDoc.id,
          ...messageDoc.data(),
        })) as Message[];

        setMessages(messageList);
        setInitialLoading(false);
      },
      (error) => {
        console.error('Error listening to messages:', error);
        setInitialLoading(false);
      }
    );

    return () => unsubscribe();
  }, [conversationId]);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !conversationId || !currentUserUid) return;

    const trimmedMessage = messageInput.trim();
    setLoading(true);

    try {
      await addDoc(collection(db, 'conversations', conversationId, 'messages'), {
        senderUid: currentUserUid,
        text: trimmedMessage,
        sentAt: serverTimestamp(),
        type: 'text',
        readBy: [currentUserUid],
      });

      await updateDoc(doc(db, 'conversations', conversationId), {
        lastMessageText: trimmedMessage,
        lastMessageAt: serverTimestamp(),
        lastMessageSenderUid: currentUserUid,
        updatedAt: serverTimestamp(),
      });

      setMessageInput('');
    } catch (error) {
      console.error('Failed to send message:', error);
      Alert.alert('Error', 'Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isOwn = item.senderUid === currentUserUid;

    return (
      <View
        style={[
          styles.messageRow,
          isOwn ? styles.messageRowOutgoing : styles.messageRowIncoming,
        ]}
      >
        <View
          style={[
            styles.messageBubble,
            isOwn ? styles.messageBubbleOutgoing : styles.messageBubbleIncoming,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              isOwn ? styles.messageTextOutgoing : styles.messageTextIncoming,
            ]}
          >
            {item.text || ''}
          </Text>
        </View>
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>You matched with {otherUserName}</Text>
      <Text style={styles.emptySubtitle}>
        Send the first message to start the conversation.
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.userName}>{otherUserName}</Text>
          {!!otherUserUid && <Text style={styles.userSubtext}>Active conversation</Text>}
        </View>

        <View style={{ width: 40 }} />
      </View>

      {initialLoading ? (
        <View style={styles.loaderWrap}>
          <ActivityIndicator size="large" color={GREEN} />
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={[
            styles.messagesList,
            messages.length === 0 && styles.messagesListEmpty,
          ]}
          ListEmptyComponent={renderEmptyState}
          showsVerticalScrollIndicator={false}
        />
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={messageInput}
          onChangeText={setMessageInput}
          placeholder="Type a message..."
          placeholderTextColor="#999"
          editable={!loading}
          multiline
        />

        <TouchableOpacity
          style={[styles.sendBtn, loading && styles.sendBtnDisabled]}
          onPress={handleSendMessage}
          disabled={loading}
        >
          <Text style={styles.sendBtnText}>{loading ? '...' : 'Send'}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  header: {
    marginTop: 36,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerCenter: {
    alignItems: 'center',
    flex: 1,
  },

  backText: {
    color: '#3c5a14',
    fontSize: 18,
    width: 40,
  },

  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
  },

  userSubtext: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },

  loaderWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  messagesList: {
    paddingVertical: 12,
    paddingBottom: 20,
  },

  messagesListEmpty: {
    flexGrow: 1,
    justifyContent: 'center',
  },

  emptyState: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
    marginBottom: 8,
    textAlign: 'center',
  },

  emptySubtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },

  messageRow: {
    marginBottom: 10,
    flexDirection: 'row',
  },

  messageRowOutgoing: {
    justifyContent: 'flex-end',
  },

  messageRowIncoming: {
    justifyContent: 'flex-start',
  },

  messageBubble: {
    maxWidth: '80%',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
  },

  messageBubbleOutgoing: {
    backgroundColor: GREEN,
    borderBottomRightRadius: 6,
  },

  messageBubbleIncoming: {
    backgroundColor: '#f0f0f0',
    borderBottomLeftRadius: 6,
  },

  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },

  messageTextOutgoing: {
    color: '#fff',
  },

  messageTextIncoming: {
    color: '#222',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: 10,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },

  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 120,
    backgroundColor: '#f3f3f3',
    borderRadius: 22,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    color: '#111',
  },

  sendBtn: {
    backgroundColor: GREEN,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },

  sendBtnDisabled: {
    opacity: 0.6,
  },

  sendBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});