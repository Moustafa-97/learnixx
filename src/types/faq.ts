export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQData {
  title: string;
  items: FAQItem[];
}