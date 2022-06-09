// Firebase SDK
const db = firebase.firestore();
// select Tag
const $navUserName = document.querySelector("#nav-user-name");
const $navLogin = document.querySelector("#nav-login");
const $navLogout = document.querySelector("#nav-logout");
const $navUpload = document.querySelector("#nav-upload");
const localStorageUser = localStorage.getItem("userInfo");

// 유저정보 확인
const checkUser = () => {
  // 로컬스토리지에 'userInfo' 있으면 정보 가져오고, 로그인아웃 상태 바꾸기
  if (localStorageUser) {
    // 로그인 되어 있음
    $navUserName.textContent = JSON.parse(localStorageUser).displayName + " 님";
    $navLogin.classList.remove("view");
    $navLogout.classList.add("view");
  }
};
checkUser();

// 로그아웃
$navLogout.addEventListener("click", (event) => {
  event.preventDefault();
  const logoutconfirm = confirm("로그아웃 하시겠습니까?");
  if (logoutconfirm) {
    firebase.auth().signOut();
    localStorage.removeItem("userInfo");
    window.location.href = "/index.html";
  } else if (!logoutconfirm) {
    return;
  }
});

// 로그아웃 상태에서 '상품 올리기' 눌렀을 때
$navUpload.addEventListener("click", (event) => {
  if (!localStorageUser) {
    event.preventDefault();
    alert("글을 작성하려면 로그인이 필요해요.");
    window.location.href = "./login.html";
  }
});

// 로그인 상태 변경됐을 때 (로그인 / 로그아웃 / 새로고침)
// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     // 로그인 되거나, 되어있을 때 로컬스토리지에 정보 저장
//     // 로컬스토리지에 user아이템 이름으로 저장 (auth 정보 객체를 그대로)
//     // localStorage.setItem('userr',JSON.stringify(user));

//     // 로컬스토리지에 userInfo아이템 이름으로 저장 (user컬렉션 중 auth 정보의 uid와 일치하는 데이터베이스의 객체를)
//     db.collection("user")
//       .doc(user.uid)
//       .get()
//       .then((rst) => {
//         localStorage.setItem("userInfo", JSON.stringify(rst.data()));
//         checkUser();
//       });
//   }
// });
