<template>
  <div class="fixed-top fade-out" :class="{ 'navBg-light': navBgLight }">
    <div class="container">
      <nav class="navbar navbar-expand navbar-light row">
        <router-link
          class="navbar-brand font-weight-bold text-primary"
          to="/"
          exact
          ><h1 class="logo m-0">HA.Flower</h1></router-link
        >
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          <div class="navbar-nav font-weight-bold">
            <!-- <router-link class="nav-item nav-link mr-4" to="/about">
            關於我們
          </router-link> -->
            <router-link class="nav-item nav-link mr-1 mr-sm-3" to="/products">
              產品列表
            </router-link>
            <router-link class="nav-item nav-link mr-1 mr-sm-3" to="/favorite">
              <i class="far fa-heart"></i>
            </router-link>
            <router-link class="nav-item nav-link" to="/cart">
              <i class="fas fa-shopping-cart">
                <span
                  v-if="carts.length"
                  class="badge badge-danger rounded-circle"
                  style="transform: translateX(-4px) translateY(-6px);"
                  >{{ carts.length }}</span
                >
              </i>
            </router-link>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      carts: [],
      navBgLight: false
    };
  },
  created() {
    this.getCart();
    this.$bus.$on('add-cart', (item, quantity) => {
      this.addToCart(item, quantity);
    });
    this.$bus.$on('get-cart', () => {
      this.getCart();
    });
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },

  methods: {
    getCart() {
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping`;
      this.$http.get(url).then((res) => {
        this.carts = res.data.data;
      });
    },
    addToCart(item, quantity = 1) {
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping`;
      const cart = {
        product: item.id,
        quantity
      };
      this.$http
        .post(url, cart)
        .then((res) => {
          this.getCart();
          this.$bus.$emit(
            'message:push',
            res.data.data.product.title + '成功加入購物車',
            'success'
          );
        })
        .catch((error) => {
          this.$bus.$emit(
            'message:push',
            error.response.data.errors[0],
            'danger'
          );
        });
    },
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      window.pageYOffset;

      if (scrollTop > 40) {
        this.navBgLight = true;
      } else {
        this.navBgLight = false;
      }
    }
  }
};
</script>
