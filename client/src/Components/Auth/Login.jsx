import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../Header';

import './_style.scss';

function Login() {
   const handleLogin = () => {
      alert('login');
   };
   return (
      <>
         <Header />
         <div class="auth-wrapper">
            <div class="auth-title">+++ Login +++</div>
            <form class="auth-container">
               <div class="form-group">
                  <label class="group-name" for="email">
                     Email
                  </label>
                  <br />
                  <div class="input-check-box">
                     <i class="fas fa-envelope"></i>
                     <input class="input" type="email" placeholder="Email input" />
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
                  <button type="submit" className="form-submit-item" onClick={handleLogin}>
                     Submit
                  </button>
                  <div className="alert-box">
                     If you haven't account, please
                     <NavLink className="link" to="/auth/register">
                        Register
                     </NavLink>
                  </div>
               </div>
            </form>
         </div>
      </>
   );
}

export default Login;

// export default {
//    name: 'register',
//    data() {
//       return {
//          email: '',
//          password: '',
//          loading: false
//       };
//    },
//    methods: {
//       async handleLogin() {
//          this.message = '';
//          this.successful = false;
//          this.loading = true;

//          const user = {
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
//       isLogin() {
//          return this.emailValid;
//       }
//    },
//    mounted() {
//       this.$refs.selectInputLogin.focus();
//    }
// };
// </script>
