<template>
  <el-container class="chat-container">
    <el-aside width="380px" class="aside">
      <div class="nav">
        <div class="user">
          <el-popover :width="240" trigger="click" popper-class="user-popover" placement="right">
            <template #reference>
              <a class="nav-avatar" href="javascript:void(0)">
                <el-badge is-dot type="success">
                  <el-avatar :src="user.avatar" />
                </el-badge>
              </a>
            </template>
            <template #default>
              <div class="user-panel">
                <div class="header">
                  <el-avatar class="avatar" :size="50" :src="user.avatar" />
                  <div class="info">
                    <div class="name">Cheng</div>
                    <div class="online">[Web 在线]</div>
                  </div>
                </div>
                <div class="handler">
                  <a class="item" href="javascript:void(0)">我的信息</a>
                  <a class="item" href="javascript:void(0)">账号设置</a>
                  <a class="item" href="javascript:void(0)">退出登录</a>
                </div>
              </div>
            </template>
          </el-popover>
        </div>
        <a class="chat" :class="{ active: activeTab == 'chat' }" href="javascript:void(0)" @click="tabToggle('chat')">
          <el-badge :value="12">
            <div class="warp">
              <svg-icon class="icon" name="chat-lines" :size="25" color="#b1b3b8"/>
              <div class="label">消息</div>
            </div>
          </el-badge>
        </a>
        <a class="contacts" :class="{ active: activeTab == 'contacts' }" href="javascript:void(0)" @click="tabToggle('contacts')">
          <el-badge :value="2">
            <div class="warp">
              <svg-icon class="icon" name="user-square-alt" :size="25" color="#b1b3b8"/>
              <div class="label">通讯录</div>
            </div>
          </el-badge>
        </a>
      </div>
      <div class="func">
        <div class="chat" v-show="activeTab == 'chat'">
          <a class="item" v-for="(item, index) in chates" :key="index" href="javascript:void(0)" @click="chat(item)">
            <div class="avatar">
              <el-avatar :size="40" shape="square" :src="item.avatar" />
            </div>
            <div class="info">
              <div class="user-time">
                <div class="user">{{ item.nickname }}</div>
                <div class="time">{{ item.time }}</div>
              </div>
              <div class="msg">{{ item.msg }}</div>
            </div>
          </a>
        </div>
        <div class="contacts" v-show="activeTab == 'contacts'">
          <a class="new-friends" href="javascript:void(0)">
            <div class="icon">
              <svg-icon name="add-user" :size="25" color="#ffffff"/>
            </div>
            <div class="label">新的朋友</div>
          </a>
          <a class="friends" v-for="(item, index) in contacts" :key="index" href="javascript:void(0)" @click="show(item)">
            <div class="avatar">
              <el-avatar :size="45" shape="square" :src="item.avatar" />
            </div>
            <div class="label">{{ item.nickname }}</div>
          </a>
        </div>
      </div>
    </el-aside>
    <el-container class="main-container">
      <div class="chat" v-show="activeTab == 'chat' && chatUser.avatar">
        <el-header class="header">
          <div class="user">
            <el-avatar class="avatar" shape="square" :size="45" :src="chatUser.avatar" />
            <div class="info">
              <div class="name">{{ chatUser.nickname }}</div>
              <div class="online">
                <div class="dot" :class="{ active: chatUser.onlineState }"></div>
                <div class="state">{{ chatUser.onlineState ? '在' : '离' }}线</div>
              </div>
            </div>
          </div>
          <a class="func" href="javascript:void(0)">
            <svg-icon class="icon" name="more-horiz-circled-outline" :size="25" color="#b1b3b8"/>
          </a>
        </el-header>
        <el-main class="main">
          <div class="msg-input">
            <div class="func">
              <a class="item" href="javascript:void(0)">
                <label class="file-label" for="upload">
                  <svg-icon name="folder" :size="25" color="#b1b3b8"/>
                </label>
                <input type="file" accept="*" id="upload" style="display: none;">
              </a>
              <a class="item" href="javascript:void(0)">
                <el-popover trigger="click" popper-class="call-popover" placement="top">
                  <template #reference>
                    <svg-icon name="phone" :size="25" color="#b1b3b8"/>
                  </template>
                  <template #default>
                    <div class="input-panel">
                      <a class="item" href="javascript:void(0)">
                        <svg-icon class="icon" name="video-call" :size="26" color="#b1b3b8"/>
                        <span class="text">视频聊天</span>
                      </a>
                      <a class="item" href="javascript:void(0)">
                        <svg-icon class="icon" name="mike" :size="26" color="#b1b3b8"/>
                        <span class="text">语音聊天</span>
                      </a>
                    </div>
                  </template>
                </el-popover>
              </a>
            </div>
            <div class="textarea-container">
              <textarea class="textarea"></textarea>
              <a class="send-btn" href="javascript:void(0)">发送</a>
            </div>
          </div>
        </el-main>
      </div>
      <div class="detail" v-show="activeTab == 'contacts' && showUser.avatar">
        <div class="user">
          <div class="warp">
            <el-avatar class="avatar" shape="square" :size="70" :src="showUser.avatar" />
            <div class="info">
              <div class="nickname">{{ showUser.nickname }}</div>
              <div class="username">ID：{{ showUser.username }}</div>
            </div>
          </div>
          <a class="send-btn" href="javascript:void(0)" @click="startChat">发送消息</a>
          <a class="setting" href="javascript:void(0)">
            <el-popover trigger="click" popper-class="setting-popover" placement="top">
              <template #reference>
                <svg-icon class="icon" name="more" :size="28" color="#b1b3b8"/>
              </template>
              <template #default>
                <div class="setting-panel">
                  <a class="item" href="javascript:void(0)">删除好友</a>
                </div>
              </template>
            </el-popover>
          </a>
        </div>
      </div>
      <div class="placeholder" v-show="!showUser.avatar && !chatUser.avatar">Chat</div>
    </el-container>
  </el-container>
