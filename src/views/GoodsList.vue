<template>
    <div>
      <nav-header></nav-header>
      <nav-bread>
        <span>Goods</span>
      </nav-bread>
      <nav-adments></nav-adments>
        <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">筛  选:</span>
            <a href="javascript:void(0)" class="default cur">默  认</a>
            <a href="javascript:void(0)" class="price" v-bind:class="{'sort-up':sortFlag}" @click="sortGoods()">价  格 <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop" @click.stop="showFilterPop">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
              <dl class="filter-price">
                <dt>分类选择:</dt>
                <dd><a href="javascript:void(0)" @click="setPriceFilter('all')" v-bind:class="{'cur':priceChecked=='all'}">所有商品</a></dd>
                <dd v-for="(item,index) in priceFilter">
                  <a href="javascript:void(0)" @click="setPriceFilter(index)" v-bind:class="{'cur':priceChecked==index}">{{item.startPrice}} - {{item.endPrice}}</a>
                </dd>
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="item in goodsList" >
                    <div class="pic">
                      <a href="#"><img :src="'static/images/'+item.productImage" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.salePrice | currency('¥')}}</div>
                      <div class="btn-area" >
                        <a href="javascript:;" class="btn btn--m" @click="addCart(item)">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="view-more-normal"
                   v-infinite-scroll="loadMore"
                   infinite-scroll-disabled="busy"
                   infinite-scroll-distance="20">
                <img src="./../assets/loading-spinning-bubbles.svg" v-show="loading">
              </div>
            </div>
          </div>
        </div>
      </div>
      <modal v-bind:mdShow="mdShow" v-on:close="closeModal">
          <p slot="message">
             请先登录,否则无法加入到购物车中!
          </p>
          <div slot="btnGroup">
              <a class="btn btn--m" href="javascript:;" @click="mdShow = false">关闭</a>
          </div>
      </modal>
      <modal v-bind:mdShow="mdShowCart" v-on:close="closeModal">
        <p slot="message">
          <svg class="icon-status-ok">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
          </svg>
          <span>加入购物车成功!</span>
        </p>
        <div slot="btnGroup">
          <a class="btn btn--m" href="javascript:;" @click="mdShowCart = false">继续购物</a>
          <router-link class="btn btn--m btn--red" href="javascript:;" to="/cart">查看购物车</router-link>
        </div>
      </modal>
      <div class="md-overlay" v-show="overLayFlag" @click.stop="closePop"></div>
      <nav-footer></nav-footer>
    </div>
</template>
<script>
    import NavHeader from './../components/NavHeader'
    import NavFooter from './../components/NavFooter'
    import NavBread from './../components/NavBread'
    import NavAdments from './../components/NavAdments'
    import Modal from './../components/Modal'
    import axios from 'axios'
    export default{
        data(){
            return {
                goodsList:[],
                cartList:[],
                sortFlag:true,
                page:1,
                pageSize:8,
                busy:true,
                loading:false,
                logining:global.logining,
                mdShow:false,
                mdShowCart:false,
                productId:' ',
                productImage:' ',
                productName:' ',
                salePrice:' ',
                priceFilter:[
                  {
                      startPrice:'热卖',
                      endPrice:'最新'
                  },
                  {
                    startPrice:'数码',
                    endPrice:'科技'
                  },
                  {
                    startPrice:'男装',
                    endPrice:'女装'
                  },
                  {
                    startPrice:'户外',
                    endPrice:'运动' 
                  },
                  {
                    startPrice:'办公',
                    endPrice:'学习'
                  },
                  {
                    startPrice:'美妆',
                    endPrice:'洗护'
                  },
                  {
                    startPrice:'食品',
                    endPrice:'生活'
                  }
                ],
                priceChecked:'all',
                filterBy:false,
                overLayFlag:false
            }
        },
        mounted(){
            this.getGoodsList();
        },
        components:{
          NavHeader,
          NavFooter,
          NavAdments,
          NavBread,
          Modal
        },
        methods:{

            getGoodsList(flag){
              var param = {
                  page:this.page,
                  pageSize:this.pageSize,
                  sort:this.sortFlag?1:-1,
                  priceLevel:this.priceChecked
              };
              this.loading = true;
              axios.get("/goods/list",{
                params:param
              }).then((response)=>{
                var res = response.data;
                this.loading = false;
                if(res.status=="0"){
                  if(flag){
                      this.goodsList = this.goodsList.concat(res.result.list);
                      if(res.result.count==0){
                          this.busy = true;
                      }else{
                          this.busy = false;
                      }
                  }else{
                      this.goodsList = res.result.list;
                      this.busy = false;
                  }
                }else{
                  this.goodsList = [];
                }
              });
            },
            sortGoods(){
                this.sortFlag = !this.sortFlag;
                this.page = 1;
                this.getGoodsList();
            },
            setPriceFilter(index){
              this.priceChecked = index;
              this.page = 1;
              this.getGoodsList();
            },
            loadMore(){
                this.busy = true;
                setTimeout(() => {
                  this.page++;
                  this.getGoodsList(true);
                }, 500);
            },
            addCart(item){
                var param = {
                      productId:item.productId,
                      productImage:item.productImage,
                      productName:item.productName,
                      salePrice:item.salePrice,
                    };
                this.cartList.push(param);
                console.log(this.cartList);
                axios.post("/goods/addCart",{
                  productId:item.productId
                }).then((res)=>{
                    var res = res.data;
                    if(res.status){
                        this.mdShowCart = true;
                        this.$store.commit("updateCartCount",1);
                    }else{
                        this.mdShow = true;
                    }
                });
            },
            closeModal(){
              this.mdShow = false;
              this.mdShowCart = false;
            },
            showFilterPop(){
              this.filterBy=true;
              this.overLayFlag=true;
            },
            closePop(){ 
              this.filterBy=false;
              this.overLayFlag=false;
              this.mdShowCart = false;
            }
        }
    }
</script>
