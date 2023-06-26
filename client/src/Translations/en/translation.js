const TRANSLATIONS_EN = {
   date_format_one: '{{-date, YYYY/MM/DD}}',
   date_format_two: '{{date, DD-MM-YYYY}}',
   navbar: {
      // navbar component
      home: 'Home',
      forum: 'Forum',
      setting: 'Setting',
      contact: 'Contact'
   },
   header: {
      search: {
         placeholder: 'search'
      },
      auth: {
         login: 'Login',
         register: 'Register',
         username: {
            name: 'Username',
            placeholder: 'username input'
         },
         email: {
            name: 'Email',
            placeholder: 'email input'
         },
         password: {
            name: 'Password',
            placeholder: 'password input'
         },
         address: {
            name: 'Address',
            placeholder: 'address input'
         },
         phone: {
            name: 'Phone',
            placeholder: 'phone input'
         },
         birthday: {
            name: 'Birthday',
            placeholder: 'birthday input'
         },
         gender: {
            name: 'gender',
            male: 'Male',
            female: 'Female'
         },
         departments: {
            name: 'Departments',
            placeholder: 'departments..'
         },
         submit: {
            name: 'Submit',
            login: `If you haven't account, please`,
            register: `If you haven't account, pleaseLogin`
         }
      }
   },
   home: '',
   forum: {
      department: 'Department',
      topic: 'Topic',
      post: 'Post',
      feature: {
         update: 'Update',
         delete: 'Delete',
         create: 'Create'
      },
      part: {
         department: {
            name: 'Department',
            total: 'total',
            empty: '(no selected)'
         },
         topics: {
            name: 'All topics',
            total: 'total',
            empty: "Topic haven't created"
         },
         posts: {
            name: 'All posts',
            total: 'total',
            empty: "Post haven't created"
         },
         comments: {
            name: 'show comments',
            empty: `Post don't have comment!`
         }
      }
   },
   setting: {
      // setting route
      language: {
         name: 'Change Language',
         option: {
            vietnamese: 'Vietnames',
            english: 'English'
         }
      },
      area: {
         name: 'Change Area',
         option: {
            vietnam: 'Vietnam',
            japan: 'Japan',
            china: 'China',
            united_states: 'United States'
         }
      },
      font_size: {
         name: 'Change Font Size'
      },
      theme: {
         tip: ' (press A for quick change)',
         name: 'Change Font Size',
         option: {
            dark: 'Dark',
            light: 'Light'
         }
      }
   },
   about: {}
};
export default TRANSLATIONS_EN;
