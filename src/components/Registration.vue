<template>
  <div class="container login-container">
    <div class="row">
      <div class="col-md-6 login-form-1">
        <h3>Edtechworx</h3>

      </div>
      <div class="col-md-6 login-form-2">
        <h3>Registration</h3>
        <form>
          <div v-if="credentials_error" class="alert alert-danger">
            {{credentials_error}}.
          </div>
          <div class="form-group">
            <input v-model="first_name" type="text" class="form-control" placeholder="First Name"  v-on:input="restErrors"  />
          </div>
          <div v-if="first_name_error" class="alert alert-danger">
            {{first_name_error}}.
          </div>
          <div class="form-group">
            <input v-model="last_name" type="text" class="form-control" placeholder="Last Name"  v-on:input="restErrors"  />
          </div>
          <div v-if="last_name_error" class="alert alert-danger">
            {{last_name_error}}.
          </div>
          <div class="form-group">
            <input v-model="email" type="email" class="form-control" placeholder="Email"  v-on:input="restErrors"  v-on:focusout="useravailibility(email)" />
          </div>
          <div v-if="email_error" class="alert alert-danger">
            {{email_error}}.
          </div>
          <div class="form-group">
            <input v-model="password" type="password" class="form-control" placeholder="Password"  v-on:input="restErrors" />
          </div>
          <div v-if="password_error" class="alert alert-danger">
            {{password_error}}.
          </div>
          <div class="form-group">
            <input v-model="confirm_password" type="password" class="form-control" placeholder=" Confirm Password"  v-on:input="restErrors" />
          </div>
          <div v-if="confirm_password_error" class="alert alert-danger">
            {{confirm_password_error}}.
          </div>
          <div class="form-group">
            <button class="btnSubmit" v-on:click="validateregistrationform">Login</button>
          </div>
          <div class="form-group">
            <router-link to="/login" class="ForgetPwd"><p>Already Account ,login now.</p></router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import AuthApiService from '../apis/auth_apis_services'
    export default {
        name: "Registration",
        comments:{

        },
        data(){
          return{
            first_name:null,
            last_name:null,
            email:null,
            password:null,
            confirm_password:null,
            first_name_error:null,
            last_name_error:null,
            email_error:null,
            password_error:null,
            confirm_password_error:null,
            credentials_error:null,
            user_availibility:true,

          }
        },
        methods:{
          validateregistrationform: function (e) {
            e.preventDefault();
            if (this.validFirstName(this.first_name) && this.validLastName(this.last_name) &&  this.validEmail(this.email)  && this.validPassword(this.password) && this.validConfirmPassword(this.confirm_password) ) {
              if (this.user_availibility) {
                AuthApiService.registration(this.first_name, this.last_name, this.email, this.password)
                  .then(response => {
                    localStorage.setItem('user-token', response.token);
                    const loggedIn = localStorage.getItem('user-token');
                    if (loggedIn) {
                      this.$router.push('/home');
                    }
                  })
                  .catch(
                    error => {
                      this.credentials_error = "something went wrong"
                    }
                  )
              }
              else {
                this.email_error=' email adress already taken.'
              }
            }
          },
          validEmail: function (email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(! re.test(email)){
              this.email_error='invalid email adress.'
            }
            if(! this.email){
              this.email_error='email is required.'
            }
            return re.test(email);
          },
          validPassword: function (password) {
            if(password && password.length >= 8){
              return true
            }else {
              if(!password){
                this.password_error = 'Password Required.';
                return false
              }
              else {
                this.password_error = 'Password less then 8 character.';
                return false
              }

            }
          },
          restErrors:function () {
              this.credentials_error=null,
              this.email_error=null,
              this.password_error=null,
              this.first_name_error=null,
              this.last_name_error=null,
              this.confirm_password_error=null,
              this.user_availibility=true

          },
          validFirstName:function (first_name) {
            if(!first_name){
              this.first_name_error='First Name is Required';
              return false
            }
            else {
              return true
            }
          },
          validLastName:function (last_name) {
            if(!last_name){
              this.last_name_error='Last Name is Required';
              return false
            }
            else {
              return true
            }
          },
          validConfirmPassword: function (confirm_password) {
            if(confirm_password && confirm_password.length >= 8){
              if(this.password === this.confirm_password){
                return true
              }
              else {
                this.confirm_password_error = 'Password does not match.';
                return false
              }

            }else {
              if(!confirm_password){
                this.confirm_password_error= 'Password Required.';
                return false
              }
              if(confirm_password.length < 8) {
                this.confirm_password_error = 'Password less then 8 character.';
                return false
              }
            }
          },
          useravailibility:function (email) {
            AuthApiService.useravailibility(this.email)
              .then(response => {
                this.user_availibility=response.availability;
                if(!this.user_availibility){
                  this.email_error=' email adress already taken.'
                }
              })
              .catch(
                error => {

                }
              )

          },
        }

    }
</script>

<style scoped>

</style>
