<template>
  <div id="new-event">
    <h3>New Event</h3>
    <div class="row">
      <form @submit.prevent="saveEvent" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="event_id" required>
            <label>Event ID</label>
          </div>
        </div>

        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" required>
            <label>Name</label>
          </div>
        </div>

        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="category" required>
            <label>Category</label>
          </div>
        </div>

        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="ubication" required>
            <label>Ubication</label>
          </div>
        </div>

        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="date" required>
            <label>Date</label>
          </div>
        </div>

        <button type="submit" class="btn">Submit</button>
        <router-link to="/" class="btn">Cancel</router-link>
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
        event_id: null,
        name: null,
        category: null,
        date: null,
        ubication: null
      }
    },

    methods: {
      saveEvent() {
        db.collection('Eventos').add({
          event_id: this.event_id,
          name: this.name,
          category: this.category,
          ubication: this.ubication,
          date: this.date
        }).then(docRef => {
          this.$router.push('/')
        }).catch(error => cnosole.log(err))
      }
    }
  }
</script>
