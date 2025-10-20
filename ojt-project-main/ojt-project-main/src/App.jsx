// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Headers/Header";
import Footer from "./components/Footer/Footer";
import ContactPage from "./pages/ContactPage";
import "./styles/pages.css";
import AboutPage from "./pages/AboutPage";
import CoursesPage from "./pages/CoursesPage";
import AdmissionsPage from "./pages/AdmissionsPage";
import NotFoundPage from "./pages/NotFoundPage";
import ChatbotComponent from "./components/Chatbot/ChatbotComponents";
import { useState } from "react";
import DeveloperInfoPopup from "./components/DeveloperInfo/DeveloperInfoPopup";

function App() {
  const [showPopup, setShowPopup] = useState(true);
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  return (
    <>
    <div>
        {/* Your main application content */}
        <DeveloperInfoPopup
          show={showPopup}
          onClose={handleClosePopup}
          studentName="Vaishanvi Chandrakant Sutar"
          studentPhotoUrl="/images/vaisu.jpeg" // Path to their photo
          uniqueMessage="Learned so much during this OJT! This app showcases my independent coding and deployment skills"
        />
      </div>
    <Router>
      <div className="main-layout">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/admissions" element={<AdmissionsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <ChatbotComponent />
        <Footer />
      </div>
    </Router>
    </>
  );
}
export default App;

// import { useState, useEffect, useRef } from "react";
// // Our Educational Organization's Knowledge Base (FAQs) - NO CHANGE HERE
// import { getEmbeddings, cosineSimilarity } from './utils/aiService'; // <-- ADD THIS LINE

