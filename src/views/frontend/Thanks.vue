<template>
  <div>
    <div class="position-relative d-flex" style="margin-top: 80px">
      <div class="container d-flex flex-column" style="min-height: 100vh;">
        <div class="row my-auto pb-7">
          <div class="col-md-4 d-flex flex-column">
            <div class="my-auto">
              <h2>購物完成</h2>
              <p>
                我們收到您的訂單了，感謝您的購買。
              </p>
              <router-link class="btn btn-primary mt-4 px-5" to="/">
                回到首頁
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div
        class="w-md-50 w-100 position-absolute opacity-1"
        style="z-index: -1; min-height: 100vh; right: 0; background: url(https://images.unsplash.com/photo-1575558418409-8620c7a691a6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=633&q=80) center top / cover"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Thanks',
  data() {
    return {};
  }
};
</script>
