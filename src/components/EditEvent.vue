<template>
  <div id="edit-event">
    <h3>Edit Event</h3>
    <div class="row">
      <form @submit.prevent="updateEvent" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input disabled type="text" v-model="event_id" required>
          </div>
        </div>

        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" required>
          </div>
        </div>

        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="category" required>
          </div>
        </div>

        <router-link to="/" class="btn grey">Cancelar</router-link>
        <button type="submit" class="btn pink">Editar</button>
      </form>
    </div>
  </div>
</template>

<script>
  import db from './firebaseInit'
  export default {
    name: 'edit-event',
    data() {
      return {
        event_id: null,
        name: null,
        category: null,
      }
    },
    beforeRouteEnter(to, from, next) {
      db.collection('Eventos').where('event_id', '==', to.params.event_id).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.event_id = doc.data().event_id
            vm.name = doc.data().name
            vm.category = doc.data().category
          })
        })
      })
    },

    watch: {
      '$route': 'fetchData'
    },

    methods: {
      fetchData() {
        db.collection('Eventos').where('event_id', '==', this.$route.params.event_id).get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.event_id = doc.data().event_id
            this.name = doc.data().name
            this.category = doc.data().category
          })
        })
      },

      updateEvent() {
        db.collection('Eventos').where('event_id', '==', this.$route.params.event_id).get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.update({
              event_id: this.event_id,
              name: this.name,
              category: this.category,
            }).then(() => {
              this.$router.push({name: 'view-event', params: {event_id: this.event_id}})
            })
          })
        })
      }
    }
  }
</script>
