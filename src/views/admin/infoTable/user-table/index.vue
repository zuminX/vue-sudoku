<template>
  <div>
    <div class="m-padded-t m-padded-lr-large">
      <div class="ui action input">
        <input v-model="searchName" type="text" placeholder="输入用户的名称">
        <button class="ui button" @click="searchByName">搜索</button>
      </div>
      <button class="ui teal labeled icon button m-margin-l" @click="showModal('conditionSearchModal')">
        <i class="search icon" />
        高级搜索
      </button>
      <button class="ui blue right floated button" @click="insertUser">插入用户</button>
    </div>
    <UserInfoTable :mode="mode" :search-name="searchName" :search-user="searchUser" @clickEdit="editUser" />
    <SaveUserModal :user="selectUser" />
    <ConditionSearchModal @search="searchByCondition" />
  </div>
</template>

<script>
import SaveUserModal from '@/views/admin/infoTable/user-table/components/SaveUseModal'
import UserInfoTable from '@/views/admin/infoTable/user-table/components/UserInfoTable'
import { showModal } from '@/components/Modal/Modal'
import ConditionSearchModal from '@/views/admin/infoTable/user-table/components/ConditionSearchModal'

export default {
  name: 'UserTable',
  components: { ConditionSearchModal, UserInfoTable, SaveUserModal },
  data() {
    return {
      selectUser: null,
      searchUser: null,
      searchName: '',
      mode: ''
    }
  },
  methods: {
    showModal,
    editUser(user) {
      this.selectUser = user
      showModal('saveUserModal')
    },
    insertUser() {
      this.selectUser = null
      showModal('saveUserModal')
    },
    searchByName() {
      this.mode = 'name'
    },
    searchByCondition(searchUser) {
      this.searchUser = searchUser
      this.mode = 'condition'
    }
  }
}
</script>
