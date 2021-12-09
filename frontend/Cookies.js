// Feat Cookie Helper
class FeatCookies {
    constructor(){

    }

    /**
     * @param {String} name Cookie name
     * @param {String} value Cookie Value
     * @param {Number} expire_days Number of days until expire
     */
    set(name, value, expire_days) {
        const d = new Date();
        d.setTime(d.getTime() + (expire_days*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    /**
     * @param {String} cookie_name Existing cookie name
     * @returns String with cookie or nothing if cookie does not exist
     */
    get(cookie_name) {
        let name = cookie_name + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
    }
}