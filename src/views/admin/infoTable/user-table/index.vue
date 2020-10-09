<template>
  <div>
    <div class="m-padded-tb m-padded-lr-large">
      <div class="ui action input">
        <input v-model="searchName" type="text" placeholder="输入用户的名称">
        <button class="ui button" @click="searchByName">搜索</button>
      </div>
      <button class="ui teal labeled icon button m-margin-l" @click="searchByCondition">
        <i class="search icon" />
        高级搜索
      </button>
      <button class="ui blue right floated button" @click="insertUser">插入用户</button>
    </div>
    <UserInfoTable :mode="mode" :search-name="searchName" @clickEdit="editUser" />
    <SaveUserModal :user="selectUser" />
  </div>
</template>

<script>
import SaveUserModal from '@/views/admin/infoTable/user-table/components/SaveUseModal'
import UserInfoTable from '@/views/admin/infoTable/user-table/components/UserInfoTable'
import { showModal } from '@/components/Modal/Modal'

export default {
  name: 'UserList',
  components: { UserInfoTable, SaveUserModal },
  data() {
    return {
      selectUser: null,
      searchName: '',
      mode: ''
    }
  },
  methods: {
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
    searchByCondition() {
      // this.mode = 'condition'
    }
  }
}
</script>

<style scoped>

</style>
