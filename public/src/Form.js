
export default ({
  props: ['id'],
  template: '<form v-on:submit.prevent="sendMessage"> \
              <input v-model="message" /> \
              <button>Send Message</button> \
            </form>',
  created: function(){
    console.log("created");
    console.log(this)
  },
  methods: {
    sendMessage: function(){
      console.log(this)
      this.$parent.messages.push({content: this.message, sender: this.id});
    }
  },
  data: function(){
    return {
      message: this.message,
      sender: this.id
    }
  }
})
