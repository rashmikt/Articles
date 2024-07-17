<template>
  <div>
    <h1>Articles</h1>
    <div v-if="loading">Loading articles...</div>
    <div v-else>
      <div v-for="article in articles" :key="article.id" class="article">
        <h2 @click="viewArticle(article.id)">{{ article.heading }}</h2>
        <p>{{ truncateText(article.content, 100) }}</p>
        <p><strong>Date:</strong> {{ getRandomDate() }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'ArticleList',
  setup() {
    const store = useStore();
    const router = useRouter();
    const loading = ref(true);

    const fetchArticles = async () => {
      await store.dispatch('fetchArticles');
      loading.value = false;
    };

    const articles = computed(() => store.getters.getArticles);

    const getRandomDate = () => {
      const start = new Date(2020, 0, 1);
      const end = new Date();
      const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      return date.toDateString();
    };

    const truncateText = (text, maxLength) => {
      if (text.length <= maxLength) {
        return text;
      }
      return text.slice(0, maxLength) + '...';
    };

    const viewArticle = (id) => {
      router.push({ name: 'ArticleDetail', params: { id } });
    };

    onMounted(() => {
      fetchArticles();
    });

    return { articles, loading, getRandomDate, truncateText, viewArticle };
  },
};
</script>

<style scoped>
.article {
  margin-bottom: 20px;
  cursor: pointer;
  background-color: aliceblue;
}
.article h2 {
  cursor: pointer;
  color: blue;
}
</style>
  