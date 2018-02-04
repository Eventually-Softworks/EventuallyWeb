<template>
  <div id="dashboard">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>
          Eventos
        </h4>
      </li>
      <li v-for="event in events" v-bind:key="event.id" class="collection-item">
        <div class="chip">{{event.category}}</div>{{event.name}}

        <router-link class="secondary-content" v-bind:to="{name: 'view-event', params: {event_id: event.event_id}}">
          <i class="fa fa-eye"></i>
        </router-link>
      </li>
    </ul>

    <div class="fixed-action-btn">
      <router-link to="/new" class="btn-floating btn-large pink">
        <i class="fa fa-plus"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
  import db from './firebaseInit'
  export default {
    name: 'dashboard',
    data() {
      return {
        events: []
      }
    },
    created() {
      db.collection('Eventos').orderBy('category').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            'id': doc.id,
            'event_id': doc.data().event_id,
            'name': doc.data().name,
            'category': doc.data().category,
          }
          this.events.push(data)
        })
      })
    }
  }
</script>
