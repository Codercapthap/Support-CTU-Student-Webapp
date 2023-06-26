const TRANSLATIONS_VI = {
   date_format_one: '{{-date, YYYY/MM/DD}}',
   date_format_two: '{{date, DD-MM-YYYY}}',
   navbar: {
      // navbar component
      home: 'Trang Chủ',
      forum: 'Diễn Đàn',
      setting: 'Cài Đặt',
      contact: 'Liên Hệ'
   },
   header: {
      search: {
         placeholder: 'tìm kiếm'
      },
      auth: {
         login: 'Đăng Nhập',
         register: 'Đăng Ký',
         username: {
            name: 'Tên Đăng Nhập',
            placeholder: 'tên đăng nhập...'
         },
         email: {
            name: 'Tài Khoản Email',
            placeholder: 'email...'
         },
         password: {
            name: 'Mật Khẩu',
            placeholder: 'example123Support...'
         },
         address: {
            name: 'Địa Chỉ',
            placeholder: 'địa chỉ...'
         },
         phone: {
            name: 'Điện Thoại',
            placeholder: 'điện thoại...'
         },
         birthday: {
            name: 'Ngày Sinh',
            placeholder: '13/03/2001'
         },
         gender: {
            name: 'Giới Tính',
            male: 'Nam',
            female: 'Nữ'
         },
         departments: {
            name: 'Thuộc Các Khoa',
            placeholder: 'các khoa..'
         },
         submit: {
            name: 'Gửi',
            login: `Nếu bạn chưa có tài khoản, hãy`,
            register: `Nếu bạn đã có tài khoản, hãy`
         }
      }
   },
   home: '',
   forum: {
      department: 'Khoa',
      topic: 'Chủ Đề',
      post: 'Bài Viết',
      feature: {
         update: 'Cập Nhập',
         delete: 'Xóa',
         create: 'Tạo Mới'
      },
      part: {
         department: {
            name: 'Khoa',
            total: 'tổng số',
            empty: '(chưa chọn)'
         },
         topics: {
            name: 'Tất cả chủ đề',
            total: 'tổng số',
            empty: 'Chủ đề chưa được tạo'
         },
         posts: {
            name: 'Tất cả bài viết',
            total: 'tổng số',
            empty: 'Bài viết chưa được tạo'
         },
         comments: {
            name: 'Hiện tất cả bình luận',
            empty: `Bài viết chưa có bình luận`
         }
      }
   },
   setting: {
      // setting route
      language: {
         name: 'Thay Đổi Ngôn Ngữ',
         option: {
            vietnamese: 'Tiếng Việt',
            english: 'Tiếng Anh'
         }
      },
      area: {
         name: 'Thay Đổi Khu Vực',
         option: {
            vietnam: 'Việt Nam',
            japan: 'Nhật Bản',
            china: 'Trung Quốc',
            united_states: 'Hoa Kỳ'
         }
      },
      font_size: {
         name: 'Thay Đổi Cỡ Chữ'
      },
      theme: {
         tip: ' (nhấn Space để thay đổi nhanh)',
         name: 'Thay Đổi Giao Diện',
         option: {
            dark: 'Tối',
            light: 'Sáng'
         }
      }
   },
   about: {}
};
export default TRANSLATIONS_VI;
