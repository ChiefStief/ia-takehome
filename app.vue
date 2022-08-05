<script>
export default {
  data () {
    return {
      dotRad: 0,
      correctPositionData: {
        blu: [{ x: { max:0, min:0 }, y: { max:0, min:0 } }],
        grn: { x: [{ max:0, min:0 }], y: [{ max:0, min:0 }] },
        red: { x: [{ max:0, min:0 }], y: [{ max:0, min:0 }] },
        blk: { x: [{ max:0, min:0 },{ max:0, min:0 }], y: [{ max:0, min:0 },{ max:0, min:0 }] },
        // blk2: { x: [{max:0, min:0},{max:0, min:0}], y: [{max:0, min:0},{max:0, min:0}], },
      }
    }
  },
    methods: {
      // handleMouseDown (target) {
      //   console.log('target', target)
      // },
      dragStart(e) {
        // console.log('height', bludot.height)
        // console.log('width', bludot.width)
        // console.log('drag starts...');
      },
      handleDrag(e) {
        // udpdate dot positioning if wanted
        // console.log('dfsdf')
        // console.log('dragE', e);

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


      },
      handleDragEnd(e) {
        // validate dot positioning
       //  console.log('e.target.id', e.target.id)
        let isCorrect = false
        this.correctPositionData[e.target.id].forEach(possibleLocation=>{
          console.log('possibleLocationx', possibleLocation.x)
          console.log('possibleLocationy', possibleLocation.y)
          console.log('e.x', e.x)
          console.log('e.y', e.y)

          isCorrect = (e.x>possibleLocation.x.min && e.x<possibleLocation.x.max && e.y>possibleLocation.y.min && e.y<possibleLocation.y.max) || isCorrect
        })
        console.log('isCorrect', isCorrect)
        // return isCorrect

         console.log('dragEnd', e);
      },
      getDotDimensions(){
        const bludot = document.querySelectorAll('.blu')[0]
        this.dotRad = bludot.width / 2
      },
      getCorrectLocations(){
        const emptyLogo = document.querySelectorAll('.empty-logo')
        console.log('emptyLogo', emptyLogo)
        const leftOffset = emptyLogo[0].offsetLeft
        const topOffset = emptyLogo[0].offsetTop
        console.log('leftOffset', leftOffset)
        console.log('topOffset', topOffset)
        this.correctPositionData.blu[0].x={max: 386+this.dotRad, min: 386-this.dotRad}
        this.correctPositionData.blu[0].y={max: 194+this.dotRad, min: 194-this.dotRad}




        console.log('emptyLogo', emptyLogo)
      }
    },

    mounted () {
      //get location of dots final state


      this.getDotDimensions()
      this.getCorrectLocations()

      const dots = document.querySelectorAll('.dot');
      console.log('dots', dots)
      dots.forEach(dot => {
        dot.addEventListener('dragstart', this.dragStart)
        dot.addEventListener('drag', this.handleDrag)
        dot.addEventListener('dragend', this.handleDragEnd)
      });
    }
  }
</script>
<template>
  <div class="app-wrapper">
    {{dotRad}}
    <div>
      <img class="blu dot" ref="blu" id="blu" draggable="true" src="@/ia-logo-dot-blue.png" />
      <img class="red dot" ref="red" draggable="true" src="@/ia-logo-dot-red.png" />
      <img class="grn dot" ref="grn" draggable="true" src="@/ia-logo-dot-green.png" />
      <img class="blk dot" ref="blk" draggable="true" src="@/ia-logo-dot-black.png" />
      <img class="blk2 dot" ref="blk2" draggable="true" src="@/ia-logo-dot-black.png" />
    </div>
    <div>
      <img class="empty-logo" ref="logo" src="@/ia-logo-back.png" />
    </div>
  </div>
</template>


<style scoped>

/*  dynamically generate dots locations based off of logo image width*/

  .dot{
    position: absolute;
    z-index: 10;
  }

  .blu{
    left: 10px;
    top: 10px;
  }

  .red{
    left: 140px;
    top: 10px;
  }

  .grn{
    left: 270px;
    top: 10px;
  }

  .blk{
    left: 400px;
    top: 10px;
  }

  .blk2{
    left: 530px;
    top: 10px;
  }

  .empty-logo {
    position: absolute;
    left: 10px;
    top: 130px;
  }



</style>
