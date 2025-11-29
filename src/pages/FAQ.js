import React from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';

function FAQ() {
  const faqs = [
    {
      question: "How does Skill Swap work?",
      answer: "Skill Swap connects users who want to learn a skill with those who can teach it. You list the skills you have and the skills you want to learn. Our matching algorithm suggests potential swap partners. You can then message them to arrange a session."
    },
    {
      question: "Is it free to use?",
      answer: "Yes! Skill Swap is currently free for all users. Our goal is to build a community of learners. We may introduce premium features in the future, but the core functionality of swapping skills will remain free."
    },
    {
      question: "How do I ensure safety when meeting someone?",
      answer: "We recommend conducting initial sessions via video call. If you choose to meet in person, always meet in a public place and let a friend or family member know where you are going. Please review our safety guidelines for more details."
    },
    {
      question: "Can I swap skills if I'm a beginner?",
      answer: "Absolutely! Everyone has something to teach. Even if you are a beginner in one area, you likely have expertise in another (e.g., your native language, a hobby, or professional experience) that someone else wants to learn."
    },
    {
      question: "What happens if a match doesn't work out?",
      answer: "No problem. You are under no obligation to continue swapping with anyone. Simply be polite and move on to find another match that better suits your learning style and schedule."
    }
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <SEO title="FAQ" description="Frequently Asked Questions about Skill Swap Marketplace." />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h3" align="center" gutterBottom sx={{ fontFamily: '"Orbitron", sans-serif', mb: 6 }}>
          Frequently Asked Questions
        </Typography>

        <Box>
          {faqs.map((faq, index) => (
            <Accordion key={index} sx={{ mb: 2, bgcolor: 'background.paper' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography variant="h6">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" color="text.secondary">
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </motion.div>
    </Container>
  );
}

export default FAQ;
