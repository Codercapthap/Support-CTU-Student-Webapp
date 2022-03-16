import React from 'react';

import { NavLink } from 'react-router-dom';
import Header from '../Header';
import './_style.scss';

function Register() {
   const handleRegister = () => {
      alert('register');
   };
   return (
      <>
         <Header />
         <div class="auth-wrapper">
            <div class="auth-title">+++ Register +++ </div>
            <form class="auth-container">
               <div class="form-group">
                  <label class="group-name">Username</label>
                  <div class="input-check-box">
                     <i class="fas fa-user"></i>
                     <input class="input" placeholder="Usernane input" v-model="username" />
                     <i class="fas fa-check"></i>
                     <br />
                     {/* <p class="min-alert">
                        <i class="input-error">invalid username</i>
                        <i class="input-success">valid username</i>
                     </p> */}
                  </div>
               </div>
               <div class="form-group">
                  <label class="group-name" for="email">
                     Email
                  </label>
                  <br />
                  <div class="input-check-box">
                     <i class="fas fa-envelope"></i>
                     <input class="input" type="email" placeholder="Email input" v-model="email" />
                     <i class="fas fa-check"></i> <br />
                     {/* <p class="min-alert">
                        <i class="input-error">invalid email</i>
                        <i class="input-success">valid email</i>
                     </p> */}
                  </div>
               </div>
               <div class="form-group">
                  <label class="group-name" for="email">
                     Password
                  </label>
                  <br />
                  <div class="input-check-box">
                     <i class="fas fa-key"></i>
                     <input class="input" type="password" placeholder="[a...z][1--9]" />
                     <i class="fas fa-check"></i> <br />
                     {/* <p class="min-alert">
                        <i class="input-error">invalid password</i>
                        <i class="input-success">valid password</i>
                     </p> */}
                  </div>
               </div>
               <div class="form-group">
                  <label class="group-name">Confirm password</label> <br />
                  <div class="input-check-box">
                     <i class="fas fa-key"></i>
                     <input class="input" type="password" placeholder="confirm password input" />
                     <i class="fas fa-check"></i> <br />
                     {/* <p class="min-alert">
                        <i class="input-error">invalid confirm password</i>
                        <i class="input-success">valid confirm password</i>
                     </p> */}
                  </div>
               </div>
               <div class="form-group">
                  <button type="submit" className="form-submit-item" onClick={handleRegister}>
                     Submit
                  </button>
                  <div className="alert-box">
                     If you haven't account, please
                     <NavLink className="link" to="/auth/login">
                        Login
                     </NavLink>
                  </div>
               </div>
            </form>
         </div>
      </>
   );
}

export default Register;

// <script>
// export default {
//    name: 'register',
//    data() {
//       return {
//          username: '',
//          email: '',
//          password: '',
//          repassword: '',
//          loading: false
//       };
//    },
//    methods: {
//       async handleRegister() {
//          this.message = '';
//          this.successful = false;
//          this.loading = true;

//          const user = {
//             username: this.username,
//             email: this.email,
//             password: this.password
//          };

//       }
//    },
//    computed: {
//       emailValid() {
//          let regex =
//             /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//          if (regex.test(this.email)) {
//             return true;
//          } else if (this.email === '') {
//             return null;
//          } else {
//             return false;
//          }
//       },
//       usernameValid() {
//          if (/^[a-zA-Z\\-]+$/.test(this.username)) {
//             return true;
//          } else if (this.username === '') {
//             return null;
//          } else {
//             return false;
//          }
//       },
//       passwordValid() {
//          let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
//          if (regex.test(this.password)) {
//             return true;
//          } else if (this.password === '') {
//             return null;
//          } else {
//             return false;
//          }
//       },
//       repasswordValid() {
//          if (this.password === this.repassword && this.repassword !== '') {
//             return true;
//          } else {
//             return false;
//          }
//       },
//       isRegister() {
//          return this.usernameValid && this.emailValid && this.repasswordValid;
//       }
//    },
//    mounted() {
//       this.$refs.selectInputRegister.focus();
//    }
// };
// </script>
