<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8">
          <login>
          </login>
        </div>
        <div class="col-md-8">
          <!-- <edit-profile-form>
          </edit-profile-form> -->
        </div>
        <div class="col-md-4">
          <!-- <user-card>
          </user-card> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import EditProfileForm from './UserProfile/EditProfileForm.vue'
  import UserCard from './UserProfile/UserCard.vue'
  import Login from './UserProfile/Login.vue'

  export default {
    components: {
      EditProfileForm,
      UserCard,
      Login
    }
  }

</script>
<style>

</style>
