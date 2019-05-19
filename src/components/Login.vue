<template>
  <div class="container login-container">
    <div class="row">
      <div class="col-md-6 login-form-1">
        <h3>Login</h3>
        <form>
          <div v-if="credentials_error" class="alert alert-danger">
            {{credentials_error}}.
          </div>
          <div class="form-group">
            <input v-model="email" type="email" class="form-control" placeholder="Email"  v-on:input="restErrors"  />
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
            <button class="btnSubmit" v-on:click="loginform">Login</button>
          </div>
          <div class="form-group">
            <a href="#" class="ForgetPwd">Forget Password?</a>
          </div>
          <div class="form-group">
            <router-link  to="/registration" class="ForgetPwd"><p>Register Account</p> </router-link>
          </div>
        </form>
      </div>
      <div class="col-md-6 login-form-2">
        <h3>Edtechworx</h3>
      </div>
    </div>
  </div>
</template>

<script>
    import '../assets/login.css'
    import AuthApiService from '../apis/auth_apis_services'
    export default {
        name: "Login",
        components: {},
        data() {
        return {
          email_error:null,
          password_error:null,
          credentials_error:null,
          email: null,
          password: null,
        }
      },
        methods: {
        loginform: function (e) {
          e.preventDefault();
          if (this.validEmail(this.email)  && this.validPassword(this.password) ) {
                 AuthApiService.login(this.email, this.password)
                .then(response => {
                  localStorage.setItem('user-token', response.token);
                  const loggedIn = localStorage.getItem('user-token');
                  console.log(loggedIn);
                  if (loggedIn) {
                    console.log('route home');
                    this.$router.push('/home');
                  }
                })
                .catch(
                  error => {
                    console.log('error');
                    this.credentials_error="provided credentials are incorrect"
                  }
                 )

          }
        },
        validEmail: function (email) {
            console.log('valide');
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
            console.log('check  Password');
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
           this.password_error=null
        }
      },
    }
</script>

<style scoped>

</style>
