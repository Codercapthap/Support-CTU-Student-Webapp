<!-- https://viblo.asia/p/tim-hieu-ve-react-router-v4-m68Z0N9A5kG -->
<Route path='/roster'/>
// Khi pathname là "/", đường dẫn sẽ không khớp.
// Khi pathname là '/roster' or '/roster/2' thì đường dẫn sẽ khớp.
// Nếu bạn chỉ muốn khớp với '/roster', bạn cần sử dùng "exact". Đường dẫn sẽ khớp với "/roster" nhưng không khớp với "/roster/2"
// '/roster/2'.
<Route exact path='/roster'/>

Khi route's path khớp, một đối tượng match với các thuộc tính sau sẽ được tạo ra:
url — phần kết hợp của tên đường dẫn với vị trí hiện tại (current location's pathname)
path — đường dẫn route
isExact —path === pathname
params — một đối tượng có chứa các giá trị từ tên đường dẫn đã bị bắt.
// nesting reactjs
https://v5.reactrouter.com/web/example/nesting
