import React from "react";
import Pages from "./pages";
import Modal from "./components/modal";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Pages />
      <Modal />
      <ToastContainer 
      position="bottom-right"
      autoClose={3000}
      />

    </>
  );
}

export default App;
