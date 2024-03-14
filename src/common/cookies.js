import Cookies from "js-cookie";


const cookies = {
    setUserLogged(userLogged) {
        Cookies.set("userLogged", userLogged);
      },
      getUserLogged() {
        return Cookies.get("userLogged");
      }
}

export default{
    cookies
}