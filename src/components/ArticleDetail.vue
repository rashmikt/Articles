<template>
  <div class="article">
    <h1 v-if="!isEditing">{{ article.heading }}</h1>
    <input v-if="isEditing" v-model="editedHeading" />
    <p v-if="!isEditing">{{ article.content }}</p>
    <textarea v-if="isEditing" v-model="editedContent"></textarea>
    
    <button @click="toggleEdit">{{ isEditing ? 'Save' : 'Edit' }}</button>
    <button @click="deleteArticle">Delete</button>
    <button @click="goBack">Back to Articles</button>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'ArticleDetail',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const articleId = Number(route.params.id);

    const article = computed(() => store.getters.getArticles.find(a => a.id === articleId) || {});

    const isEditing = ref(false);
    const editedHeading = ref(article.value.heading || '');
    const editedContent = ref(article.value.content || '');

    const toggleEdit = () => {
      if (isEditing.value) {
        store.dispatch('updateArticle', {
          id: articleId,
          heading: editedHeading.value,
          content: editedContent.value,
        });
        store.dispatch('selectArticle', { id: articleId, heading: editedHeading.value, content: editedContent.value });
      }
      isEditing.value = !isEditing.value;
    };

    const deleteArticle = () => {
      store.dispatch('deleteArticle', articleId);
      router.push({ name: 'ArticleList' });
    };

    const goBack = () => {
      router.push({ name: 'ArticleList' });
    };

    watch(article, (newValue) => {
      if (newValue) {
        editedHeading.value = newValue.heading;
        editedContent.value = newValue.content;
      }
    }, { immediate: true });

    return { article, isEditing, editedHeading, editedContent, toggleEdit, deleteArticle, goBack };
  },
};
</script>

<style scoped>
.article {
  background-color: aliceblue;
}
.article h1 {
  color: blue;
}
button {
  margin-top: 20px;
  margin-right: 10px;
}
</style>
  