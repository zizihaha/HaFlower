<template>
  <div>
    <loading loader="dots" :active.sync="status.isLoading"></loading>
    <div class="container" style="margin-top: 80px">
      <div class="row align-items-center">
        <div class="col-md-7">
          <img
            :src="product.imageUrl"
            class="d-block w-100"
            :alt="product.title"
          />
        </div>
        <div class="col-md-5">
          <!-- 麵包屑 -->
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb bg-white px-0 mb-0">
              <li class="breadcrumb-item">
                <router-link class="text-muted" to="/">
                  首頁
                </router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link class="text-muted" to="/products">
                  產品列表
                </router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                {{ product.title }}
              </li>
            </ol>
          </nav>
          <h2 class="font-weight-bold h1 mb-1">{{ product.title }}</h2>
          <p class="mb-0 text-muted text-right">
            <del v-if="product.origin_price"
              >NT{{ product.origin_price | currency }}</del
            >
          </p>

          <p v-if="product.price" class="h4 font-weight-bold text-right">
            NT{{ product.price | currency }}
          </p>
          <div class="d-flex align-items-center">
            <!-- 增加產品數量 -->
            <div class="input-group my-3 mr-2 bg-light rounded">
              <div class="input-group-prepend">
                <!-- 減少 -->
                <button
                  class="btn btn-outline-dark border-0 py-2"
                  type="button"
                  id="button-addon1"
                  :disabled="quantity < 2"
                  @click="quantity--"
                >
                  <i class="fas fa-minus"></i>
                </button>
              </div>
              <input
                type="number"
                min="1"
                class="form-control border-0 text-center my-auto shadow-none bg-light"
                placeholder=""
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
                v-model="quantity"
              />
              <div class="input-group-append">
                <!-- 增加 -->
                <button
                  class="btn btn-outline-dark border-0 py-2"
                  type="button"
                  id="button-addon2"
                  @click="quantity++"
                >
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>

            <button
              type="button"
              class="btn btn-dark btn-block py-2"
              @click="updateCart(product, quantity)"
            >
              加入購物車
            </button>
          </div>
        </div>
      </div>
      <!-- 產品介紹 -->
      <div class="row my-5">
        <div class="col-md-7">
          <p class="font-weight-bold">
            產品說明 :
          </p>
          <p>
            {{ product.content }}
          </p>
        </div>
        <!-- <div class="col-md-3">
          <p class="text-muted">
            {{ product.description }}
          </p>
        </div> -->
      </div>
      <h3 class="font-weight-bold">相關產品</h3>
      <div class="swiper-container mt-4 mb-5">
        <Swiper
          :relatedProducts="relatedProducts"
          @goProduct="getProduct()"
        ></Swiper>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from '@/components/frontend/Swiper.vue';

export default {
  name: 'Product',
  components: {
    Swiper
  },
  data() {
    return {
      relatedProducts: [],
      product: {
        imageUrl: []
      },
      status: {
        isLoading: false
      },
      quantity: 1
    };
  },
  created() {
    this.getProduct();
  },
  methods: {
    getProduct() {
      this.status.isLoading = true;
      // 讀取 params 參數 id
      const { id } = this.$route.params;

      this.$http
        .get(
          `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/product/${id}`
        )
        .then((res) => {
          // console.log('取得單一產品', res);
          this.product = res.data.data;
          this.getRelatedProducts();
          this.status.isLoading = false;
        })
        .catch((error) => {
          this.status.isLoading = false;
          console.log(error.response);
        });
    },
    // 取得相關產品傳到子組件
    getRelatedProducts() {
      this.status.isLoading = true;
      this.$http
        .get(
          `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/products`
        )
        .then((res) => {
          this.relatedProducts = res.data.data.filter(
            (item) =>
              item.category === this.product.category &&
              item.id !== this.product.id
          );
          this.status.isLoading = false;
        });
    },
    updateCart(item, quantity) {
      this.$bus.$emit('add-cart', item, quantity);
      console.log(item, quantity, '加入購物車');
    }
  }
};
</script>
