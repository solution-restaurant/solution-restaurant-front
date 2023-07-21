<template>
  <div>
    <div
      v-if="msg.userName === myName"
      class="chat__mymessage"
      :class="[isSame ? '' : 'chat__first']"
    >
      <!-- <p class="chat__yourmessage__time">23:38</p> -->
      <p class="chat__mymessage__paragraph">{{ msg.content }}</p>
    </div>
    <div
      v-else
      class="chat__yourmessage"
      :class="[isSame ? '' : 'chat__first']"
    >
    <div>
      <p class="chat__yourmessage__user" v-if="!isSame">
        {{ msg.from.userName }}
      </p>
      <div class="chat__yourmessage__p">
        <p class="chat__yourmessage__paragraph" v-html="msg.content">
        </p>
        <!-- <p class="chat__yourmessage__time">23:38</p> -->
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["msg", "prev","myName"],
  data() {
    return {
      isSame: false,
      // avatar: require("../assets/avatar.svg"),
    };
  },
  methods: {
    isSamePerson() {
      return true;
      // if (prev === null) {
      //   return false;
      // } else if (prev[0]?.from.name == msg?.from.name) {
      //   return true;
      // } else {
      //   return false;
      // }
    },
  },
  created() {
    this.isSame = this.isSamePerson();
    // if (this.msg?.from.avatar) {
    //   this.avatar = this.msg?.from.avatar;
    // }
  },
};
</script>

<style>
.chat__mymessage {
  display: flex;
  justify-content: right;
  align-items: flex-end;
  margin: 0;
  min-height: 40px;
  line-break: anywhere;
}

.chat__mymessage__paragraph {
  margin: 0.4rem 0 0 1rem;
  border-radius: 20px 20px 0px 20px;
  max-width: 50%;
  background-color: #bbc4ef;
  color: #ffffff;
  padding: 0.8rem;
  font-size: 14px;
}

.chat__first {
  margin-top: 2rem;
}

.chat__yourmessage {
  display: flex;
}

.chat__yourmessage__avartar {
  width: 40px;
  margin-right: 1rem;
}

.chat__yourmessage__img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.chat__yourmessage__user {
  font-size: 14px;
  font-weight: 700;
  color: #292929;
  margin-top: 0;
  margin-block-end: 0rem;
}

.chat__yourmessage__p {
  display: flex;
  align-items: flex-end;
  line-break: anywhere;
}

.chat__yourmessage__paragraph {
  margin: 0.4rem 1rem 0 0;
  border-radius: 0px 20px 20px 20px;
  background-color: #f3f3f3;
  max-width: 80%px;
  color: #414141;
  padding: 0.8rem;
  font-size: 14px;
}

.chat__yourmessage__time {
  margin: 0;
  font-size: 12px;
  color: #9c9c9c;
}


/* .popup {
    position: relative;
    display: inline-block;
    cursor: pointer;
    background-color: #6495ED;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    margin: 5px;
    user-select: none;
}

.popup .popuptext {
    display: none;
    min-width: 200px;
    background-color: #FAEBD7;
    color: #000;
    text-align: left;
    padding: 20px;
    position: fixed;
    z-index: 1;
    left: 50%;
    top: 10px;
    transform: translateX(-50%);
    border-radius: 6px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.popup .popuptext .close {
    position: absolute;
    top: 5px;
    right: 15px;
    cursor: pointer;
    color: #8A2BE2;
    font-weight: bold;
} */

.popup-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.popup {
    position: relative;
    display: inline-block;
    cursor: pointer;
    color: black;
    background-color: #e8e3e3;
    text-align: center;
    padding: 10px;
    text-decoration: none;
    font-size: 14px;
    margin: 16px 2px;
    cursor: pointer;
    border-radius: 12px;
    box-sizing: border-box;
}

.popup .popuptext {
    display: none;
    min-width: 200px;
    background-color: #FAEBD7;
    color: #000;
    text-align: left;
    padding: 20px;
    position: fixed;
    z-index: 1;
    left: 50%;
    top: 10px;
    transform: translateX(-50%);
    border-radius: 6px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.popup .popuptext .close {
    position: absolute;
    top: 5px;
    right: 15px;
    cursor: pointer;
    color: #8A2BE2;
    font-weight: bold;
}
</style>