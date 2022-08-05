<script>
export default {
  data () {
    return {
      dotDimensions: {},
      correctPositionData: {
        blu: [{ x: [], y: [], }],
        grn: [{ x: [], y: [], }],
        red: [{ x: [], y: [], }],
        blk: [{ x: [], y: [], }],
        blk2: [{ x: [], y: [], }],
      }
    }
  },
    methods: {
      // handleMouseDown (target) {
      //   console.log('target', target)
      // },
      dragStart(e) {
        console.log('height', bludot.height)
        console.log('width', bludot.width)
        console.log('drag starts...');
      },
      handleDrag(e) {
        // udpdate dot positioning if wanted
        //console.log('dragE', e);
      },
      handleDragEnd(e) {
        // validate dot positioning
        console.log('dragEnd', e);
      },
      getDotDimensions(){
        const bludot = document.querySelectorAll('.blu')

        console.log('bludotWidth', bludot[0].width)
      }
    },

    mounted () {
      //get location of dots final state


      this.getDotDimensions()
      //   dot.addEventListener('dragstart', this.dragStart)
      //   dot.addEventListener('drag', this.handleDrag)
      //   dot.addEventListener('dragend', this.handleDragEnd)
      //
      // });
    }
  }
</script>
<template>
  <div class="app-wrapper">
    <div>
      <img class="blu dot" ref="blu" draggable="true" src="@/ia-logo-dot-blue.png" />
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
