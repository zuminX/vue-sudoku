<template>
  <Modal modal-id="saveUserModal">
    <template v-slot:header>
      <BasicModalHeader class="blue">
        修改用户
      </BasicModalHeader>
    </template>
    <BasicModalContent>
      <form id="userForm" class="ui form">
        <div class="ui stacked segment">
          <div class="field">
            <div class="ui left labeled input">
              <div class="ui label">
                用户名
              </div>
              <input id="username" v-model="userForm.username" name="name" type="text">
            </div>
          </div>
          <div v-if="isNew" class="field">
            <div class="ui left labeled input">
              <div class="ui label">
                密码
              </div>
              <input id="password" v-model="userForm.password" name="password" type="text">
            </div>
          </div>
          <div class="field">
            <div class="ui left labeled input">
              <div class="ui label">
                昵称
              </div>
              <input id="nickname" v-model="userForm.nickname" name="price" type="text">
            </div>
          </div>
          <div class="field">
            <div class="ui left labeled input">
              <div class="ui label">
                创建时间
              </div>
              <input id="createTime" v-model="userForm.createTime" name="createTime" type="text">
            </div>
          </div>
          <div class="field">
            <div class="ui left labeled input">
              <div class="ui label">
                最近登录时间
              </div>
              <input
                id="recentLoginTime"
                v-model="userForm.recentLoginTime"
                name="recentLoginTime"
                placeholder="用户最近登录系统的时间"
                type="text"
              >
            </div>
          </div>
          <div class="field">
            <div class="ui left labeled input">
              <div class="ui label">
                角色
              </div>
              <div class="ui clearable multiple selection dropdown">
                <input id="roleNameList" v-model="userForm.roleNameList" type="hidden" name="roleNameList">
                <i class="dropdown icon" />
                <div class="default text">选择角色</div>
                <div class="menu">
                  <div
                    v-for="(role, i) in roleList"
                    :key="i"
                    class="item"
                    :class="[roleNameHasAdmin(role.name) ? 'disabled' : '']"
                  >
                    {{ role.nameZh }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="field">
            <div class="ui toggle checkbox m-padded-tb tip-popup">
              <input id="enabled" v-model="userForm.enabled" data-content="是否让该用户可以登录系统" type="checkbox">
              <label for="enabled">是否启用</label>
            </div>
          </div>
        </div>
        <div class="ui error message" />
        <input id="id" type="hidden">
      </form>
    </BasicModalContent>
    <template v-slot:actions>
      <OkOrCancelModalActions @clickCheck="saveUser()" />
    </template>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal/index'
import BasicModalHeader from '@/components/Modal/header/BasicModalHeader'
import BasicModalContent from '@/components/Modal/content/BasicModalContent'
import OkOrCancelModalActions from '@/components/Modal/actions/OkOrCancelModalActions'
import { deepClone } from '@/utils'
import { FormValidation } from '@/model/FormValidation'
import {
  addUser,
  modifyUser
} from '@/api/userApi'
import { showSuccessToast } from '@/utils/publicUtils'
import {
  constStore
} from '@/store/constStore'
import { roleNameHasAdmin } from '@/utils/coreUtils'

export default {
  name: 'SaveUserModal',
  components: { OkOrCancelModalActions, BasicModalContent, BasicModalHeader, Modal },
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      userForm: this.getDefaultForm(),
      roleList: []
    }
  },
  computed: {
    isEdit() {
      return this.userForm.id !== null
    },
    isNew() {
      return this.userForm.id === null
    }
  },
  watch: {
    user() {
      this.userForm = this.user ? deepClone(this.user) : this.getDefaultForm()
    }
  },
  async mounted() {
    this.$nextTick(() => {
      this.initUserForm()
    })
    this.roleList = await constStore.getRoleNameList()
  },
  methods: {
    roleNameHasAdmin,
    async saveUser() {
      if (FormValidation.validateForm('userForm')) {
        const userForm = deepClone(this.userForm)
        if (this.isEdit) {
          delete userForm.password
          const { success } = await modifyUser(userForm)
          if (success) {
            showSuccessToast({
              message: '修改用户成功'
            })
          }
        } else {
          delete userForm.id
          const { success } = await addUser(userForm)
          if (success) {
            showSuccessToast({
              message: '添加用户成功'
            })
          }
        }
      }
    },
    getDefaultForm() {
      return {
        id: null,
        username: '',
        password: '',
        nickname: '',
        createTime: null,
        recentLoginTime: null,
        roleNameList: [],
        enabled: false
      }
    },
    /**
     * 加载用户表单验证规则
     */
    initUserForm() {
      FormValidation.init('userForm', {
        username: FormValidation.usernameRules,
        nickname: FormValidation.nicknameRules,
        roleNameList: {
          rules: [FormValidation.notEmptyRule('角色名')]
        }
      })
    }
  }
}
</script>
