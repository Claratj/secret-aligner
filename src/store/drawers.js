export const state = () => ({
  index: 0,
  items: [],
  isOpen: false,
})

export const getters = {}

export const mutations = {
  RESET(state) {
    state.index = 0
    state.items = []
  },
  ADD(state, drawer) {
    drawer.id = state.index += 1
    drawer.active = true
    state.items.push(drawer)
  },
  REMOVE(state, drawer) {
    const index = state.items.findIndex(({ id }) => drawer.id === id)
    state.items.splice(index, 1)
  },
  ACTIVATE(state, drawer) {
    drawer.active = true
  },
  DEACTIVATE(state, drawer) {
    drawer.active = false
  },
  FIXED(state, drawer) {
    if (state.items) {
      state.isOpen = true
    }
    if (drawer) {
      state.isOpen = false
    }
  },
}

export const actions = {
  reset({ commit }) {
    commit('RESET')
  },
  open({ commit }, { component, props, events }) {
    const drawer = { component, props, events }
    commit('ADD', drawer)
  },
  close({ commit }, drawer) {
    commit('DEACTIVATE', drawer)
    commit('FIXED', drawer)

    setTimeout(() => {
      commit('REMOVE', drawer)
    }, 300)
  },
  activate({ commit }, drawer) {
    console.log(drawer)
    commit('ACTIVATE', drawer)
  },
  deactivate({ commit }, drawer) {
    commit('DEACTIVATE', drawer)
  },
  fixed({ commit }) {
    commit('FIXED')
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
