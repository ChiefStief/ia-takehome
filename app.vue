<script>
export default {
  data () {
    return {
      mounted: false,
      dotRad: 43,
      cursorOffset: {left:0, top:0},
      initPos: {
        blu: { left: 10, top: 10 },
        red: {left: 140, top: 10},
        grn: {left: 270, top: 10},
        blk: {left: 400, top: 10},
        blk2: {left: 530, top: 10},
      },
      style: { },
      endStyle: {
        // blu: 'top: 177px; left:286px',
        red: 'top: 201px; left:466px',
        //grn: 'top: 465px; left:153px',
        blkl: 'top: 320px; left:56px',
        blkr: 'top: 416px; left:430px',
      },
      positionsFilled: {
        blu: false,
        red: false,
        grn: false,
        blkl: false,
        blkr: false,
      },
      correctPositionData: {
        blu: [{ id:'blu', x: { max:0, min:0 }, y: { max:0, min:0 } }],
        grn: [{ id:'grn', x: { max:0, min:0 }, y: { max:0, min:0 } }],
        red: [{ id:'red', x: { max:0, min:0 }, y: { max:0, min:0 } }],
        blk: [{ id:'blkl', x: { max:0, min:0 }, y: { max:0, min:0 } }, { id:'blkr', x: { max:0, min:0 }, y: { max:0, min:0 } }],
        blk2: [{ id:'blkl', x: { max:0, min:0 }, y: { max:0, min:0 } }, { id:'blkr', x: { max:0, min:0 }, y: { max:0, min:0 } }]
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
    //   for(let dot in this.correctPositionData){
    //     initPosReplacement[dot]={ left:curLeft, top:10 }
    //     curLeft = curLeft + 129
    //   }
    //   return {...initPosReplacement}
    // },
    initStyle(){
      let toReturn = { }
      for(let dot in this.initPos){
        toReturn[dot] = `left:${this.initPos[dot].left}px; top:${this.initPos[dot].top}px;`
      }
      return toReturn
    }
  },
    methods: {

      getCorrectLocations(){
        const emptyLogo = document.querySelectorAll('.empty-logo')
        // const logoWidth = emptyLogo[0].width
        //
        // this.style.emptyLogo = `position: absolute; left: 50%; margin-left:-${logoWidth/2}px; top: 130px`



        const leftOffset = emptyLogo[0].offsetLeft
        const topOffset = emptyLogo[0].offsetTop
        console.log('leftOffset')
        let curLeft = leftOffset
        let initPosReplacement = {}
        for(let dot in this.initPos){
          initPosReplacement[dot]={ left:curLeft, top:10 }
          curLeft = curLeft + 129
        }
        this.initPos = {...initPosReplacement}

        // this.initStyle.emptyLogo =


        //could make function but would likely have to do math for where center is based on where clicked etc

        //blu
        this.correctPositionData.blu[0].x={max: leftOffset+376+this.dotRad, min: leftOffset+376-this.dotRad}
        this.correctPositionData.blu[0].y={max: topOffset+64+this.dotRad, min: topOffset+64-this.dotRad}
        this.correctPositionData.blu[0].id='blu'
        this.endStyle.blu = `top: ${topOffset+47}px; left:${leftOffset+276}px`

        //grn
        this.correctPositionData.grn[0].x={max: leftOffset+260+this.dotRad, min: leftOffset+260-this.dotRad}
        this.correctPositionData.grn[0].y={max: topOffset+336+this.dotRad, min: topOffset+336-this.dotRad}
        this.correctPositionData.grn[0].id='grn'
        this.endStyle.grn = `top: ${topOffset+335}px; left:${leftOffset+143}px`

        //Here

        //red
        this.correctPositionData.blu[0].x={max: leftOffset+376+this.dotRad, min: leftOffset+376-this.dotRad}
        this.correctPositionData.blu[0].y={max: topOffset+64+this.dotRad, min: topOffset+64-this.dotRad}
        this.correctPositionData.blu[0].id='blu'
        this.endStyle.blu = `top: ${topOffset+47}px; left:${leftOffset+276}px`

        this.correctPositionData.red[0].x={max: 558+this.dotRad, min: 558-this.dotRad}
        this.correctPositionData.red[0].y={max: 194+this.dotRad, min: 194-this.dotRad}
        this.correctPositionData.red[0].id='red'


        console.log('emptyLogo', emptyLogo)
        console.log('leftOffset', leftOffset)
        console.log('topOffset', topOffset)



        // look into whether this has bad perf side effects

        // rightTop-red:
        // x: 558
        // y: 194
        // rightBottom-blk:
        // x: 473
        // y: 457
        //middle-blu
        // x: 386
        // y: 194
        // top left-blk
        // x: 136
        // y: 312
        // bottom left-grn
        // x: 270
        // y: 466

        // this.correctPositionData.blu[0].x={max: 386+this.dotRad, min: 386-this.dotRad}
        // this.correctPositionData.blu[0].y={max: 194+this.dotRad, min: 194-this.dotRad}
        // this.correctPositionData.blu[0].id='blu'

        // this.correctPositionData.grn[0].x={max: 270+this.dotRad, min: 270-this.dotRad}
        // this.correctPositionData.grn[0].y={max: 466+this.dotRad, min: 466-this.dotRad}
        // this.correctPositionData.grn[0].id='grn'


        this.correctPositionData.red[0].x={max: 558+this.dotRad, min: 558-this.dotRad}
        this.correctPositionData.red[0].y={max: 194+this.dotRad, min: 194-this.dotRad}
        this.correctPositionData.red[0].id='red'


        this.correctPositionData.blk[0].x={max: 493+this.dotRad, min: 493-this.dotRad}
        this.correctPositionData.blk[0].y={max: 410+this.dotRad, min: 410-this.dotRad}
        this.correctPositionData.blk[0].id='blkr'


        this.correctPositionData.blk[1].x={max: 136+this.dotRad, min: 136-this.dotRad}
        this.correctPositionData.blk[1].y={max: 312+this.dotRad, min: 312-this.dotRad}
        this.correctPositionData.blk[1].id='blkl'


        this.correctPositionData.blk2 = [...this.correctPositionData.blk]
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
        console.log('dragStarte', e)
        this.calculateCursorOffset(e)
       //  e.dataTransfer.setDragImage(img, 0, 0)
        // e.preventDefault()
        // console.log('height', bludot.height)
        // console.log('width', bludot.width)
        // console.log('drag starts...');
      },
      calculateCursorOffset(e){
        this.cursorOffset = {left: this.initPos[e.target.id].left-e.x, top: this.initPos[e.target.id].top-e.y}
        console.log('cursorOffset', this.cursorOffset)
      },
      handleDrag(e) {
        // console.log('dragE', e)
        // console.log('data', this.data)
        // console.log('e.target.id', e.target.id)
      },
      handleDragEnd(e) {
        // validate dot positioning
       console.log('dragEndE', e)
        let isCorrect = false
        let positionId
        // let imageReal
        this.correctPositionData[e.target.id].forEach(possibleLocation=>{
          if (e.x>possibleLocation.x.min && e.x<possibleLocation.x.max && e.y>possibleLocation.y.min && e.y<possibleLocation.y.max && !this.positionsFilled[possibleLocation.id]) {
            isCorrect = true
            positionId = possibleLocation.id
          }

          //isCorrect = (e.x>possibleLocation.x.min && e.x<possibleLocation.x.max && e.y>possibleLocation.y.min && e.y<possibleLocation.y.max && !this.positionsFilled[possibleLocation.id]) || isCorrect


          // if (isCorrect && (e.target.id === 'blk' || e.target.id === 'blk2')) {
          //   isCorrect = !this.positionsFilled[possibleLocation.id]
          // }
          // console.log('possibleLocationx', possibleLocation.x)
          // console.log('possibleLocationy', possibleLocation.y)
          // console.log('e.x', e.x)
          // console.log('e.y', e.y)
        })
        if (isCorrect) {
          // e.preventDefault()
          this.positionsFilled[positionId] = true
          this.style[e.target.id] = this.endStyle[positionId]
        }
        console.log('isCorrect', isCorrect)
        // return isCorrect

      },
      getDotDimensions(){
        const bludot = document.querySelectorAll('.blu')[0]
        this.dotRad = bludot.width / 2
      },
      getLogoDimensions(){
        // const emptyLogo = document.querySelectorAll('.empty-logo')
        // const logoWidth = emptyLogo[0].width
        // console.log('logoWidth', logoWidth)
        //
        // this.style.emptyLogo = `position: absolute; left: 50%; margin-left:-${logoWidth/2}px; top: 130px`


      },

      //setupLocation({topOffset, leftOffset,)
      handleResize() {
        this.getCorrectLocations()
        // move correct dots to correct place
      },
      updateIndividualLocation({topOffset, leftOffset}){

      }
    },

    mounted () {
      //get location of dots final state

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

      // document.ondragover = (e) => {
      //   if (draggedId === "logo") {
      //     e.preventDefault();
      //   }
      // }
    }
  }
</script>
<template>
  <div class="app-wrapper">
    {{initStyle}}
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
