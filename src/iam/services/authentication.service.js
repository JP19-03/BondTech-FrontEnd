import http from "../../shared/services/http-common.js";

export class AuthenticationService {

    signIn(username, password) {
        return http.post("/authentication/sign-in?username=" + username + "&password=" + password);
    }

   signUp(signUpRequest) {
        return http.post("/authentication/sign-up", signUpRequest);
   }
}