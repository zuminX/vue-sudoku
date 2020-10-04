<template>
  <div>
    <table class="ui striped table">
      <thead>
        <tr class="center aligned">
          <th>用户名</th>
          <th>昵称</th>
          <th>拥有的角色</th>
          <th>是否启用</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody v-for="(user,i) in userList" :key="i">
        <tr class="center aligned">
          <td>{{ user.username }}</td>
          <td>{{ user.nickname }}</td>
          <td>
            <div class="ui basic labels">
              <a v-for="(roleName, j) in user.roleNameList" :key="j" class="ui label">{{ roleName }}</a>
            </div>
          </td>
          <td>
            <a v-if="user.enabled" class="ui green basic label">启用</a>
            <a v-else class="ui red basic label">禁用</a>
          </td>
          <td :disabled="roleNameListHasAdmin(user.roleNameList)">
            <div class="ui blue basic button" @click="emitUser(user)">
              修改
            </div>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th class="center aligned" colspan="5">
            <PaginationMenu :page-information="pageInformation" @currentChange="updateCurrentPageData" />
          </th>
        </tr>
      </tfoot>
    </table>
    <SaveUserModal :user="selectUser" />
  </div>
</template>

<script>
import PaginationMenu from '@/components/PaginationMenu/index'
import { getUserList } from '@/api/userApi'
import { showModal } from '@/utils/publicUtils'
import SaveUserModal from '@/views/admin/infoTable/user-table/components/SaveUseModal'
import { getDefaultPageInformation } from '@/components/PaginationMenu/PaginationMenu'
import { roleNameListHasAdmin } from '@/utils/coreUtils'

export default {
  name: 'UserList',
  components: { SaveUserModal, PaginationMenu },
  data() {
    return {
      pageInformation: getDefaultPageInformation(),
      userList: [],
      selectUser: null
    }
  },
  mounted() {
    this.updateCurrentPageData()
  },
  methods: {
    roleNameListHasAdmin,
    async updateCurrentPageData(page = 1, pageSize = 5) {
      const { success, data } = await getUserList(page, pageSize)
      if (success) {
        this.pageInformation = data.pageInformation
        this.userList = data.list
      }
    },
    emitUser(user) {
      this.selectUser = user
      showModal('saveUserModal')
    }
  }
}
</script>

<style scoped>

</style>
