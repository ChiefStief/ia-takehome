<script>
export default {
  data () {
    return {
      lastDragSpot: {},
      mounted: false,
      dotRad: 43,
      cursorOffset: {left:0, top:0},
      leftOffset:0,
      topOffset:0,
      initPos: {
        blu: { left: 10, top: 10 },
        red: {left: 140, top: 10},
        grn: {left: 270, top: 10},
        blk: {left: 400, top: 10},
        blk2: {left: 530, top: 10},
      },
      correctRelativePos:{
        blu: { dots:['blu'], left: 276, top: 47 },
        red: { dots:['red'], left: 456, top: 71},
        grn: { dots:['grn'], left: 143, top: 335},
        blkl: { dots:['blk', 'blk2'], left: 46, top: 190},
        blkr: { dots:['blk', 'blk2'], left: 420, top: 286},
      },
      style: { },
      // endStyle: {
      //   // blu: 'top: 177px; left:286px',
      //   red: 'top: 201px; left:466px',
      //   //grn: 'top: 465px; left:153px',
      //   blkl: 'top: 320px; left:56px',
      //   blkr: 'top: 416px; left:430px',
      // },
      positionsFilled: {
        blu: null,
        red: null,
        grn: null,
        blkl: null,
        blkr: null,
      },
      correctPositionRange: {
        // blu: [{ id:'blu', x: { max:0, min:0 }, y: { max:0, min:0 } }],
        // grn: [{ id:'grn', x: { max:0, min:0 }, y: { max:0, min:0 } }],
        // red: [{ id:'red', x: { max:0, min:0 }, y: { max:0, min:0 } }],
        // blk: [{ id:'blkl', x: { max:0, min:0 }, y: { max:0, min:0 } }, { id:'blkr', x: { max:0, min:0 }, y: { max:0, min:0 } }],
        // blk2: [{ id:'blkl', x: { max:0, min:0 }, y: { max:0, min:0 } }, { id:'blkr', x: { max:0, min:0 }, y: { max:0, min:0 } }]
      }
    }
  },
  computed: {
    isComplete(){
      return Object.values(this.positionsFilled).every((v) => v === true)
    },
    // initPos(){
    //   if(!this.mounted) return
    //   console.log('logo', this.$refs.logo)
    //   const emptyLogo = this.$refs["logo"] //document.querySelectorAll('.empty-logo')
    //   // const logoWidth = emptyLogo[0].width
    //   //
    //   // this.style.emptyLogo = `position: absolute; left: 50%; margin-left:-${logoWidth/2}px; top: 130px`
    //
    //
    //
    //   const leftOffset = emptyLogo[0].offsetLeft
    //   const topOffset = emptyLogo[0].offsetTop
    //   console.log('leftOffset')
    //   let curLeft = leftOffset
    //   let initPosReplacement = {}
    //   for(let dot in this.correctPositionRange){
    //     initPosReplacement[dot]={ left:curLeft, top:10 }
    //     curLeft = curLeft + 129
    //   }
    //   return {...initPosReplacement}
    // },
    initStyle(){
      let toReturn = { }
      for(let dot in this.initPos){
        console.log('dot', dot)
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
    }
  },
    methods: {
      createCorrectPositionRanges(){
        console.log('in here')
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
              x: {max: this.correctRelativePos[pos].left+this.leftOffset+this.dotRad, min: this.correctRelativePos[pos].left+this.leftOffset-this.dotRad},
              y: {max: this.correctRelativePos[pos].top+this.topOffset+this.dotRad, min: this.correctRelativePos[pos].top+this.topOffset-this.dotRad}
            })
          })
        }
        this.correctPositionRange = {...newCorrectPositionRange}
      },
      setEmptyLogoOffsets(){
        const emptyLogo = document.querySelectorAll('.empty-logo')
        this.leftOffset = emptyLogo[0].offsetLeft
        this.topOffset = emptyLogo[0].offsetTop
      },
      getCorrectLocations(){
        this.setEmptyLogoOffsets()
        let curLeft = this.leftOffset
        let initPosReplacement = {}
        for(let dot in this.initPos){
          initPosReplacement[dot]={ left:curLeft, top:10 }
          curLeft = curLeft + 129
        }
        this.initPos = {...initPosReplacement}
        this.createCorrectPositionRanges()

      },
      setToInitPosition () {
        this.style = {...this.initStyle}
        this.positionsFilled = {
          blu: false,
          red: false,
          grn: false,
          blkl: false,
          blkr: false,
        }
      },
      dragStart(e) {
        this.calculateCursorOffset(e)
      },
      calculateCursorOffset(e){
        this.cursorOffset = {left: e.offsetX, top: e.offsetY}
        // this.cursorOffset = {left: e.x - this.initPos[e.target.id].left, top: e.y - this.initPos[e.target.id].top}
      },
      handleDrag(e) {
        this.lastDragSpot = { left: e.x, top: e.y }
      },
      handleDragEnd(e) {
        let isCorrect = false
        let positionId
        let imageRealX = this.lastDragSpot.left - this.cursorOffset.left
        let imageRealY = this.lastDragSpot.top - this.cursorOffset.top
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
          this.style[e.target.id] = this.endStyle[positionId]
        }
      },
      getDotDimensions(){
        const bludot = document.querySelectorAll('.blu')[0]
        this.dotRad = bludot.width / 2
      },
      handleResize() {
        this.getCorrectLocations()
        // move correct dots to correct place
      }
    },

    mounted () {
      this.mounted = true
      this.getDotDimensions()
      this.getCorrectLocations()
      this.setToInitPosition()
      window.addEventListener('resize', this.handleResize)
      const dots = document.querySelectorAll('.dot');
      dots.forEach(dot => {
        dot.addEventListener('dragstart', this.dragStart)
        dot.addEventListener('drag', this.handleDrag)
        dot.addEventListener('dragend', this.handleDragEnd)
        dot.addEventListener('drop', this.handleDrop)
      });
    }
  }
</script>
<template>
  <div class="app-wrapper">
    <div>
      <img class="blu dot" ref="blu" id="blu" :style="style.blu" draggable="true" src="@/ia-logo-dot-blue.png" />
      <img class="red dot" ref="red" id="red" :style="style.red" draggable="true" src="@/ia-logo-dot-red.png" />
      <img class="grn dot" ref="grn" id="grn" :style="style.grn" draggable="true" src="@/ia-logo-dot-green.png" />
      <img class="blk dot" ref="blk" id="blk" :style="style.blk" draggable="true" src="@/ia-logo-dot-black.png" />
      <img class="blk2 dot" ref="blk2" id="blk2" :style="style.blk2" draggable="true" src="@/ia-logo-dot-black.png" />
<!--      <button @click="moveTest" />-->
    </div>
    <div>
      <img class="empty-logo" id="logo" ondragover="event.preventDefault()" ref="logo" src="@/ia-logo-back.png" />
    </div>
    <button class="reset-btn"  @click="setToInitPosition()">Reset </button>
  </div>
</template>


<style scoped>

/*  dynamically generate dots locations based off of logo image width*/

.title{

}

  .dot{
    position: absolute;
    z-index: 10;
    cursor: move;
  }

  .reset-btn {

  }
  .empty-logo {
    position: absolute;
    left: 50%;
    margin-left:-300px;
    top: 130px
  }



</style>
