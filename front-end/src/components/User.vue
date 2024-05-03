<template>
  <div class="result"
  :class="{
    ready: this.result === 'Ready to Save',
    success: this.result === 'User successfully saved',
    failure: this.result === 'Unable to save user',
    warning: this.result === 'Error during API access'
  }">{{ result }}</div>
  <div class="user">
    <div class="user-attribute">ID: {{ id }}</div>
    <div class="user-attribute">Username: {{ username }}</div>
    <div class="user-attribute">Display Name: {{ displayName }}</div>
  </div>
  <div class="controls">
    <button :disabled="this.readyToSave === false" @click="saveUser">{{ saveButtonText }}</button>
  </div>
</template>

<script>
export default {
  name: 'UserDisplay',
  data() {
    return {
      id: "",
      username: "",
      displayName: "",
      result: "",
      saveButtonText: "Save User",
      readyToSave: false
    }
  },
  methods: {
    async saveUser() {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: this.id,
          username: this.username,
          displayName: this.displayName,
          password: 'ChangeMe'
        })
      };

      const result = await fetch("http://localhost:3000/api/user", requestOptions)
        .then(res => res.text())
        .then(data => this.result = data)
        .catch(() => this.result = "Error during API access");

      switch (result) {
      case "Created":
        this.result = "User successfully saved";
        this.saveButtonText = "Save User Again";
        this.readyToSave = true;
        break;
      case "Bad Request":
        this.result = "Unable to save user";
        this.saveButtonText = "Save User";
        this.readyToSave = false;
        break;
      }
    }
  },
  async mounted() {
    let error = false;

    await fetch("http://localhost:3000/api/id")
      .then(res => res.text())
      .then(data => this.id = data)
      .catch(() => {
        this.result = "Error during API access";
        error = true;
      });

    await fetch("https://randomuser.me/api/")
      .then(res => res.json())
      .then(data => {
        const user = data.results[0];
        this.username = user.email;
        this.displayName = `${user.name.title} ${user.name.first} ${user.name.last}`;
      })
      .catch(() => {
        this.result = "Error during API access";
        error = true;
      });

      if (!error) {
        this.result = "Ready to Save";
        this.readyToSave = true;
      }
  }
}
</script>

<style scoped>
  button {
    background-color: lightgreen;
    height: 3em;
    width: 10em;
    border: none;
    border-radius: 1em;
      &:disabled {
        background-color: lightslategrey;
        color: white;
      }
  }

  .controls {
    display: block;
    padding: 2em;
  }

  .result {
    display: block;
    font-size: 3em;
    padding: 0.2em;
    width: 25em;
    margin: auto;
      &.ready {
        background-color: lightblue;
      }
      &.success {
        background-color: lightgreen;
      }
      &.failure {
        background-color: lightcoral;
      }
      &.warning {
        background-color: lightyellow;
      }
  }

  .user {
    display: block;
    width: 25em;
    background-color: white;
    border-radius: 1em;
    font-size: 3em;
    margin: auto;
    vertical-align: middle;
    padding: 1em;
  }
</style>
