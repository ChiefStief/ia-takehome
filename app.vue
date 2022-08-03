<script>
  export default {
    methods: {
      handleMouseDown(target) {
        console.log('target', target)
      }
    }
  }
</script>
<template>
  <div class="app-wrapper">
    <div>
      <img class="blu dot" ref="blu" @mousedown="handleMouseDown" src="@/ia-logo-dot-blue.png" />
      <img class="red dot" ref="red" @mousedown="handleMouseDown" src="@/ia-logo-dot-red.png" />
      <img class="grn dot" ref="grn" @mousedown="handleMouseDown" src="@/ia-logo-dot-green.png" />
      <img class="blk dot" ref="blk" @mousedown="handleMouseDown" src="@/ia-logo-dot-black.png" />
      <img class="blk2 dot" ref="blk2" @mousedown="handleMouseDown" src="@/ia-logo-dot-black.png" />
    </div>
    <div>
      <img class="empty-logo" ref="logo" @mousedown="handleMouseDown" src="@/ia-logo-back.png" />
    </div>

  </div>
</template>


<style scoped>

  /*.dot{*/
  /*  padding: 20px 42px 20px 0;*/
  /*}*/

  .blu{
    position: absolute;
  }

  .red{

  }



</style>
