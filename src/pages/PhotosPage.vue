<template>
  <v-container app fluid>
    <PhotoForm v-if="photos.length < 15" @addPhoto="addPhoto"/>
    <div v-else>Вы не можете добавить больше фотографий</div>
    <!--    <PhotoForm v-show="dialogVisible" @addPhoto="addPhoto"/>-->

    <v-row>
      <Photo v-for="photo in photos" :photo="photo" @openPhoto="openPhoto"/>
    </v-row>
    <PhotoDialog :photo="currentPhoto" v-model="dialogVisible"/>
  </v-container>
</template>

<script>
import Photo from "@/components/photo/Photo";
import PhotoForm from "@/components/photo/PhotoForm";
import PhotoDialog from "@/components/photo/PhotoDialog";

export default {
  components: {
    PhotoDialog,
    Photo,
    PhotoForm,
  },
  data: () => ({
    photos: [
      // {
      // "id": 1,
      // "title": "Какое-то название",
      // "url": "https://via.placeholder.com/600/92c952",
      // },
    ],
    currentPhoto: {},
    dialogVisible: false
  }),
  mounted() {
    this.fetchTodo()
  },
  methods: {
    fetchTodo() {
      this.axios.get('https://jsonplaceholder.typicode.com/photos?_limit=10')
          .then(response => this.photos = response.data)
    },

    addPhoto(photo) {
      this.photos.push(photo)
    },

    openPhoto(photo) {
      this.currentPhoto = photo
      this.dialogVisible = true
    },
  }
}
</script>

<style scoped>

</style>