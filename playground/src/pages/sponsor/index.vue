<script setup lang="ts">
import type { TabsProps } from 'antdv-next'
import { AlipayCircleOutlined, GithubOutlined, TeamOutlined, UserOutlined, WechatOutlined } from '@antdv-next/icons'
import { h, reactive, shallowRef } from 'vue'

// 当前 tab
const activeTab = shallowRef('org')

// Tabs items 配置
const tabItems: TabsProps['items'] = [
  {
    key: 'org',
    label: '组织赞助',
    icon: () => h(TeamOutlined),
  },
  {
    key: 'personal',
    label: '个人赞助',
    icon: () => h(UserOutlined),
  },
]

// 团队成员信息
const teamMembers = [
  {
    github: 'aibayanyu20',
    name: 'aibayanyu20',
    avatar: 'https://avatars.githubusercontent.com/u/45655660?v=4',
  },
  {
    github: 'cc-hearts',
    name: 'cc-hearts',
    avatar: 'https://avatars.githubusercontent.com/u/71313168?v=4',
  },
  {
    github: 'selicens',
    name: 'selicens',
    avatar: 'https://avatars.githubusercontent.com/u/69418751?v=4',
  },
  {
    github: 'ffgenius',
    name: 'ffgenius',
    avatar: 'https://avatars.githubusercontent.com/u/106022674?v=4',
  },
]

// 组织赞助表单
const orgSponsorForm = reactive({
  amount: 10,
  payMethod: 'alipay' as 'alipay' | 'wechat',
  needInvoice: false,
  companyName: '',
  taxNumber: '',
  email: '',
})

// 现有赞助商列表（假数据）
const sponsors = [
  { name: 'TechCorp', logo: 'https://via.placeholder.com/80?text=TC', amount: 5000, tier: 'gold' },
  // { name: 'DevStudio', logo: 'https://via.placeholder.com/80?text=DS', amount: 2000, tier: 'silver' },
  // { name: 'CodeLab', logo: 'https://via.placeholder.com/80?text=CL', amount: 1000, tier: 'bronze' },
]

function handleOrgSponsorSubmit() {
  const payUrl = orgSponsorForm.payMethod === 'alipay'
    ? `https://qr.alipay.com/enterprise?amount=${orgSponsorForm.amount}`
    : `https://pay.weixin.qq.com/enterprise?amount=${orgSponsorForm.amount}`
  window.open(payUrl, '_blank')
}

const amountOptions = [
  { label: '¥5', value: 5 },
  { label: '¥10', value: 10 },
  { label: '¥20', value: 20 },
  { label: '¥50', value: 50 },
  { label: '¥100', value: 100 },
]
</script>

