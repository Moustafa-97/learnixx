import { FAQData } from '@/types/faq';

export const faqData: FAQData = {
  title: "Frequently Asked Questions",
  items: [
    {
      id: "panel1",
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all unused items in their original packaging. Please contact our customer service team to initiate a return."
    },
    {
      id: "panel2", 
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 3-5 business days within the continental US. Express shipping options are available for faster delivery."
    },
    {
      id: "panel3",
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to most countries worldwide. International shipping times vary by location and typically take 7-14 business days."
    },
    {
      id: "panel4",
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can use this number to track your package on our website or the carrier's site."
    },
    {
      id: "panel5",
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, Apple Pay, Google Pay, and other secure payment methods at checkout."
    }
  ]
};