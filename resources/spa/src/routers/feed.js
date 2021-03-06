const FeedList = () =>
  import(/* webpackChunkName: 'feed' */ '@/page/feed/FeedList.vue')
const FeedDetail = () =>
  import(/* webpackChunkName: 'feed' */ '@/page/feed/FeedDetail.vue')
const ArticleLikeList = () =>
  import(/* webpackChunkName: 'feed' */ '@/page/article/ArticleLikeList.vue')
const ArticleRewardList = () =>
  import(/* webpackChunkName: 'feed' */ '@/page/article/ArticleRewardList.vue')

export default [
  {
    name: 'feeds',
    path: '/feeds',
    component: FeedList,
    meta: {
      title: '动态',
      keepAlive: true,
    },
    beforeEnter (to, from, next) {
      const type = to.query.type
      type
        ? next()
        : next({
          name: 'feeds',
          query: { type: 'new' },
        })
    },
  },
  {
    path: '/feeds/:feedId(\\d+)',
    component: FeedDetail,
    meta: {
      title: '动态详情',
      keepAlive: true,
      requiresAuth: true,
    },
  },

  /**
   * 点赞列表 && 打赏列表 路由格式固定
   * 帖子/资讯/问答 相关路由 统一使用 article 代替 id
   * 通过传递 不同的 meta[type] 实现组件复用
   */
  {
    path: '/feeds/:article(\\d+)/likers',
    component: ArticleLikeList,
    meta: {
      title: '点赞列表',
      type: 'feed',
    },
  },
  {
    path: '/feeds/:article(\\d+)/rewarders',
    component: ArticleRewardList,
    meta: {
      title: '打赏列表',
      type: 'feed',
    },
  },
]
