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
        background: url(https://images.unsplash.com/photo-1527903789995-dc8ad2ad6de0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1007&q=80) fixed no-repeat center / cover;"
      ></div>
    </div>

    <div class="container mt-md-5 mt-3">
      <div class="row">
        <!-- 產品分類 -->
        <div class="col-md-4">
          <div
            class="cursor-pointer accordion border border-bottom-0 border-top-0 border-left-0 border-right-0 mb-3"
            id="accordionExample"
          >
            <div class="card border-0">
              <div
                class="card-header px-0 py-4 bg-white border border-bottom-0 border-top-0 border-left-0 border-right-0"
                id="headingTwo"
                data-toggle="collapse"
                data-target="#collapseTwo"
              >
                <div
                  class="d-flex justify-content-between align-items-center pr-1"
                >
                  <h5 class="mb-0">
                    商品分類
                  </h5>
                  <i class="fas fa-chevron-down"></i>
                </div>
              </div>
              <div
                id="collapseTwo"
                class="collapse show"
                aria-labelledby="headingTwo"
                data-parent="#accordionExample"
              >
                <div class="card-body py-0">
                  <ul class="list-unstyled">
                    <li
                      v-for="item in category"
                      :key="item"
                      @click.prevent="productType(item)"
                    >
                      <a
                        href="#"
                        class="py-2 d-block"
                        :class="{
                          'text-danger font-weight-bold': item === categoryType
                        }"
                        >{{ item }}</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 產品列表 -->
        <div class="col-md-8">
          <div class="row">
            <div class="col-md-6" v-for="item in categoryFilter" :key="item.id">
              <div class="card border-0 mb-4">
                <router-link :to="`/product/${item.id}`" class="product-img">
                  <img
                    v-lazy="item.imageUrl[0]"
                    class="card-img-top rounded-0"
                    :alt="item.title"
                  />
                  <p class="position-absolute product-check mb-0">
                    CLICK TO VIEW
                  </p>
                </router-link>
                <a href="#" class="text-dark" @click.prevent="editfav(item)">
                  <!-- 未加入收藏 icon -->
                  <i
                    class="far fa-heart position-absolute text-white"
                    style="right: 16px; top: 16px"
                    v-if="favProductsId.indexOf(item.id) === -1"
                  ></i>
                  <!-- 已加入收藏 icon -->
                  <i
                    class="fas fa-heart position-absolute text-white"
                    style="right: 16px; top: 16px"
                    v-else
                  ></i>
                </a>

                <a href="#" class="text-dark" @click.prevent="updateCart(item)">
                  <!-- 未加入購物車 icon -->
                  <i
                    class="fas fa-cart-plus position-absolute text-white"
                    style="right: 50px; top: 16px"
                  ></i>
                  <!-- 已加入購物車 icon -->
                  <!-- <i
                    class="fas fa-clipboard-check position-absolute text-white"
                    style="right: 50px; top: 16px"
                  ></i> -->
                </a>

                <div class="card-body p-0 my-3">
                  <h4 class="mb-0">
                    <router-link :to="`/product/${item.id}`">
                      {{ item.title }}
                    </router-link>
                  </h4>
                  <p class="card-text text-danger font-weight-bold">
                    NT{{ item.price | currency }}
                    <span class="text-muted ml-1"
                      ><del>NT{{ item.origin_price | currency }}</del></span
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- <pagination :pages="pagination" @emit-pages="getProducts" /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Pagination from '@/components/Pagination.vue';

export default {
  name: 'Product',
  components: {
    // Pagination
  },
  data() {
    return {
      products: [],
      pagination: {},
      status: {
        isLoading: false
      },
      categoryType: '全部產品',
      category: ['全部產品', '新娘捧花', '胸花', '手腕花', '婚禮佈置'],
      favProducts: JSON.parse(localStorage.getItem('favList')) || [],
      favProductsId: JSON.parse(localStorage.getItem('favId')) || []
    };
  },
  created() {
    this.status.isLoading = true;
    this.getProducts();
    this.categoryType = this.$route.params.categoryType || '全部產品';
  },
  computed: {
    categoryFilter() {
      if (this.categoryType === '全部產品') {
        return this.products;
      } else {
        return this.products.filter((item) => {
          return item.category === this.categoryType; // 把一致的 type 保留下來
        });
      }
    }
  },
  methods: {
    productType(item) {
      this.categoryType = item;
    },
    getProducts(page = 1) {
      this.status.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/products?page=${page}&paged=60`;

      this.$http
        .get(api)
        .then((res) => {
          this.products = res.data.data;
          this.pagination = res.data.meta.pagination;
          this.status.isLoading = false;
        })
        .catch((error) => {
          this.status.isLoading = false;
          console.log(error.response);
        });
    },
    updateCart(item) {
      this.$bus.$emit('add-cart', item);
      console.log(item, '產品列表加入購物車');
    },
    editfav(item) {
      const favProducts = this.favProducts;
      const favProductsId = this.favProductsId.indexOf(item.id);

      if (favProductsId === -1) {
        // 如果不存在於 localstorage 內，就加入 localstorage 內
        this.favProducts.push(item);
        this.favProductsId.push(item.id);
        this.$bus.$emit(
          'message:push',
          `${item.title}已加入收藏清單`,
          'success'
        );
      } else {
        this.favProducts.splice(favProducts, 1); // 如果不存在於 localstorage 內，就刪除
        this.favProductsId.splice(favProductsId, 1);
        this.$bus.$emit('message:push', `${item.title}已取消收藏`, 'danger');
      }
      localStorage.setItem('favList', JSON.stringify(this.favProducts));
      localStorage.setItem('favId', JSON.stringify(this.favProductsId));
    }
  }
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.product-check {
  opacity: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(101, 101, 101, 0.35);
  color: #fff;
  transition: opacity 0.4s;
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-img {
  position: relative;
}

.product-img:hover .product-check {
  opacity: 1;
}
</style>
