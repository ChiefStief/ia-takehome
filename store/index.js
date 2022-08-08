export const state = () => ({
  initialized: false,
  thing: null
})


export const mutations = {
  UPDATE_THING (state, update) {
    state.thing = update
  },
  RESET (state) {
    state.thing = null
  }
}
