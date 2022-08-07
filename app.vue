<script>
export default {
  data () {
    return {
      lastDragSpot: {},
      mounted: false,
      dropTolerance: 50,
      cursorOffset: {left:0, top:0},
      leftOffset:0,
      topOffset:0,
      doneColorIntervalId: null,
      feedbackDoneColor: '',
      showFeedbackWrong: false,
      showFeedbackCorrect: false,
      showFeedbackDone: false,
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
      },
    }
  },
  computed: {
    isComplete(){
      return Object.values(this.positionsFilled).every((v) => !!v === true)
    },
    // leftOffset(){
    //   return this.mounted ? this.$refs.logo.offsetLeft : -1000
    //   // const emptyLogo = document.querySelectorAll('.empty-logo')
    //   // this.leftOffset = emptyLogo[0].offsetLeft
    //   // this.topOffset = emptyLogo[0].offsetTop
    // },
    // topOffset(){
    //   return this.mounted ? this.$refs.logo.offsetTop : -1000
    //
    // //   const emptyLogo = document.querySelectorAll('.empty-logo')
    // //   this.leftOffset = emptyLogo[0].offsetLeft
    // //   this.topOffset = emptyLogo[0].offsetTop
    // },
    initPos(){
      if(!this.mounted) {
        return  ({
          blu: { left: 10, top: -100 },
          red: {left: 140, top: -100},
          grn: {left: 270, top: -100},
          blk: {left: 400, top: -100},
          blk2: {left: 530, top: -100},
        })
      }
      let curLeft = this.leftOffset
      let initPosReplacement = {}
      for(let dot in this.correctPositionRange){
        initPosReplacement[dot]={ left:curLeft, top:this.topOffset-120}
        curLeft = curLeft + 129
      }
      return initPosReplacement
    },
    curStyle(){
      let toReturn = {}
      for (let dot in this.dotLocations){
        if(this.dotLocations[dot] === 'init'){
          toReturn[dot] = this.initStyle[dot]
        } else {
          toReturn[dot] = this.endStyle[this.dotLocations[dot]]
        }
      }
      return toReturn
    },
    initStyle(){
      let toReturn = { }
      for(let dot in this.initPos){
        toReturn[dot] = `left:${this.initPos[dot].left}px; top:${this.initPos[dot].top}px;`
      }
      return toReturn
    },
    endStyle() {
      let toReturn = {}
      for (let location in this.correctRelativePos){
        toReturn[location] = `left:${this.correctRelativePos[location].left+this.leftOffset}px; top:${this.correctRelativePos[location].top+this.topOffset}px;`
      }
      return toReturn
    },
    correctPositionRange() {
      let newCorrectPositionRange = {
        blu: [],
        grn: [],
        red: [],
        blk: [],
        blk2: []
      }
      for (let pos in this.correctRelativePos) {
        this.correctRelativePos[pos].dots.forEach((dot)=>{
          newCorrectPositionRange[dot].push({
            id: pos,
            x: {max: this.correctRelativePos[pos].left+this.leftOffset+this.dropTolerance, min: this.correctRelativePos[pos].left+this.leftOffset-this.dropTolerance},
            y: {max: this.correctRelativePos[pos].top+this.topOffset+this.dropTolerance, min: this.correctRelativePos[pos].top+this.topOffset-this.dropTolerance}
          })
        })
      }
      return {...newCorrectPositionRange}
    }
  },
    methods: {
      setOffsets(){
        const emptyLogo = document.querySelectorAll('.empty-logo')
        this.leftOffset = emptyLogo[0].offsetLeft
        this.topOffset = emptyLogo[0].offsetTop
      },
      setToInitPosition () {
        this.positionsFilled = {
          blu: null,
          red: null,
          grn: null,
          blkl: null,
          blkr: null,
        }
        this.dotLocations= {
          blu: 'init',
          grn: 'init',
          red: 'init',
          blk: 'init',
          blk2: 'init'
        }
      },
      dragStart(e) {
        this.cursorOffset = {left: e.offsetX, top: e.offsetY}
        // this.calculateCursorOffset(e)
      },
      // calculateCursorOffset(e){
      //   this.cursorOffset = {left: e.offsetX, top: e.offsetY}
      //   // this.cursorOffset = {left: e.x - this.initPos[e.target.id].left, top: e.y - this.initPos[e.target.id].top}
      // },
      handleDrag(e) {
        this.lastDragSpot = { left: e.x, top: e.y }
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
      handleResize() {
        this.setOffsets()
      },
      giveFeedbackCorrect(){
        this.showFeedbackCorrect = true
       setTimeout(()=>{this.showFeedbackCorrect=false}, 1000)
      },
      giveFeedbackWrong(){
        this.showFeedbackWrong = true
        setTimeout(() => {this.showFeedbackWrong=false}, 1000)
      },
      giveFeedbackDone(){
        this.showFeedbackDone = true
        this.doneColorIntervalId = setInterval(function () {element.innerHTML += "Hello"}, 5000)
      },
    },

    mounted () {
      this.mounted = true
      this.setOffsets()
      window.addEventListener('resize', this.handleResize)
      const dots = document.querySelectorAll('.dot');
      dots.forEach(dot => {
        dot.addEventListener('dragstart', this.dragStart)
        dot.addEventListener('drag', this.handleDrag)
        dot.addEventListener('dragend', this.handleDragEnd)
      });
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.handleResize)
      const dots = document.querySelectorAll('.dot');
      dots.forEach(dot => {
        dot.removeEventListener('dragstart', this.dragStart)
        dot.removeEventListener('drag', this.handleDrag)
        dot.removeEventListener('dragend', this.handleDragEnd)
      });
    }
}
</script>
<template>
  <div class="app-wrapper">
    <div class="title">
      InspiringApps Logo Challenge
    </div>
    <div class="reset-btn-wrapper">
      <div class="feedback-left" >{{showFeedbackCorrect ? 'Nice!!' : ''}}{{showFeedbackDone ? 'You did it!!!' : ' '}}</div>
      <button class="reset-btn"  @click="setToInitPosition()">Reset </button>
      <div class="feedback-right" >{{showFeedbackWrong ? 'Not Quite' : ''}}{{showFeedbackDone ? 'You did it!!!' : ' '}}</div>
