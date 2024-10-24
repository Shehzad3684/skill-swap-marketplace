import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import { collection, addDoc, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import { requestNotificationPermission, sendNotification } from '../utils/notifications';

function Messages() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [recipient, setRecipient] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    if (user) {
      const q = query(
        collection(firestore, 'messages'),
        where('participants', 'array-contains', user.uid),
        orderBy('timestamp', 'desc')
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const newMessages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMessages(newMessages);
        
        // Check for new messages and send notifications
        newMessages.forEach(message => {
          if (message.sender !== user.uid && !messages.some(m => m.id === message.id)) {
            sendNotification('New Message', `From: ${message.sender}\n${message.text}`);
          }
        });
      });
      return unsubscribe;
    }
  }, [user, messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() && recipient) {
      await addDoc(collection(firestore, 'messages'), {
        text: newMessage,
        sender: user.uid,
        recipient: recipient,
        participants: [user.uid, recipient],
        timestamp: new Date()
      });
      setNewMessage('');
    }
  };

  if (!user) {
    return <Typography>Please sign in to view your messages.</Typography>;
  }

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>Messages</Typography>
      <List>
        {messages.map((message) => (
          <ListItem key={message.id}>
            <ListItemText 
              primary={message.text} 
              secondary={`From: ${message.sender === user.uid ? 'You' : message.sender}`} 
            />
          </ListItem>
        ))}
      </List>
      <form onSubmit={sendMessage}>
        <TextField
          fullWidth
          label="Recipient User ID"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="New Message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">Send Message</Button>
      </form>
    </Container>
  );
}

export default Messages;