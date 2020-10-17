<template>
  <div>
    <div class="ui segment">
      <p>用户名：{{ user.username }}</p>
      <p>昵称：{{ user.nickname }}</p>
    </div>
    <UserGameInformationList />
  </div>
</template>

<script>

import {
  mapGetters
} from 'vuex'
import UserGameInformationList from '@/views/user-information/components/UserGameInformationList'

export default {
  name: 'UserInformationModal',
  components: { UserGameInformationList },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>

