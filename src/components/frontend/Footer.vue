<template>
  <footer class="footer">
    <div class="bg-light py-4">
      <div class="container">
        <div
          class="d-flex flex-column flex-md-row justify-content-between align-items-md-center align-items-start"
        >
          <p class="mb-0 font-weight-bold">訂閱我們-獲得最新優惠</p>

          <div class="input-group w-md-50 mt-md-0 mt-3">
            <input
              type="email"
              class="form-control rounded-0"
              placeholder="請輸入 e-mail"
              v-model="userEmail"
            />
            <div class="input-group-append">
              <button
                class="btn btn-primary rounded-0"
                type="submit"
                @click="subscribe"
              >
                <i class="fas fa-paper-plane"> 訂閱</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-primary py-4">
      <div class="container">
        <div
          class="d-flex align-items-center justify-content-between text-white mb-md-7 mb-4"
        >
          <router-link
            class="text-white text-white h4 text-decoration-none"
            to="/"
            exact
            >HA.Flower</router-link
          >
          <ul class="d-flex list-unstyled mb-0 h4">
            <li>
              <a href="#" class="text-white mx-3"
                ><i class="fab fa-facebook"></i
              ></a>
            </li>
            <li>
              <a href="#" class="text-white mx-3"
                ><i class="fab fa-instagram"></i
              ></a>
            </li>
            <li>
              <a href="#" class="text-white ml-3"
                ><i class="fab fa-line"></i
              ></a>
            </li>
          </ul>
        </div>
        <div
          class="d-flex flex-column flex-md-row justify-content-between align-items-md-end align-items-start text-white"
        >
          <div class="mb-md-0 mb-1">
            <p class="mb-0">02-3345678</p>
            <p class="mb-0">service@mail.com</p>
          </div>
          <p class="mb-0">© 2020 HA-flower All Rights Reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      userEmail: ''
    };
  },
  methods: {
    subscribe() {
      if (this.userEmail != '') {
        this.$bus.$emit('message:push', '訂閱成功，感謝您的訂閱', 'success');
        this.userEmail = '';
      } else {
        this.$bus.$emit('message:push', '哎呀，好像還沒輸入email呢', 'danger');
      }
    }
  }
};
</script>

<style lang="scss">
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
