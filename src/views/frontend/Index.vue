<template>
  <div>
    <div
      class="banner mb-7"
      style="height:100vh; background: url(https://images.unsplash.com/photo-1512331283953-19967202267a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80) fixed no-repeat center / cover; "
    >
      <div
        class="h-100 d-flex flex-column"
        style="background-color: rgba(255,255,255,.7);"
      >
        <div class="d-flex justify-content-center my-auto">
          <div class="col-md-4 text-center">
            <h2>2020 Merry Christmas</h2>
            <p class="text-muted mb-0">
              送另一半專屬的許願星星，聖誕花束預購中
            </p>
            <router-link to="/products">
              <button class="btn btn-primary rounded-0 mt-5">
                more
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <ProductInfo></ProductInfo>

    <div class="mt-md-4 mb-5 text-dark" style="background-color: #DBDFD7;">
      <div class="container">
        <div
          id="carouselExampleControls"
          class="carousel slide"
          data-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="row justify-content-center py-7">
                <div class="col-md-6 text-center">
                  <h3>冬季限定! 迷霧蕾絲捧花</h3>
                  <p class="my-5">
                    “蕾絲捧花真的超美的，顏色可以客製化跟我禮服超搭”
                  </p>
                  <p><small>— 台中 Lillian —</small></p>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="row justify-content-center py-7">
                <div class="col-md-6 text-center">
                  <h3>粉嫩色系鮮花手腕花</h3>
                  <p class="my-5">
                    “手腕花好加分，超像國外參加舞會的感覺，伴娘們超愛”
                  </p>
                  <p><small>— 台北 kiki —</small></p>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="row justify-content-center py-7">
                <div class="col-md-6 text-center">
                  <h3>小驚喜花花世界捧花</h3>
                  <p class="my-5">
                    “沒抽到捧花的朋友都一直問到底在哪裡買的捧花，超喜歡”
                  </p>
                  <p><small>— 高雄 coco —</small></p>
                </div>
              </div>
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div>

    <!-- 店貓介紹 -->
    <div class="container my-4">
      <div class="row">
        <div class="col-md-6">
          <img v-lazy="img[0]" alt="" class="img-fluid" />
        </div>
        <div class="col-md-4 m-auto text-center">
          <h4 class="mt-4">店長-哈哈</h4>
          <p class="text-muted">
            最喜歡綠色植物，似乎有教師夢，花藝課的時候總會站在講桌上呢。
          </p>
        </div>
      </div>
      <div class="row flex-row-reverse justify-content-between mt-4">
        <div class="col-md-6">
          <img v-lazy="img[1]" alt="" class="img-fluid" />
        </div>
        <div class="col-md-4 m-auto text-center">
          <h4 class="mt-4">副店長-小機靈</h4>
          <p class="text-muted">
            很會幫忙挑花，不知道該買什麼的時候，請她幫你挑就對了。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductInfo from '@/components/frontend/ProductInfo.vue';

export default {
  name: 'Index',
  components: {
    ProductInfo
  },

  data() {
    return {
      img: [
        'https://images.unsplash.com/photo-1585861155989-bde6acb5ad17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1585486064194-dcd935337198?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80'
      ]
    };
  }
};
</script>
