<template>
  <div id="new-event">
    <h3>Nuevo evento</h3>
    <div class="row">
      <form @submit.prevent="saveEvent" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" required>
            <label>Nombre</label>
          </div>
        </div>

        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="category" required>
            <label>Categoria</label>
          </div>
        </div>

        <router-link to="/" class="btn grey">Cancelar</router-link>
        <button type="submit" class="btn pink">Crear</button>
      </form>
    </div>
  </div>
</template>

<script>
  import db from './firebaseInit'
  export default {
    name: 'new-event',
    data() {
      return {
        name: null,
        category: null,
      }
    },

    methods: {
      saveEvent() {
        db.collection('Eventos').add({
          event_id: this.generateUUID(),
          name: this.name,
          category: this.category,
        }).then(docRef => {
          this.$router.push('/')
        }).catch(error => console.log(err))
      },

      generateUUID() {
        let d = new Date().getTime()
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          let r = (d + Math.random() * 16) % 16 | 0
          d = Math.floor(d / 16)
          return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
        })
        return uuid
      }
    }
  }
</script>
