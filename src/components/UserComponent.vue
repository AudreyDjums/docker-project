<template>
    <div class="container">
      <h2>Liste des utilisateurs</h2>
      <ul class="user-list">
        <li v-for="user in users" :key="user.id" class="user-item">
          <span v-if="!user.isEditing">{{ user.name }} - {{ user.email }}</span>
          <div v-else class="edit-form">
            <input v-model="user.editName" placeholder="Nom" class="input-field">
            <input v-model="user.editEmail" placeholder="Email" class="input-field">
          </div>
          <button v-if="!user.isEditing" @click="editUser(user)" class="edit-button">Modifier</button>
          <button v-else @click="saveUser(user)" class="save-button">Sauvegarder</button>
          <button @click="deleteUser(user.id)" class="delete-button">Supprimer</button>
        </li>
      </ul>
  
      <h3>Ajouter un utilisateur</h3>
      <form class="user-form" @submit.prevent="addUser">
        <input v-model="newUser.name" placeholder="Nom" class="input-field" required>
        <input v-model="newUser.email" placeholder="Email" class="input-field" required>
        <button type="submit" class="add-button">Ajouter</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        users: [],
        newUser: { name: '', email: '' }
      };
    },
    methods: {
      fetchUsers() {
        axios.get('http://backend:8081/api/users')
          .then(response => {
            this.users = response.data.map(user => ({
              ...user,
              isEditing: false,
              editName: user.name,
              editEmail: user.email
            }));
          })
          .catch(error => {
            console.error(error);
          });
      },
      addUser() {
        axios.post('http://localhost:8081/api/users', this.newUser)
          .then(response => {
            this.users.push({
              ...response.data,
              isEditing: false,
              editName: response.data.name,
              editEmail: response.data.email
            });
            this.newUser = { name: '', email: '' };
          })
          .catch(error => {
            console.error(error);
          });
      },
      editUser(user) {
        user.isEditing = true;
      },
      saveUser(user) {
        axios.put(`http://localhost:8081/api/users/${user.id}`, {
          name: user.editName,
          email: user.editEmail
        })
          .then(() => {
            user.name = user.editName;
            user.email = user.editEmail;
            user.isEditing = false;
          })
          .catch(error => {
            console.error(error);
          });
      },
      deleteUser(userId) {
        axios.delete(`http://localhost:8081/api/users/${userId}`)
          .then(() => {
            this.users = this.users.filter(user => user.id !== userId);
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    mounted() {
      this.fetchUsers();
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  h2, h3 {
    color: #333;
  }
  
  .user-list {
    list-style-type: none;
    padding: 0;
    margin: 20px 0;
  }
  
  .user-item {
    background-color: #f4f4f4;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .edit-form {
    display: flex;
    gap: 10px;
  }
  
  .input-field {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
  }
  
  .user-form {
    display: flex;
    flex-direction: column;
  }
  
  .add-button, .edit-button, .save-button, .delete-button {
    padding: 8px 12px;
    font-size: 1rem;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .add-button {
    background-color: #4CAF50;
  }
  
  .edit-button {
    background-color: #2196F3;
  }
  
  .save-button {
    background-color: #4CAF50;
  }
  
  .delete-button {
    background-color: #f44336;
  }
  
  .add-button:hover {
    background-color: #45a049;
  }
  
  .edit-button:hover {
    background-color: #0b7dda;
  }
  
  .save-button:hover {
    background-color: #45a049;
  }
  
  .delete-button:hover {
    background-color: #d32f2f;
  }
  </style>
  