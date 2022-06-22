import { fetchCartItems } from '~/api'

export const state = () => ({
  carts: [],
})

export const mutations = {
  addItemToCart(state, item) {
    state.carts.push(item)
  },
  setCarts(state, carts) {
    state.carts = carts
  },
}

export const actions = {
  async [FETCH_CART_ITEMS]({ context }) {
    const { data } = await fetchCartItems()
    const items = data.map((item) => ({
      ...item,
      imageUrl: `${item.imageUrl}?random=${Math.random()}`,
    }))
    context.commit('setCarts', items)
  },

  async nuxtServerInit(storeContext, nuxtContext) {
    const { data } = await fetchCartItems()
    storeContext.commit(
      'setCartItems',
      data.map((item) => ({
        ...item,
        imageUrl: `${item.imageUrl}?random=${Math.random()}`,
      }))
    )
  },
}
