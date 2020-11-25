<template>
  <div>
    <loading loader="dots" :active.sync="status.isLoading"></loading>
    <div
      class="position-relative d-flex align-items-center justify-content-center"
      style="min-height: 200px"
    >
      <div
        class="position-absolute"
        style="top:0; bottom: 0; left: 0; right: 0; opacity: 0.3;
        background: url(https://images.unsplash.com/photo-1518199266791-5375a83190b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80) fixed no-repeat center / cover; "
      ></div>
      <h3 class="mt-4" style="color:#8c7e7e;">收 藏 清 單</h3>
    </div>
    <div class="container">
      <div class="row pt-md-5">
        <div
          class="col-md-4 mt-md-6 "
          v-for="item in favProducts"
          :key="item.id"
        >
          <div class="card border-0 mb-4 position-relative position-relative">
            <router-link :to="`/product/${item.title}/${item.id}`">
              <img
                :src="item.imageUrl"
                class="card-img-top rounded-0"
                :alt="item.title"
              />
            </router-link>
            <a href="#" class="text-dark" @click.prevent="delfav(item)">
              <i
                class="fas fa-heart position-absolute text-white"
                style="right: 16px; top: 16px"
              ></i>
            </a>
            <a href="#" class="text-dark" @click.prevent="addToCart(item)">
              <i
                class="fas fa-shopping-cart position-absolute text-white"
                style="right: 50px; top: 16px"
              ></i>
            </a>
            <div class="card-body p-0 my-3">
              <h4 class="mb-0">
                <a
                  href="#"
                  class="text-decoration-none"
                  @click.prevent="goPage(item)"
                  >{{ item.title }}</a
                >
              </h4>
              <p class="card-text">
                NT{{ item.price | currency }}
                <span class="text-muted ml-1"
                  ><del>NT{{ item.origin_price | currency }}</del></span
                >
              </p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!favProducts.length">
        <p class="text-center my-5">
          目前沒有收藏的商品喔，
          <router-link
            class="text-decoration-none text-success font-weight-bold"
            to="/products"
          >
            去產品頁逛逛吧!
          </router-link>
        </p>
        <ProductInfo></ProductInfo>
      </div>
    </div>
  </div>
</template>

<script>
import ProductInfo from '@/components/frontend/ProductInfo.vue';

export default {
  name: 'Favorite',
  components: {
    ProductInfo
  },
  data() {
    return {
      favProducts: [],
      favProductsId: [],
      status: {
        isLoading: false
      }
    };
  },
  created() {
    this.favProducts = JSON.parse(localStorage.getItem('favList')) || [];
    this.favProductsId = JSON.parse(localStorage.getItem('favId')) || [];
  },
  methods: {
    delfav(item) {
      this.favProducts.forEach((i, index) => {
        if (i.id === item.id) {
          this.favProducts.splice(index, 1);
          localStorage.setItem('favList', JSON.stringify(this.favProducts));
        }
      });
      this.favProductsId.forEach((i, index) => {
        if (i === item.id) {
          this.favProductsId.splice(index, 1);
          localStorage.setItem('favId', JSON.stringify(this.favProductsId));
        }
      });
      this.$bus.$emit('message:push', `${item.title}已取消收藏`, 'danger');
    },
    goPage(item) {
      this.$router.push(`/product/${item.title}/${item.id}`);
    },
    addToCart(item, quantity = 1) {
      this.status.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping`;
      const cart = {
        product: item.id,
        quantity
      };
      this.$http
        .post(url, cart)
        .then((res) => {
          // console.log(res, '加入購物車有成功嗎', res.data.data.product.title);
          this.$bus.$emit(
            'message:push',
            res.data.data.product.title + '成功加入購物車',
            'success'
          );
          this.$bus.$emit('get-cart'); // 把加入購物車成功回傳的資料送去 navbar 更新購物車數量

          this.status.isLoading = false;
          this.delfav(item);
        })
        .catch((error) => {
          this.status.isLoading = false;
          this.$bus.$emit(
            'message:push',
            error.response.data.errors[0],
            'danger'
          );
        });
    }
  }
};
</script>
