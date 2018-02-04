<template>
  <div id="view-event">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>
          {{name}}
        </h4>
      </li>
      <li class="collection-item">
        Event ID: {{event_id}}
      </li>
      <li class="collection-item">
        Category: {{category}}
      </li>
    </ul>

    <router-link to="/" class="btn grey">
      Cancelar
    </router-link>
    <button @click="deleteEvent" class="btn pink">
      Eliminar
    </button>

    <div class="fixed-action-btn">
      <router-link v-bind:to="{name: 'edit-event', params: {event_id: event_id}}" class="btn-floating btn-large pink">
        <i class="fa fa-pencil"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
  import db from './firebaseInit'
  export default {
    name: 'view-event',
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

      deleteEvent() {
        if (confirm('Are you sure')) {
          db.collection('Eventos').where('event_id', '==', this.$route.params.event_id).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref.delete()
              this.$router.push('/')
            })
          })
        }
      }
    }
  }
</script>
