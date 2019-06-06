<template>
  <div class="copy">
    <img :src="copy.quoteSm" class="quote d-md-none" height="60px">
    <img :src="copy.quoteMd" class="quote d-none d-md-inline-block">
    <div class="img-container">
      <div class="dessert-img" :style="{'background-image': 'url(' + copy.img + ')'}"></div>
    </div>
    <div class="content">
      <span>{{ copy.content }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    copy: {
      type: Object,
      default: () => {
        return {
          direction: '',
          quoteSm: '',
          quoteMd: '',
          img: '',
          content: ''
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/all';

.copy {
  width: 100%;
  .quote {
    display: block;
    margin: $sm-spacer auto;
  }
  .img-container {
    width: 100%;
    padding-bottom: 66.66%;
    position: relative
  }
  .dessert-img {
    width: 100%;
    height: 100%;
    @include bg-cover;
    position: absolute
  }
  .content {
    width: 100%;
    background-color: $light;
    padding: $sm-spacer;
    span {
      line-height: 2rem;
      letter-spacing: .1rem;
      white-space: pre-wrap;
      color: $info;
    }
  }
}
@include md {
  .copy {
    margin-top: 60px;
    padding: 0 $md-spacer;
    @include flex-wrap($f-d: row-reverse, $a-i: flex-start);
    position: relative;
    .img-container {
      width: 45vw;
      padding-bottom: 45vw;
    }
    .quote {
      width: 8.6vw;
      margin: 0;
    }
    .content {
      padding: 1.5*$md-spacer 2.5*$md-spacer+8.6vw 1.5*$md-spacer 0;
      position: absolute;
      left: 0;
      top: 20px;
      bottom: 20px;
      z-index: -5;
      span {
        writing-mode: vertical-rl;
        float: right;
      }
    }
  }
  .left {
    flex-direction: row;
    justify-content: flex-end;
    .quote {
      margin-right: $md-spacer;
    };
    .content {
      padding-right: 3.5*$md-spacer+45vw+8.6vw;
    }
  }
}
</style>
