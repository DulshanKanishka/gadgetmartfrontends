import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Authservice } from "./authservice";

@Injectable()
export class Authguard implements CanActivate {

    constructor(
        private authService: Authservice,
        private router: Router
    ) { }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['/route-login']);
            return false;
        }

        return true;

    }
}
