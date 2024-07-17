import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state() {
    return {
      articles: [],
      articleDetail: null,
      articlesLoaded: false,
    };
  },
  mutations: {
    setArticles(state, articles) {
      state.articles = articles;
      state.articlesLoaded = true;
    },
    setArticleDetail(state, article) {
      state.articleDetail = article;
    },
    updateArticle(state, { id, heading, content }) {
      const index = state.articles.findIndex(article => article.id === id);
      if (index !== -1) {
        state.articles[index] = { id, heading, content };
      }
    },
    deleteArticle(state, id) {
      state.articles = state.articles.filter(article => article.id !== id);
    },
  },
  actions: {
    async fetchArticles({ commit, state }) {
      if (!state.articlesLoaded) {
        try {
          const response = await axios.get('https://baconipsum.com/api/?type=meat-and-filler&paras=20');
          const articles = response.data.map((content, index) => ({
            id: index + 1,
            heading: `Article ${index + 1}`,
            content,
          }));
          commit('setArticles', articles);
        } catch (error) {
          console.error("Error fetching articles:", error);
        }
      }
    },
    selectArticle({ commit }, article) {
      commit('setArticleDetail', article);
    },
    updateArticle({ commit }, article) {
      commit('updateArticle', article);
    },
    deleteArticle({ commit }, id) {
      commit('deleteArticle', id);
    },
  },
  getters: {
    getArticles(state) {
      return state.articles;
    },
    getArticleDetail(state) {
      return state.articleDetail;
    },
  },
});

export default store;
