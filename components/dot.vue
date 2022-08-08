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
    dragStart(){
      console.log('dragStart')
    },
    handleDrag(){
      console.log('drag')
    },
    handleDragEnd(){
      console.log('dragEnd')
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