// const knowledgeBase = {
//   // ... (your existing knowledgeBase object) ...
//   greeting: {
//     response:
//       "Hello! Welcome to our Educational Organization. How can I assist you today?",
//     examples: [
//       "hi",
//       "hello",
//       "hey there",
//       "greetings",
//       "good morning",
//       "good evening",
//     ],
//     exampleEmbeddings: [],
//   },
//   courses: {
//     response:
//       "We offer a wide range of courses including Web Development, Data Science, Digital Marketing, and UI/UX Design. Which one are you interested in?",
//     examples: [
//       "what courses do you offer",
//       "list of courses",
//       "available programs",
//       "tell me about your education",
//       "what can I learn",
//       "courses available",
//     ],
//     exampleEmbeddings: [],
//   },
//   fees: {
//     response:
//       "Our course fees vary based on the program and duration. Please visit the 'Courses' section on our website or provide the course name for specific details.",
//     examples: [
//       "how much are the fees",
//       "course cost",
//       "tuition fees",
//       "what's the price",
//       "cost of a program",
//       "enrollment cost",
//     ],
//     exampleEmbeddings: [],
//   },
//   admission: {
//     response:
//       "To apply for admission, please visit our 'Admissions' page, fill out the online application form, and submit the required documents. Our team will contact you shortly.",
//     examples: [
//       "how to apply",
//       "admission process",
//       "enrollment steps",
//       "admission requirements",
//       "how to get admitted",
//       "apply for a course",
//     ],
//     exampleEmbeddings: [],
//   },
//   contact: {
//     response:
//       "You can reach us by phone at +91 12345 67890, or email us at info@example.edu. You can also visit our office during working hours.",
//     examples: [
//       "contact details",
//       "phone number",
//       "email address",
//       "where are you located",
//       "get in touch",
//       "how to reach you",
//     ],
//     exampleEmbeddings: [],
//   },
//   thanks: {
//     response: "You're welcome! Is there anything else I can help with?",
//     examples: ["thank you", "thanks", "appreciate it", "cheers"],
//     exampleEmbeddings: [],
//   },
//   default: {
//     response:
//       "I'm sorry, I couldn't understand your query. Could you please rephrase or ask about courses, fees, admission, or contact information?",
//     examples: [],
//     exampleEmbeddings: [],
//   },
// };
// // const GEMINI_API_KEY = "AIzaSyAlVvqJYBn2MHhpM3VvqxQWRsIVkiPrgxw";
// function App() {
//   const [messages, setMessages] = useState([
//     { text: knowledgeBase.greeting.response, sender: "bot" },
//   ]);
//   const [inputValue, setInputValue] = useState("");
//   const [loading, setLoading] = useState(false);
//   const chatMessagesRef = useRef(null);
//   const [preparedKnowledgeBase, setPreparedKnowledgeBase] = useState({});
//   const [isKnowledgeBaseLoading, setIsKnowledgeBaseLoading] = useState(true);
//   // NEW STATE: To track online status
//   const [isOnline, setIsOnline] = useState(navigator.onLine);
//   // EFFECT: To listen for online/offline events
//   useEffect(() => {
//     const handleOnline = () => setIsOnline(true);
//     const handleOffline = () => setIsOnline(false);
//     window.addEventListener("online", handleOnline);
//     window.addEventListener("offline", handleOffline);
//     // Cleanup: Remove event listeners when component unmounts
//     return () => {
//       window.removeEventListener("online", handleOnline);
//       window.removeEventListener("offline", handleOffline);
//     };
//   }, []); // Run only once on mount/unmount
//   // Effect to pre-calculate embeddings when the component mounts (NO CHANGE)
//   useEffect(() => {
//     const prepareKB = async () => {
//       const newKB = JSON.parse(JSON.stringify(knowledgeBase));
//       for (const intent in newKB) {
//         if (newKB[intent].examples && newKB[intent].examples.length > 0) {
//           const embeddings = await Promise.all(
//             newKB[intent].examples.map((example) => getEmbeddings(example))
//           );
//           newKB[intent].exampleEmbeddings = embeddings;
//         }
//       }
//       setPreparedKnowledgeBase(newKB);
//       setIsKnowledgeBaseLoading(false);
//     };
//     prepareKB();
//   }, []);
//   // Effect to scroll to the latest message (NO CHANGE)
//   useEffect(() => {
//     if (chatMessagesRef.current) {
//       chatMessagesRef.current.scrollTo({
//         top: chatMessagesRef.current.scrollHeight,
//         behavior: "smooth",
//       });
//     }
//   }, [messages]);
//   // // Function to get text embeddings (NO CHANGE)
//   // const getEmbeddings = async (text) => {
//   //   const response = await fetch(
//   //     `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${GEMINI_API_KEY}`,
//   //     {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify({
//   //         model: "models/text-embedding-004",
//   //         content: { parts: [{ text: text }] },
//   //       }),
//   //     }
//   //   );
//   //   if (!response.ok) {
//   //     const errorText = await response.text();
//   //     throw new Error(`HTTP error! Status: ${response.status} - ${errorText}`);
//   //   }
//   //   const data = await response.json();
//   //   return data.embedding.values;
//   // };
//   // // Function to calculate cosine similarity (NO CHANGE)
//   // const cosineSimilarity = (vecA, vecB) => {
//   //   let dotProduct = 0;
//   //   let magnitudeA = 0;
//   //   let magnitudeB = 0;
//   //   for (let i = 0; i < vecA.length; i++) {
//   //     dotProduct += vecA[i] * vecB[i];
//   //     magnitudeA += vecA[i] * vecA[i];
//   //     magnitudeB += vecB[i] * vecB[i];
//   //   }
//   //   magnitudeA = Math.sqrt(magnitudeA);
//   //   magnitudeB = Math.sqrt(magnitudeB);
//   //   if (magnitudeA === 0 || magnitudeB === 0) return 0;
//   //   return dotProduct / (magnitudeA * magnitudeB);
//   // };
//   const getAIResponse = async (userMessageText) => {
//     setLoading(true);
//     // Check online status before making API call
//     if (!isOnline) {
//       setLoading(false); // Clear loading state as no API call will be made
//       return "It seems you're offline. Please check your internet connection.";
//     }
//     if (isKnowledgeBaseLoading) {
//       setLoading(false); // Clear loading state
//       return "Please wait, I'm still getting ready...";
//     }
//     try {
//       const userEmbedding = await getEmbeddings(userMessageText);
//       let bestMatch = { intent: "default", score: 0 };
//       for (const intent in preparedKnowledgeBase) {
//         if (intent === "default") continue;
//         const intentEmbeddings =
//           preparedKnowledgeBase[intent].exampleEmbeddings;
//         if (intentEmbeddings.length === 0) continue;
//         for (const exampleEmbedding of intentEmbeddings) {
//           const score = cosineSimilarity(userEmbedding, exampleEmbedding);
//           if (score > bestMatch.score) {
//             bestMatch = { intent: intent, score: score };
//           }
//         }
//       }
//       console.log(
//         `Best matching intent: ${bestMatch.intent} with score: ${bestMatch.score}`
//       );
//       const similarityThreshold = 0.6;
//       if (bestMatch.score >= similarityThreshold) {
//         return preparedKnowledgeBase[bestMatch.intent].response;
//       } else {
//         return preparedKnowledgeBase.default.response;
//       }
//     } catch (error) {
//       console.error("Error fetching AI response:", error);
//       if (error.message.includes("429")) {
//         return "I'm experiencing high traffic right now. Please try again in a moment.";
//       }
//       if (error.message.includes("403") || error.message.includes("401")) {
//         return "There's an issue with my internal setup (API key). Please inform the administrator.";
//       }
//       return preparedKnowledgeBase.default.response;
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleSendMessage = async () => {
//     if (inputValue.trim() === "") return;
//     const userMessageText = inputValue;
//     const newUserMessage = { text: userMessageText, sender: "user" };
//     setMessages((prevMessages) => [...prevMessages, newUserMessage]);
//     setInputValue("");
//     // Pre-check for online status before sending
//     if (!isOnline) {
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         {
//           text: "You appear to be offline. Please check your internet connection.",
//           sender: "bot",
//         },
//       ]);
//       return;
//     }
//     if (isKnowledgeBaseLoading) {
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         {
//           text: "Please wait a moment, I'm initializing my knowledge...",
//           sender: "bot",
//         },
//       ]);
//       return;
//     }
//     const aiResponseText = await getAIResponse(userMessageText);
//     const botResponse = { text: aiResponseText, sender: "bot" };
//     setMessages((prevMessages) => [...prevMessages, botResponse]);
//   };
//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);
//   };
//   const handleKeyPress = (event) => {
//     if (event.key === "Enter" && !loading) {
//       handleSendMessage();
//     }
//   };
//   return (
//     <div className="app-container">
//       <div className="chat-window">
//         <div className="chat-header">
//           <span role="img" aria-label="Chatbot icon">
//             🤖
//           </span>
//           <h2>Educational Chatbot</h2>
//         </div>
//         {isKnowledgeBaseLoading && (
//           <div className="initial-loading-container">
//             <div className="spinner"></div> {/* The spinner element */}
//             <p className="initial-loading-message">
//               Initializing knowledge base... Please wait.
//             </p>
//           </div>
//         )}
//         {/* NEW: Offline message display */}
//         {!isOnline && (
//           <p className="bot-message offline-message">
//             🚫 You are currently offline. Please check your internet connection.
//           </p>
//         )}

//         <div className="chat-messages" ref={chatMessagesRef}>
//           {messages.map((message, index) => (
//             <div key={index} className={`message-row ${message.sender}`}>
//               {message.sender === "bot" && (
//                 <div className="avatar bot-avatar">🤖</div>
//               )}
//               <p className={`${message.sender}-message`}>{message.text}</p>
//               {message.sender === "user" && (
//                 <div className="avatar user-avatar">👤</div>
//               )}
//             </div>
//           ))}
//           {loading && (
//             <div className="message-row bot">
//               <div className="avatar bot-avatar">🤖</div>
//               <p className="bot-message loading-indicator">Typing...</p>
//             </div>
//           )}
//         </div>
//         <div className="chat-input-area">
//           <input
//             type="text"
//             placeholder={
//               loading || isKnowledgeBaseLoading || !isOnline
//                 ? "Waiting for Internet Connection..."
//                 : "Type your message..."
//             }
//             className="message-input"
//             value={inputValue}
//             onChange={handleInputChange}
//             onKeyPress={handleKeyPress}
//             // MODIFIED: Disable input if offline
//             disabled={loading || isKnowledgeBaseLoading || !isOnline}
//           />
//           <button
//             className="send-button"
//             onClick={handleSendMessage}
//             // MODIFIED: Disable button if offline
//             disabled={loading || isKnowledgeBaseLoading || !isOnline}
//           >
//             {loading ? "..." : "Send"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default App;
