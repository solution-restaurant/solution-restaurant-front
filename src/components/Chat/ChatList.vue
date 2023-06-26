<template>
    <div class="chat__body" id="chat__body">
      <chat-message
        v-for="(msg, index) in msgs"
        :key="index"
        :msg="msg"
        :myName="myName"
        :prev="[index == 0 ? null : msgs[index - 1]]"
      >
      </chat-message>
    </div>
  </template>
  
  <script>
  import ChatMessage from "src/components/Chat/ChatMessage";
  
  export default {
    components: {
      ChatMessage,
    },
    props: ["msgs","myName"],
  };
  </script>
  
  <style>
  .chat__body {
    padding: 2rem;
    overflow: auto;
    width: 100%;
    height: 100%;
    scroll-behavior: smooth;
  }
  
  .chat__body::-webkit-scrollbar {
    display: none;
  }
  </style>