<template>
  <v-dialog
      v-model="dialogVisible" persistent max-width="1200"
  >
    <v-card>
      <v-card-title>{{ full_title }}</v-card-title>
      <v-card-text>
        <v-img
            :src="photo.url"
        />
        <v-card-actions>
          <v-spacer/>
          <v-btn color="green darken-1" text @click="dialogVisible = false" class=""
          >Закрыть
          </v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    photo: {
      type: Object,
      required: true
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.dialogVisible = this.value
  },
  data: () => ({
    dialogVisible: false,
  }),
  watch: {
    value(newValue) {
      this.dialogVisible = newValue
    },
    dialogVisible(newValue) {
      this.$emit('input', newValue)
    }
  },
  computed: {
    full_title() {
      return `Название фотографии - ${this.photo.title}`
    }

  }
}
</script>

<style scoped>

</style>