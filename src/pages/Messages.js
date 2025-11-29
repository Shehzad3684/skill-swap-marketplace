import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, Paper, Box, Divider } from '@mui/material';
import { collection, addDoc, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import { requestNotificationPermission, sendNotification } from '../utils/notifications';
import { useLocation } from 'react-router-dom';
import SEO from '../components/SEO';

function Messages() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [recipient, setRecipient] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.recipientId) {
      setRecipient(location.state.recipientId);
    }
  }, [location]);

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
        orderBy('timestamp', 'asc') // Changed to asc for chat-like flow
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const newMessages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMessages(newMessages);
        
        // Check for new messages and send notifications (simplified logic)
        // In a real app, you'd want to track 'read' status.
      });
      return unsubscribe;
    }
  }, [user]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() && recipient) {
      try {
        await addDoc(collection(firestore, 'messages'), {
          text: newMessage,
          sender: user.uid,
          recipient: recipient,
          participants: [user.uid, recipient],
          timestamp: new Date()
        });
        setNewMessage('');
      } catch (error) {
        console.error("Error sending message: ", error);
        alert("Could not send message. Please check the Recipient ID.");
      }
    }
  };

  if (!user) {
    return <Typography>Please sign in to view your messages.</Typography>;
  }

  // Filter messages to show only conversation with selected recipient if one is selected
  // Or just show all messages. For this basic implementation, showing all messages might be confusing if mixed.
  // Ideally we should group by conversation.
  // For now, I will just filter by recipient if a recipient is entered, otherwise show all.

  const displayMessages = recipient
    ? messages.filter(m => (m.sender === recipient && m.recipient === user.uid) || (m.sender === user.uid && m.recipient === recipient))
    : messages;

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <SEO title="Messages" description="Chat with your matched peers." />
      <Typography variant="h4" gutterBottom>Messages</Typography>

      <Paper elevation={3} sx={{ p: 2, height: '60vh', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flexGrow: 1, overflow: 'auto', mb: 2 }}>
          {displayMessages.length === 0 ? (
            <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center', mt: 4 }}>
              {recipient ? "No messages yet. Start the conversation!" : "Select a match from your profile to start chatting, or enter a User ID."}
            </Typography>
          ) : (
            <List>
              {displayMessages.map((message) => (
                <ListItem key={message.id} sx={{ flexDirection: 'column', alignItems: message.sender === user.uid ? 'flex-end' : 'flex-start' }}>
                  <Paper
                    sx={{
                      p: 1.5,
                      bgcolor: message.sender === user.uid ? 'primary.main' : 'background.paper',
                      color: message.sender === user.uid ? 'primary.contrastText' : 'text.primary',
                      maxWidth: '70%',
                      borderRadius: 2
                    }}
                    elevation={1}
                  >
                    <Typography variant="body1">{message.text}</Typography>
                  </Paper>
                  <Typography variant="caption" sx={{ mt: 0.5, color: 'text.secondary' }}>
                    {message.sender === user.uid ? 'You' : 'Peer'}
                  </Typography>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
        <Divider sx={{ mb: 2 }} />
        <form onSubmit={sendMessage} style={{ display: 'flex', gap: '10px' }}>
          <TextField
            label="Recipient User ID"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ width: '200px' }}
            required
          />
          <TextField
            fullWidth
            label="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            variant="outlined"
            size="small"
          />
          <Button type="submit" variant="contained" color="primary">Send</Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Messages;
