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
        background: url(https://images.unsplash.com/photo-1527903624482-4186b06014b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1043&q=80) fixed no-repeat center / cover;"
      ></div>
    </div>
    <div class="container">
      <div class="pt-5">
        <div v-if="carts.length" class="mb-4">
          <h3 class="my-4">購物清單</h3>
          <div class="row">
            <div class="col-md-8">
              <table class="table">
                <thead>
                  <tr class="productTr">
                    <th scope="col" class="border-0 pl-0">
                      產品名稱
                    </th>
                    <th scope="col" class="border-0">數量</th>
                    <th scope="col" class="border-0">金額</th>
                    <th scope="col" class="border-0"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="border-bottom border-top"
                    v-for="item in carts"
                    :key="item.product.id"
                  >
                    <th
                      scope="row"
                      class="border-0 px-0 font-weight-normal py-4"
                    >
                      <router-link :to="`/product/${item.product.id}`">
                        <img
                          class="productImg"
                          :src="item.product.imageUrl"
                          :alt="item.product.title"
                          style="width: 72px; height: 72px; object-fit: cover;"
                        />
                        <p
                          class="productText mb-0 font-weight-bold d-inline-block"
                        >
                          {{ item.product.title }}
                        </p>
                      </router-link>
                    </th>
                    <td class="border-0 align-middle" style="max-width: 160px;">
                      <div class="input-group quantity">
                        <div class="input-group-prepend">
                          <button
                            class="btn btn-outline-dark border-0 py-1"
                            type="button"
                            id="button-addon1"
                            :disabled="item.quantity < 2"
                            @click="
                              item.quantity--,
                                updateQuantity(item.product.id, item.quantity)
                            "
                          >
                            <i class="fas fa-minus"></i>
                          </button>
                        </div>
                        <input
                          type="number"
                          min="1"
                          class="form-control border-0
                      text-center my-auto shadow-none"
                          placeholder=""
                          aria-label="Example text with button addon"
                          aria-describedby="button-addon1"
                          v-model.number="item.quantity"
                          @input="
                            updateQuantity(
                              item.product.id,
                              item.quantity,
                              item.product
                            )
                          "
                        />
                        <!-- :value="item.quantity" -->
                        <!-- @change="updateQuantity(item.product.id, item.quantity)" -->
                        <!-- @keyup.enter="
                          updateQuantity(item.product.id, item.quantity)
                        " -->
                        <div class="input-group-append">
                          <button
                            class="btn btn-outline-dark border-0 py-1"
                            type="button"
                            id="button-addon2"
                            @click="
                              item.quantity++,
                                updateQuantity(item.product.id, item.quantity)
                            "
                          >
                            <i class="fas fa-plus"></i>
                          </button>
                        </div>
                      </div>
                    </td>
                    <td class="border-0 align-middle">
                      <p class="mb-0 ml-auto">
                        {{ (item.product.price * item.quantity) | currency }}
                      </p>
                    </td>
                    <td class="border-0 align-middle">
                      <a
                        href="#"
                        @click.prevent="removeCartItem(item.product.id)"
                      >
                        <i class="fas fa-times"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- <div class="input-group w-50 border-bottom">
                <input
                  type="text"
                  class="form-control rounded-0 border-bottom-0 border-top-0 border-left-0 border-right-0 shadow-none mb-2"
                  placeholder="Coupon Code 折扣碼"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                  v-model="coupon_code"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-outline-dark border-bottom-0 border-top-0 border-left-0 border-right-0 rounded-0"
                    type="button"
                    id="button-addon2"
                    :disabled="!coupon_code"
                    @click="addCouponCode()"
                  >
                    <i class="fas fa-paper-plane"> 套用折扣碼</i>
                  </button>
                </div>
              </div> -->
            </div>
            <div class="col-md-4">
              <div class="border p-4">
                <h4 class="font-weight-bold mb-4">訂單金額</h4>
                <table class="table text-muted border-bottom">
                  <tbody>
                    <!-- <tr>
                      <th
                        scope="row"
                        class="border-0 px-0 py-4 font-weight-normal"
                      >
                        總計金額
                      </th>
                      <td class="text-right border-0 px-0 py-4">
                        {{ totalAmount | currency }}
                      </td>
                    </tr> -->
                    <!-- <tr>
                      <th
                        scope="row"
                        class="border-0 px-0 pt-0 pb-4 font-weight-normal"
                      >
                        優惠折抵
                      </th>
                      <td class="text-right border-0 px-0 pt-0 pb-4">
                        - NT{{ totalAmount | currency }}
                      </td>
                    </tr> -->
                  </tbody>
                </table>
                <div class="orderText mt-4">
                  <p class="mb-0 h4 font-weight-bold">商品總金額</p>
                  <p class="mb-0 h4 font-weight-bold">
                    {{ totalAmount | currency }}
                  </p>
                </div>
                <router-link class="btn btn-primary btn-block mt-4" to="/order">
                  填寫訂單資料 <i class="fas fa-chevron-right ml-2"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <p v-else-if="noProduct" class="text-center">
          購物車內沒有商品喔，
          <router-link
            class="text-decoration-none text-success font-weight-bold"
            to="/products"
          >
            去產品頁逛逛吧!
          </router-link>
        </p>

        <!-- 購物車沒有產品顯示這塊 -->
        <div class="row">
          <ProductInfo></ProductInfo>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductInfo from '@/components/frontend/ProductInfo.vue';

export default {
  name: 'Cart',
  components: {
    ProductInfo
  },
  data() {
    return {
      relatedProducts: [],
      carts: [],
      totalAmount: 0,
      coupon_code: '',
      error: '',
      tempProduct: {
        imageUrl: [] // 刪除的暫存資料用必須預先定義 imageUrl 並且是一個陣列，否則新增或更新會出現錯誤
      },
      status: {
        isLoading: false
      },
      noProduct: false
    };
  },
  methods: {
    getCart() {
      this.status.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping`;

      this.$http
        .get(url)
        .then((res) => {
          this.status.isLoading = false;
          this.carts = res.data.data;
          this.cartTotal();
          if (this.carts.length == 0) {
            this.noProduct = true;
          }
        })
        .catch((error) => {
          this.status.isLoading = false;
          console.log(error.response);
        });
    },
    removeCartItem(id) {
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping/${id}`;
      this.$http.delete(url).then((res) => {
        this.getCart();
        this.$bus.$emit('message:push', res.data.message, 'success');
        this.$bus.$emit('get-cart');
      });
    },
    // 購物車價錢
    cartTotal() {
      this.totalAmount = 0;
      this.carts.forEach((item) => {
        this.totalAmount += item.product.price * item.quantity;
      });
    },
    // 增減購物車產品數量
    updateQuantity(id, quantity) {
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping`;
      const cart = {
        product: id,
        quantity
      };
      if (quantity == 0) {
        this.removeCartItem(id);
      }
      this.$http
        .patch(url, cart)
        .then(() => {
          // console.log(
          //   res.data.data.product.price,
          //   '增減購物車產品數量',
          //   res.data.data.quantity
          // );
          this.getCart();
        })
        .catch((error) => {
          this.status.isLoading = false;
          console.log(error.response);
        });
    }
  },
  created() {
    // this.removeCartItem();
    this.getCart();
  }
};
</script>
