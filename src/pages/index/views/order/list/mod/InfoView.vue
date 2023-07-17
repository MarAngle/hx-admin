<style scoped lang="less">
.order-info-view{
  overflow: auto;
  .wash-list{
    .wash-list-title{
      margin-top: 20px;
      margin-bottom: 20px;
      color: rgba(0, 0, 0, 0.85);
      font-weight: bold;
      font-size: 16px;
      line-height: 1.5;
    }
    .wash-list-content{
      padding: 16px 24px;
      border: 1px #e8e8e8 solid;
      border-radius: 4px;
    }
  }
}
</style>
<template>
  <div class="order-info-view" v-if="data" :style="{ maxHeight: maxHeight + 'px' }" >
    <a-descriptions :column="2" title="套餐详情" bordered>
      <a-descriptions-item label="名称">{{ data.commodity_name }}</a-descriptions-item>
      <a-descriptions-item label="商品编号">{{ data.sku_id }}</a-descriptions-item>
      <a-descriptions-item label="原价">{{ data.original_price }}</a-descriptions-item>
      <a-descriptions-item label="售价">{{ data.selling_price }}</a-descriptions-item>
      <a-descriptions-item label="销量">{{ data.sold_quantity }}</a-descriptions-item>
      <a-descriptions-item label="好评度">{{ data.evaluate }}</a-descriptions-item>
      <a-descriptions-item label="专区">{{ data.commodity_zone_id.label }}</a-descriptions-item>
      <a-descriptions-item label="有效期">{{ data.effective_day }}</a-descriptions-item>
      <a-descriptions-item label="资源位">{{ data.commodity_resourceniche_id.label }}</a-descriptions-item>
      <a-descriptions-item label="销售语">{{ data.commodity_marketing }}</a-descriptions-item>
      <a-descriptions-item label="主图">
        <PicView
          :list="data.main_pic"
          :itemStyle="{
            width: '50px',
            maxHeight: '50px',
            margin: '0 auto',
            overflow: 'hidden'
          }"
        />
      </a-descriptions-item>
      <a-descriptions-item label="详情">
        <PicView
          :list="data.detail_pic"
          :itemStyle="{
            width: '50px',
            maxHeight: '50px',
            margin: '0 auto',
            overflow: 'hidden'
          }"
        />
      </a-descriptions-item>
    </a-descriptions>
    <a-descriptions :column="2" title="订单状态" bordered  style='margin-top: 20px;'>
      <a-descriptions-item label="用户昵称">{{ data.nickname }}</a-descriptions-item>
      <a-descriptions-item label="手机号">{{ data.mobile }}</a-descriptions-item>
      <a-descriptions-item label="pay_no">{{ data.pay_no }}</a-descriptions-item>
      <a-descriptions-item label="pay_id">{{ data.pay_id }}</a-descriptions-item>
      <a-descriptions-item label="order_id">{{ data.order_id }}</a-descriptions-item>
      <a-descriptions-item label="支付金额">{{ data.pay_amount }}</a-descriptions-item>
      <a-descriptions-item label="订单状态">{{ data.status.label }}</a-descriptions-item>
      <a-descriptions-item label="使用状态">{{ data.use_status.label }}</a-descriptions-item>
      <a-descriptions-item label="预约时间">{{ data.reservation_timel }}</a-descriptions-item>
      <a-descriptions-item label="套餐过期时间">{{ data.expires_time }}</a-descriptions-item>
      <a-descriptions-item label="使用时间">{{ data.order_time }}</a-descriptions-item>
      <a-descriptions-item label="支付时间">{{ data.pay_time }}</a-descriptions-item>
      <a-descriptions-item label="创建时间">{{ data.pay_create_time }}</a-descriptions-item>
    </a-descriptions>
    <div class="wash-list" v-if="data.wash && data.wash.length > 0" >
      <div class="wash-list-title">履约记录</div>
      <div class="wash-list-content">
        <a-timeline>
          <a-timeline-item v-for="(washItem, index) in data.wash" :key="index" >
            <span>{{ washItem.process }}:</span>
            <span style="margin-left: 10px;">{{ washItem.create_time + ':' + washItem.process_desc }}</span>
          </a-timeline-item>
        </a-timeline>
      </div>
    </div>
  </div>
</template>

<script>
import PicViewVue from '@/config/components/mod/PicView.vue'

export default {
  name: `InfoView`,
  components: {
    PicView: PicViewVue
  },
  data () {
    return {
      data: null
    }
  },
  props: {
    maindata: {
      type: Object,
      required: true
    },
    maxHeight: {
      type: Number,
      required: true
    }
  },
  methods: {
    show(data) {
      this.data = data
    }
  }
}
</script>
