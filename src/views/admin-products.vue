<template>
<div>
  <div class="vld-parent">
      <Loading :active.sync="isLoading" ></Loading>
  </div>
  <div class="table-responsive mt-4">
    <div class="text-right">
      <button class="btn btn-primary" @click="openModal">ADD</button>
    </div>
    <table class="table table-striped table-sm mt-1">
      <thead>
        <tr>
          <th class="d-none d-md-table-cell">PICTURE</th>
          <th>TITLE</th>
          <th class="price">PRICE</th>
          <th class="d-none d-md-table-cell">CATEGORY</th>
          <th>ENABLE</th>
          <th class="edit text-center">EDIT</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in products"  :key="item.id">
          <td class="d-none d-md-table-cell">
            <div class="img" :style="{'background-image': 'url(' + item.imageUrl + ')'}"></div>
          </td>
          <td>{{ item.title }}</td>
          <td>{{ item.price | currencyFilter }}</td>
          <td class="d-none d-md-table-cell">{{ item.category }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">enable</span>
            <span v-else class="text-danger">unable</span>
          </td>
          <td class="d-flex flex-column d-md-table-cell text-right">
            <button class="btn btn-outline-primary my-1" @click="editProduct(item)">edit</button>
            <button class="btn btn-outline-danger my-1" @click="openDelModal(item)">delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination
    class="mb-5"
    :pagination="pagination" @getInform="getProducts"/>
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input type="text" class="form-control" id="image"
                  v-model="tempProduct.imageUrl"
                  placeholder="請輸入圖片連結">
                </div>
                <div class="form-group">
                  <label for="customFile">或 上傳圖片
                      <i class="fas fa-circle-notch fa-spin" v-if="status.fileUpLoading"></i>
                  </label>
                  <input type="file" id="customFile" class="form-control" ref="files"
                  @change="uploadFile">
                </div>
                <img class="img-fluid" alt=""
                :src="tempProduct.imageUrl">
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title"
                  v-model="tempProduct.title"
                  placeholder="請輸入標題">
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input type="text" class="form-control" id="category"
                    v-model="tempProduct.category"
                    placeholder="請輸入分類">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input type="number" class="form-control" id="price"
                    v-model="tempProduct.price"
                    placeholder="請輸入售價">
                  </div>
                </div>
                <hr>
                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea class="form-control" id="description"
                  v-model="tempProduct.description"
                  placeholder="請輸入產品描述" rows="5"></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="is_enabled"
                    :true-value="1" :false-value="0"
                    v-model="tempProduct.is_enabled">
                    <label class="form-check-label" for="is_enabled">
                    是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal" @click="cancelModal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
            <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal" @click="cancelModal">取消</button>
            <button type="button" class="btn btn-danger" @click="updateProduct">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import Pagination from '@/components/pagination'
import $ from 'jquery'

export default {
  data () {
    return {
      ajaxOpen: true,
      products: [],
      tempProduct: {},
      isLoading: false,
      updateLoading: false,
      status: {
        fileUpLoading: false
      },
      pagination: {}
    }
  },
  methods: {
    getProducts (page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`
      vm.isLoading = true
      this.$http.get(api).then(response => {
        vm.products = response.data.products
        vm.pagination = response.data.pagination
        vm.isLoading = false
      })
    },
    updateProduct () {
      if (this.ajaxOpen) {
        this.ajaxOpen = false
        const vm = this
        let httpMethod = 'post'
        let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`
        let method = '新增'
        let tempProduct = vm.tempProduct
        if (tempProduct.new) {
          httpMethod = 'put'
          api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${tempProduct.id}`
          method = '修改'
          delete tempProduct.new
        } else if (tempProduct.del) {
          httpMethod = 'delete'
          api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${tempProduct.id}`
          method = '刪除'
          delete tempProduct.del
        }
        this.$http[httpMethod](api, { data: tempProduct }).then(response => {
          vm.ajaxOpen = true
          if (response.data.success) {
            $('#productModal').modal('hide')
            $('#delProductModal').modal('hide')
            this.$bus.$emit('message:push', `${method}成功`, 'success')
            vm.getProducts()
          } else {
            $('#productModal').modal('hide')
            $('#delProductModal').modal('hide')
            this.$bus.$emit('message:push', response.data.message, 'danger')
          }
        })
      }
    },
    openModal () {
      this.tempProduct = {}
      $('#productModal').modal('show')
    },
    openDelModal (item) {
      this.tempProduct = Object.assign({}, item)
      this.tempProduct.del = true
      $('#delProductModal').modal('show')
    },
    editProduct (item) {
      this.openModal()
      this.tempProduct = Object.assign({}, item)
      this.tempProduct.new = true
    },
    cancelModal () {
      $('#productModal').modal('hide')
      $('#delProductModal').modal('hide')
    },
    uploadFile () {
      const uploadedFile = this.$refs.files.files[0]
      const vm = this
      const formData = new FormData()
      formData.append('file-to-upload', uploadedFile)
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`
      vm.status.fileUpLoading = true
      this.$http.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        if (response.data.success) {
          vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl)
        } else {
          this.$bus.$emit('message:push', response.data.message.code, 'danger')
        }
        vm.status.fileUpLoading = false
      })
    }
  },
  created () {
    this.getProducts()
  },
  components: {
    Pagination
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/all';

td{
  vertical-align: middle !important;
}
.btn{
  @include admin-btn;
}
.img {
  height: 60px;
  width: 60px;
  background-size: cover;
  background-position: center center;
}
.price {
  min-width: 70px
}
@media(min-width: 768px) {
  .edit {
    width: 150px;
  }
}

</style>