<!--      <span class="feedback-wrong feedback-right" v-if="showFeedbackWrong">Not Quite</span>-->
<!--      <span class="feedback-done feedback-right" v-if="showFeedbackDone">You did it!!!</span>-->
    </div>

    <div>
      <img class="blu dot" ref="blu" id="blu" :style="curStyle.blu" draggable="true" src="@/ia-logo-dot-blue.png" />
      <img class="red dot" ref="red" id="red" :style="curStyle.red" draggable="true" src="@/ia-logo-dot-red.png" />
      <img class="grn dot" ref="grn" id="grn" :style="curStyle.grn" draggable="true" src="@/ia-logo-dot-green.png" />
      <img class="blk dot" ref="blk" id="blk" :style="curStyle.blk" draggable="true" src="@/ia-logo-dot-black.png" />
      <img class="blk2 dot" ref="blk2" id="blk2" :style="curStyle.blk2" draggable="true" src="@/ia-logo-dot-black.png" />
    </div>
    <div>
      <img class="empty-logo" id="logo" ondragover="event.preventDefault()" ref="logo" src="@/ia-logo-back.png" />
    </div>

  </div>
</template>


<style scoped>
  .app-wrapper{
    min-width: 600px;
  }

  .feedback-correct{

  }

  .feedback-wrong{

  }

  .feedback-left {
    flex-basis: 100px;
    margin-right: 100px;
  }

  .feedback-right {
    flex-basis: 100px;
    margin-left: 100px;
  }

  .title{
    text-align: center;
    font-size: 48px;
  }

  .dot{
    position: absolute;
    z-index: 10;
    cursor: move;
  }

  .reset-btn-wrapper{
    padding-top: 10px;
    display:flex;
    justify-content: center;
  }

  .empty-logo {
    position: absolute;
    left: 50%;
    margin-left:-300px;
    top: 230px;
  }
</style>
