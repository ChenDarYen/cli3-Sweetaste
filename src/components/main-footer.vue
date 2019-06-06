<template>
  <div class="footer">
    <div class="mail-container">
      <div class="slogan text-center text-md-left">
        <img src="../assets/img/logo-light.svg" height="40px">
        <span>訂閱你我的甜蜜郵件</span>
      </div>
      <div class="input-group">
        <input type="text" class="form-control">
        <div class="input-group-append">
          <button class="btn btn-secondary">
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="info-container">
      <div class="info-content">
        <img src="../assets/img/logotype-lg-dark.svg" height="26.6px">
        <ul class="list-group">
          <li class="list-group-item">07-1234-5678800</li>
          <li class="list-group-item">sweetaste@email.com</li>
          <li class="list-group-item">高雄市新興區幸福路 520 號</li>
        </ul>
        <div class="media">
          <a href="#">
            <i class="fab fa-facebook-square"></i>
          </a>
          <a href="#">
            <i class="fab fa-youtube"></i>
          </a>
        </div>
      </div>
      <div class="copyright">
        <img src="../assets/img/sm-今天是個吃甜點的好日子.svg" height="220px" class="d-none d-md-inline-block">
        <span>© 2019 Sweetaste* All Rights Reserved</span>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '../assets/all';

.footer, .mail-container, .info-container, .copyright {
  width: 100%;
  @include flex-wrap;
}
.mail-container {
  padding: $sm-spacer;
  background-color: $primary;
  color: $light
}
.slogan, .input-group {
  width: 100%;
}
.slogan {
  font-size: 1.5rem;
  font-weight: 600;
}
.input-group {
  height: 56px;
  margin-top: 30px;
  position: relative;
  &:before {
    color: $primary;
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    font-size: 1.5rem;
    content: "\f0e0";
    position: absolute;
    z-index: 1;
    left: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
  }
  input {
    height: 100%;
    font-size: 1.5rem;
  }
}
.info-container {
  background-color: $light;
  padding: 1.3*$sm-spacer $sm-spacer;
  color: $primary
}
ul {
  margin-top: 40px;
  line-height: 1.5
}
.media {
  margin-top: 37px;
  a {
    font-size: 2rem;
    margin-right: 0.5rem;
  }
}
.copyright {
  margin-top: 23px;
}
@include md {
  .mail-container, .info-container {
    padding-right: 2*$md-spacer;
    padding-left: 2*$md-spacer;
  }
  .slogan, .input-group, .info-content, .copyright {
    width: 50%
  }
  .mail-container {
    align-items: center;
    .input-group {
      margin-top: 0;
    }
  }
  .info-content ul {
    margin-top: 115px;
  }
  .copyright {
    margin-top: 0;
    @include flex-wrap($f-d: column, $a-i: flex-end);
  }
}
@include lg {
  .mail-container, .info-container {
    padding-right: 3*$md-spacer;
    padding-left: 3*$md-spacer;
  }
}
</style>