<template>
  <div class="sponsor-page">
    <div class="sponsor-container">
      <!-- 页面标题 -->
      <div class="sponsor-header">
        <h1 class="sponsor-title">
          赞助支持
        </h1>
        <p class="sponsor-desc">
          感谢您对 Antdv Next 项目的支持！
        </p>
      </div>

      <!-- Tabs 切换 -->
      <a-tabs v-model:active-key="activeTab" :items="tabItems" centered size="large">
        <template #contentRender="{ item }">
          <!-- 组织赞助内容 -->
          <div v-if="item.key === 'org'" class="tab-content">
            <a-tag color="gold" class="mb-16px">
              可开发票11
            </a-tag>
            <p class="section-intro">
              组织赞助的资金将用于服务器等消耗资源的开支，多余的部分会统一分给团队成员和优秀的社区贡献者。
            </p>

            <a-form layout="vertical" class="org-sponsor-form">
              <a-form-item label="赞助金额">
                <a-space direction="vertical" :size="12" class="w-full">
                  <a-radio-group v-model:value="orgSponsorForm.amount" button-style="solid">
                    <a-radio-button v-for="opt in amountOptions" :key="opt.value" :value="opt.value">
                      {{ opt.label }}
                    </a-radio-button>
                  </a-radio-group>
                  <a-input-number
                    v-model:value="orgSponsorForm.amount"
                    :min="1"
                    :step="1"
                    prefix="¥"
                    suffix="元"
                    class="w-200px"
                  />
                </a-space>
              </a-form-item>

              <a-form-item label="支付方式">
                <a-radio-group v-model:value="orgSponsorForm.payMethod">
                  <a-radio value="alipay">
                    <a-space>
                      <AlipayCircleOutlined class="text-18px" style="color: #1677ff" />
                      支付宝
                    </a-space>
                  </a-radio>
                  <a-radio value="wechat">
                    <a-space>
                      <WechatOutlined class="text-18px" style="color: #07c160" />
                      微信支付
                    </a-space>
                  </a-radio>
                </a-radio-group>
              </a-form-item>

              <a-form-item>
                <a-checkbox v-model:checked="orgSponsorForm.needInvoice">
                  需要开具发票
                </a-checkbox>
              </a-form-item>

              <!-- 发票信息（仅勾选需要发票时显示） -->
              <template v-if="orgSponsorForm.needInvoice">
                <a-form-item label="公司/组织名称">
                  <a-input
                    v-model:value="orgSponsorForm.companyName"
                    placeholder="请输入公司或组织名称"
                  />
                </a-form-item>
                <a-form-item label="税号">
                  <a-input
                    v-model:value="orgSponsorForm.taxNumber"
                    placeholder="请输入纳税人识别号"
                  />
                </a-form-item>
                <a-form-item label="接收邮箱">
                  <a-input
                    v-model:value="orgSponsorForm.email"
                    placeholder="用于接收电子发票"
                  />
                </a-form-item>
              </template>

              <a-form-item>
                <a-button type="primary" size="large" @click="handleOrgSponsorSubmit">
                  立即赞助
                </a-button>
              </a-form-item>
            </a-form>

            <!-- 赞助商列表 -->
            <template v-if="sponsors.length">
              <a-divider>感谢以下赞助商</a-divider>
              <div class="sponsors-list">
                <div v-for="sponsor in sponsors" :key="sponsor.name" class="sponsor-item">
                  <a-tooltip :title="`${sponsor.name} - ¥${sponsor.amount}`">
                    <a-avatar :src="sponsor.logo" :size="64" shape="square" />
                  </a-tooltip>
                  <div class="sponsor-name">
                    {{ sponsor.name }}
                  </div>
                  <a-tag v-if="sponsor.tier === 'gold'" color="gold">
                    金牌
                  </a-tag>
                  <a-tag v-else-if="sponsor.tier === 'silver'" color="silver">
                    银牌
                  </a-tag>
                  <a-tag v-else color="orange">
                    铜牌
                  </a-tag>
                </div>
              </div>
            </template>
          </div>

          <!-- 个人赞助内容 -->
          <div v-else-if="item.key === 'personal'" class="tab-content">
            <a-alert
              type="info"
              show-icon
              class="mb-24px"
              message="个人赞助无法开具发票，所有资金归成员个人所有，不属于组织财产。"
            />

            <div class="team-members">
              <a-card
                v-for="member in teamMembers"
                :key="member.github"
                class="member-card"
                hoverable
              >
                <div class="member-content">
                  <a-avatar :src="member.avatar" :size="80" />
                  <h3 class="member-name">
                    {{ member.name }}
                  </h3>
                  <a
                    :href="`https://github.com/${member.github}`"
                    target="_blank"
                    rel="noreferrer"
                    class="member-github"
                  >
                    <GithubOutlined />
                    {{ member.github }}
                  </a>
                  <a-space class="member-actions">
                    <a-popover trigger="click" placement="bottom">
                      <template #content>
                        <div class="qrcode-content">
                          <img
                            src="https://via.placeholder.com/200x200?text=Alipay+QR"
                            alt="支付宝二维码"
                            class="qrcode-img"
                          >
                          <p class="qrcode-tip">
                            扫码赞助 {{ member.name }}
                          </p>
                        </div>
                      </template>
                      <a-button type="primary" ghost>
                        <template #icon>
                          <AlipayCircleOutlined />
                        </template>
                        支付宝
                      </a-button>
                    </a-popover>
                    <a-popover trigger="click" placement="bottom">
                      <template #content>
                        <div class="qrcode-content">
                          <img
                            src="https://via.placeholder.com/200x200?text=WeChat+QR"
                            alt="微信二维码"
                            class="qrcode-img"
                          >
                          <p class="qrcode-tip">
                            扫码赞助 {{ member.name }}
                          </p>
                        </div>
                      </template>
                      <a-button style="color: #07c160; border-color: #07c160">
                        <template #icon>
                          <WechatOutlined />
                        </template>
                        微信
                      </a-button>
                    </a-popover>
                  </a-space>
                </div>
              </a-card>
            </div>
          </div>
        </template>
      </a-tabs>
    </div>
  </div>
</template>

<style scoped>
.sponsor-page {
  padding: 24px;
  min-height: calc(100vh - var(--ant-doc-header-height));
}

.sponsor-container {
  max-width: 800px;
  margin: 0 auto;
}

.sponsor-header {
  text-align: center;
  margin-bottom: 24px;
}

.sponsor-title {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--ant-color-text);
}

.sponsor-desc {
  font-size: 14px;
  color: var(--ant-color-text-secondary);
  margin: 0;
}

.tab-content {
  padding: 16px 0;
}

.section-intro {
  color: var(--ant-color-text-secondary);
  margin-bottom: 20px;
}

.org-sponsor-form {
  max-width: 500px;
}

.sponsors-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.sponsor-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.sponsor-name {
  font-weight: 500;
  color: var(--ant-color-text);
}

.team-members {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.member-card {
  text-align: center;
}

.member-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.member-name {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: var(--ant-color-text);
}

.member-github {
  color: var(--ant-color-text-secondary);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
}

.member-github:hover {
  color: var(--ant-color-primary);
}

.member-actions {
  margin-top: 4px;
}

.qrcode-content {
  text-align: center;
  padding: 8px;
}

.qrcode-img {
  width: 180px;
  height: 180px;
  border-radius: 8px;
}

.qrcode-tip {
  margin-top: 10px;
  color: var(--ant-color-text-secondary);
  margin-bottom: 0;
  font-size: 13px;
}

@media (max-width: 768px) {
  .sponsor-page {
    padding: 16px;
  }

  .sponsor-title {
    font-size: 22px;
  }

  .team-members {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}
</style>
