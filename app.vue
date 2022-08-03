<script>
  export default {
    methods: {
      // handleMouseDown (target) {
      //   console.log('target', target)
      // },
      dragStart(e) {
        console.log('drag starts...');
      },
      handleDrag(e) {
        console.log('dragE', e);
      },
      handleDragEnd(e) {
        console.log('dragEnd', e);
      }
    },

    mounted () {
      //get location of dots final state
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
