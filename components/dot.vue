<template>
  <img class="dot" :id="id" :style="curStyle" draggable="true" :src="src" />
</template>

<script>
export default {
  name: "dot",
  props: {
    id: {
      type: String,
      default: '',
      required: true
    },
    src: {
      type: String,
      default: '@/ia-logo-dot-blue.png',
      required: true
    },
    initPos: {
      type: Object,
      default: {},
      required: true
    },
    leftOffset: {
      type: Number,
      default: 0,
      required: true
    },
    topOffset: {
      type: Number,
      default: 0,
      required: true
    },
    endStyle: {
      type: Object,
      default: {},
      required: true
    }
  },
  data () {
    return {
      dotLocation: 'init'
    }
  },
  computed: {
    initStyle(){
      return `left:${this.initPos[this.id].left}px; top:${this.initPos[this.id].top}px;`
    },
    curStyle() {
      return this.dotLocation === 'init' ? this.initStyle : this.endStyle[this.dotLocation]
    }
  },
  methods: {
    handleDragStart(e) {
      // this.$store.commit('UPDATE_CURSOR_OFFSET', {left: e.offsetX, top: e.offsetY})

    },
    handleDrag(e) {
      // this.lastDragSpot = { left: e.x, top: e.y }
    },
    handleDragEnd(e) {
      let isCorrect = false
      let positionId
      let imageRealX = this.lastDragSpot.left - this.cursorOffset.left
      let imageRealY = this.lastDragSpot.top - this.cursorOffset.top + window.scrollY

      this.correctPositionRange[e.target.id].forEach(possibleLocation=>{
        if (imageRealX>possibleLocation.x.min && imageRealX<possibleLocation.x.max && imageRealY>possibleLocation.y.min && imageRealY<possibleLocation.y.max && !this.positionsFilled[possibleLocation.id]) {
          isCorrect = true
          positionId = possibleLocation.id
        }
      })
      if (isCorrect) {
        for (let pos in this.positionsFilled) {
          if (this.positionsFilled[pos] === e.target.id){
            this.positionsFilled[pos] = null
          }
        }
        this.positionsFilled[positionId] = e.target.id
        this.dotLocations[e.target.id] = positionId
        if (!this.isComplete) {
          this.giveFeedbackCorrect()
        } else {
          this.giveFeedbackDone()
        }
      } else {
        this.giveFeedbackWrong()
      }
    },
  },
  mounted () {
    this.$el.addEventListener('dragstart', this.dragStart)
    this.$el.addEventListener('drag', this.handleDrag)
    this.$el.addEventListener('dragend', this.handleDragEnd)
  },
}
</script>

<style scoped>
  .dot{
    position: absolute;
    z-index: 10;
    cursor: move;
  }

</style>
