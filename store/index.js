export const state = () => ({
  cursorOffset: { left: 0, top: 0 },
  leftOffset: 0,
  topOffset: 0,
  correctRelativePos:{
    blu: { dots:['blu'], left: 276, top: 47 },
    red: { dots:['red'], left: 456, top: 71},
    grn: { dots:['grn'], left: 143, top: 335},
    blkl: { dots:['blk', 'blk2'], left: 46, top: 190},
    blkr: { dots:['blk', 'blk2'], left: 420, top: 286},
  },
  positionsFilled: {
    blu: null,
    red: null,
    grn: null,
    blkl: null,
    blkr: null,
  },
  dotLocations: {
    blu: 'init',
    grn: 'init',
    red: 'init',
    blk: 'init',
    blk2: 'init'
  }
})


export const mutations = {
  UPDATE_THING (state, update) {
    state.thing = update
  },
  RESET (state) {
    state.thing = null
  }
}