</template>

<script setup>
  import { ref, reactive } from 'vue'

  import placeholder from '@/assets/placeholder.jpg'

  const isBlank = ref(false)
  const activeTab = ref('chat')

  const user = reactive({
    avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
  })
  const chatUser = reactive({
    avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    nickname: 'Cheng',
    onlineState: false,
    msgs: [

    ]
  })
  const showUser = reactive({
    avatar: '',
    nickname: '',
    username: ''
  })
  const chates = ref([
    {
      nickname: 'Andyzhu',
      avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/WYPDyw2XLQAmmBYYuua6BibF9YRCfJGiaPbT9NAJWabYVQAk4udgplibU3Ls0rnYlBJCtXWMwYKYxK3eBv2gjmic0w/132',
      time: '12:10',
      msg: '你好呀~'
    },
    {
      nickname: '大橘子',
      avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJJMsej1Y4a2fVhUYAefFS145TKiaylajuHql24G9uibCsiaEq1OBeB3SR707Gt1WnPricHMTpPKV1z4w/132',
      time: '12:30',
      msg: '收到'
    },
    {
      nickname: '一颗发芽的土豆',
      avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqkjM6icAH1LvmYbS0yazRhbQMriagrrCzuoDCbVZqnsYpiboKnYAicmECMxYRqtwlDce8iaowHGaBIu2w/132',
      time: '12:59',
      msg: '知道了'
    }
  ])
  const contacts = ref([
    {
      nickname: 'Andyzhu',
      avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/WYPDyw2XLQAmmBYYuua6BibF9YRCfJGiaPbT9NAJWabYVQAk4udgplibU3Ls0rnYlBJCtXWMwYKYxK3eBv2gjmic0w/132'
    },
    {
      nickname: '大橘子',
      avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJJMsej1Y4a2fVhUYAefFS145TKiaylajuHql24G9uibCsiaEq1OBeB3SR707Gt1WnPricHMTpPKV1z4w/132'
    },
    {
      nickname: '一颗发芽的土豆',
      avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqkjM6icAH1LvmYbS0yazRhbQMriagrrCzuoDCbVZqnsYpiboKnYAicmECMxYRqtwlDce8iaowHGaBIu2w/132'
    }
  ])

  const chat = (user)=>{
    chatUser.avatar = user.avatar
    chatUser.nickname = user.nickname
    chatUser.onlineState = false
  }  
  const show = (user)=>{
    showUser.avatar = user.avatar
    showUser.nickname = user.nickname
    showUser.onlineState = false
  }
  const startChat = ()=>{
    activeTab.value = 'chat'
    chatUser.avatar = showUser.avatar
    chatUser.nickname = showUser.nickname
    chatUser.onlineState = false
  }

  const tabToggle = (tab)=>{
    activeTab.value = tab
    resetChat()
  }
  const resetChat = ()=>{
    chatUser.avatar = ''
    chatUser.nickname = ''
    chatUser.onlineState = false
    showUser.avatar = ''
    showUser.nickname = ''
    showUser.onlineState = false
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "@/styles/mixin.scss";
  .user-popover {
    border: none !important;
    padding: 0 !important;
    .el-popper__arrow::before {
      background: var(--el-color-primary) !important;
    }
  }
  .nav {
    .user {
      .el-badge {
        .el-badge__content.is-fixed.is-dot {
          right: 8px !important;
        }
        .el-badge__content.is-fixed {
          top: auto !important;
          bottom: 0 !important;
        }
      }
    }
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  .nav-avatar {
    display: block;
  }
  .user-panel {
    .header {
      @include align;
      padding: 25px 10px;
      @include radius(4, top);
      background: var(--el-color-primary);
      .avatar {
        margin-right: 10px;
      }
      .info {
        margin-top: 8px;
        .name {
          font-size: 16px;
          font-weight: bold;
          color: var(--el-color-white);
        }
        .online {
          font-size: 12px;
          color: var(--el-color-white);
          padding-top: 2px;
        }
      }
    }
    .handler {
      margin-top: 6px;
      margin-bottom: 14px;
      .item {
        @include height-width-percent-line(50);
        display: block;
        font-size: 16px;
        color: var(--el-text-color-primary);
        text-indent: 12px;
        position: relative;
        &:hover {
          background: var(--el-color-primary-light-9);
        }
        &:after {
          @include arrow(6, 20, 22); // 50/2-6/2
        }
      }
    }
  }
  .input-panel {
    .item {
      height: 30px;
      @include justify-align;
      .icon {
        margin-right: 8px;
      }
      .text {
        @include height-line(28);
        @include font(16);

      }
    }
  }
  .setting-panel {
    .item {
      @include height-width-percent-text-line(24);
      display: block;
      @include font(16);
      &:hover {
        background: var(--el-color-info-light-8);
      }
    }
  }
  .chat-container {
    @include height-width-percent;
    .aside {
      display: flex;
      @include border(right);
      .nav {
        @include width-px-height-percent(70);
        @include align($direction: column);
        background: var(--el-color-info-light-9);
        .user {
          margin-top: 30px;
          margin-bottom: 20px;
        }
        .chat, .contacts {
          @include height-width(60);
          @include justify-align;
          @include radius(3);
          margin-top: 8px;
          .warp {
            @include align($direction: column);
            .label {
              @include font(10);
              margin-top: 2px;
            }
          }
          &:hover {
            background: var(--el-color-info-light-8);
          }
        }
        .active {
          .warp {
            .icon {
              color: var(--el-color-primary) !important;
            }
            .label {
              color: var(--el-color-primary);
            }
          }
        }
      }
      .func {
        width: calc(100% - 70px);
        .chat {
          width: 100%;
          .item {
            width: 100%;
            display: flex;
            .avatar {
              padding: 10px;
            }
            .info {
              width: calc(100% - 60px);
              padding: 10px 0;
              .user-time {
                width: 100%;
                @include justify(space-between);
                .user {
                  @include height-line(20);
                  @include font(16, var(--el-text-color-primary));
                }
                .time {
                  @include font(12, var(--el-text-color-secondary));
                  margin-right: 10px;
                }
              }
              .msg {
                @include height-line(20);
                @include font(14, var(--el-text-color-regular));
              }
            }
            &:hover {
              background: var(--el-color-primary-light-9);
            }
          }
        }
        .contacts {
          width: 100%;
          .new-friends {
            @include align;
            padding: 10px 0;
            @include border(bottom);
            .icon {
              @include justify-align;
              @include height-width(45);
              @include radius(4);
              margin: 0 10px;
              background: var(--el-color-warning);
            }
            .label {
              @include font(14);
            }
            &:hover {
              background: var(--el-color-primary-light-9);
            }
          }
          .friends {
            @include align;
            padding: 8px 0;
            margin-top: 12px;
            .avatar {
              margin: 0 10px;
            }
            .label {
              @include font(16);
            }
            &:hover {
              background: var(--el-color-primary-light-9);
            }
          }
        }
      }
    }
    .main-container {
      width: calc(100% - 380px);
      height: 100%;
      .chat {
        @include height-width-percent;
        .header {
          height: 70px;
          @include border(bottom);
          @include justify(space-between);
          .user {
            @include align;
            .avatar {
              margin-right: 10px;
            }
            .name {
              @include height-line(25);
              @include font(16, var(--el-text-color-primary));
            }
            .online {
              @include align;
              .dot {
                @include height-width(6);
                @include radius(6);
                margin-right: 6px;
                background: var(--el-color-info);
              }
              .active {
                background: var(--el-color-success);
              }
              .state {
                @include font(12);
              }
            }
          }
          .func {
            height: 70px;
            @include align;
          }
        }
        .main {
          height: calc(100% - 70px);
          width: 100%;
          position: relative;
          --el-main-padding: 0;
          .msg-input {
            @include height-px-width-percent(250);
            @include border(top);
            @include absolute-bottom;
            .func {
              height: 35px;
              margin-left: 5px;
              @include align;
              .item {
                @include width-px-height-percent(40);
                @include justify-align;
                .file-label {
                  @include height-width-percent;
                  cursor: pointer;
                  @include justify-align;
                }
              }
            }
            .textarea-container {
              width: 100%;
              height: calc(100% - 35px);
              @include justify-align;
              position: absolute;
              .textarea {
                width: calc(100% - 20px);
                height: calc(100% - 20px);
                @include font(18, var(--el-text-color-primary));
                border: none;
                outline: none;
                resize: none;
                &:focus {
                  outline: none;
                }
                &::-webkit-scrollbar {
                  width: 4px;    
                }
                &::-webkit-scrollbar-thumb {
                  border-radius: 10px;
                  box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                  background: rgba(0, 0, 0, 0.2);
                }
                &::-webkit-scrollbar-track {
                  box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                  border-radius: 0;
                  background: rgba(0, 0, 0, 0.1);
                }
              }
              .send-btn {
                @include absolute-bottom(20, 40, right);
                @include font(16, var(--el-color-white));
                @include radius(1);
                padding: 6px 10px;
                display: block;
                background: var(--el-color-primary);
              }
            }
          }
        }
      }
      .detail {
        width: 100%;
        @include justify-align;
        .user {
          @include height-width(200, 320);
          @include align($direction: column);
          position: relative;
          // background: #DC5C5C;
          .warp {
            width: 100%;
            display: flex;
            @include border(bottom);
            padding-bottom: 20px;
            .info {
              margin-left: 10px;
              .nickname {
                @include height-line(30);
                @include font(18);
              }
              .username {
                @include height-line(20);
                @include font(14, var(--el-text-color-secondary));
                padding-top: 2px;
              }
            }
          }
          .send-btn {
            @include font(16, var(--el-color-white));
            @include radius(4);
            padding: 6px 10px;
            margin-top: 40px;
            background: var(--el-color-primary);
          }
          .setting {
            @include absolute(0, 5, right);
          }
        }
      }
    }
  }
  .placeholder {
    @include height-width-percent;
    @include text-center;
  }
</style>
