import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";  
import { setLogout, setUserDetails } from "../Redux/state";  

const Profile = () => {
  const dispatch = useDispatch();

  // Lấy thông tin người dùng từ Redux state
  const user = useSelector((state) => state.user);

  // Kiểm tra console log để xem dữ liệu
  console.log("User from Redux:", user);  // Debugging log

  // State để lưu trữ thông tin khi người dùng muốn cập nhật
  const [editedUser, setEditedUser] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: user?.address || "",
    phone: user?.phone || "",
  });

  // Đảm bảo rằng khi user thay đổi, editedUser được cập nhật
  
  useEffect(() => {
    if (user) {
      setEditedUser({
        name: user.name || "",
        email: user.email || "",
        address: user.address || "",
        phone: user.phone || "",
      });
    }
  }, [user]);



  const handleLogout = () => {
    dispatch(setLogout());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSave = () => {
    dispatch(setUserDetails(editedUser));
  };

  return (
    <div className="profile">
      {user ? (
        <div>
          <h2>Thông tin người dùng</h2>
          <div>
            <label>
              Tên:
              <input
                type="text"
                name="name"
                value={editedUser.name}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Địa chỉ:
              <input
                type="text"
                name="address"
                value={editedUser.address}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Số điện thoại:
              <input
                type="text"
                name="phone"
                value={editedUser.phone}
                onChange={handleChange}
              />
            </label>
          </div>
          <button onClick={handleSave}>Lưu thông tin</button>
          <button onClick={handleLogout}>Đăng xuất</button>
        </div>
      ) : (
        <p>Vui lòng đăng nhập để xem thông tin.</p>
      )}
    </div>
  );
};

export default Profile;
