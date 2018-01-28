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
      <li class="collection-item">
        Date: {{date}}
      </li>
      <li class="collection-item">
        Ubication: {{ubication}}
      </li>
    </ul>

    <router-link to="/" class="btn grey">
      Back
    </router-link>
    <button @click="deleteEvent" class="btn red">
      Delete
    </button>
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
        date: null,
        ubication: null
      }
    },

    beforeRouteEnter(to, from, next) {
      db.collection('Eventos').where('event_id', '==', to.params.event_id).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.event_id = doc.data().event_id
            vm.name = doc.data().name
            vm.category = doc.data().category
            vm.date = doc.data().date
            vm.ubication = doc.data().ubication
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
            this.date = doc.data().date
            this.ubication = doc.data().ubication
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
