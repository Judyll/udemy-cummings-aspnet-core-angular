(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/_guards/auth.guard.ts":
/*!***************************************!*\
  !*** ./src/app/_guards/auth.guard.ts ***!
  \***************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_services/auth.service */ "./src/app/_services/auth.service.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthGuard = /** @class */ (function () {
    function AuthGuard(authService, router, alertify) {
        this.authService = authService;
        this.router = router;
        this.alertify = alertify;
    }
    // We don't need ActivatedRouteSnapshot and RouterStateSnapshot so we can remove it
    // AuthGuard implements CanActivate which will tell our route (defined in routes.ts)
    // if we need to activate the route or not.
    // It returns an Observable of type boolean, a Promise of type boolean, or simply a
    // boolean.  If we see this return type where there are 'pipes' or 'bar' after the
    // method name, we call it 'union type'.  As long as our return type is either of
    // the three, then we are fine.
    AuthGuard.prototype.canActivate = function () {
        // We need to check if the user has logged-in so we need the Auth service
        if (this.authService.loggedIn()) {
            return true;
        }
        this.alertify.error('You need to log-in!');
        // We need to redirect the user if they are not logged-in so we will send them back
        // to the home page
        this.router.navigate(['/home']);
        return false;
    };
    AuthGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services_alertify_service__WEBPACK_IMPORTED_MODULE_3__["AlertifyService"]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "./src/app/_guards/prevent-unsaved-changes.guard.ts":
/*!**********************************************************!*\
  !*** ./src/app/_guards/prevent-unsaved-changes.guard.ts ***!
  \**********************************************************/
/*! exports provided: PreventUnsavedChangesGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreventUnsavedChangesGuard", function() { return PreventUnsavedChangesGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

// This is configured as a provider in the app.module.ts
// And also added as guard in the route.ts
var PreventUnsavedChangesGuard = /** @class */ (function () {
    function PreventUnsavedChangesGuard() {
    }
    // We will pass the component: since we need to access the
    // @ViewChild('editForm') editForm: NgForm; declared in the member-edit.component.ts
    // which is really pointing to the child 
    // <form #editForm="ngForm" id="editForm" (ngSubmit)="updateUser()"> from the file
    // member-edit.component.html
    PreventUnsavedChangesGuard.prototype.canDeactivate = function (component) {
        if (component.editForm.dirty) {
            return confirm('Are you sure you want to continue? Any unsaved changes will be lost.');
        }
        return true;
    };
    PreventUnsavedChangesGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        })
    ], PreventUnsavedChangesGuard);
    return PreventUnsavedChangesGuard;
}());



/***/ }),

/***/ "./src/app/_models/pagination.ts":
/*!***************************************!*\
  !*** ./src/app/_models/pagination.ts ***!
  \***************************************/
/*! exports provided: PaginatedResult */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaginatedResult", function() { return PaginatedResult; });
// Now that we have implemented pagination, we will now store the results
// that we are getting from the GetUsers([FromQuery]UserParams userParams)
// in two parts: we are going to have the user themselves and we gonna have
// the pagination
// But, for this class, we will make it a type of <T> to make it generic
// so that we can use the same class when we will add pagination to messages
// as well.
var PaginatedResult = /** @class */ (function () {
    function PaginatedResult() {
    }
    return PaginatedResult;
}());



/***/ }),

/***/ "./src/app/_resolver/lists.resolver.ts":
/*!*********************************************!*\
  !*** ./src/app/_resolver/lists.resolver.ts ***!
  \*********************************************/
/*! exports provided: ListsResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListsResolver", function() { return ListsResolver; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_services/user.service */ "./src/app/_services/user.service.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ListsResolver = /** @class */ (function () {
    function ListsResolver(userService, router, alertify) {
        this.userService = userService;
        this.router = router;
        this.alertify = alertify;
        this.pageNumber = 1;
        this.pageSize = 5;
        // Set the likesParams to 'Likers' which means return the list of users
        // that likes the currently log-in user
        this.likesParam = 'Likers';
    }
    ListsResolver.prototype.resolve = function (route) {
        var _this = this;
        return this.userService.getUsers(this.pageNumber, this.pageSize, null, this.likesParam).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["catchError"])(function (error) {
            _this.alertify.error('Problem retrieving data');
            _this.router.navigate(['/home']);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])(null);
        }));
    };
    ListsResolver = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _services_alertify_service__WEBPACK_IMPORTED_MODULE_3__["AlertifyService"]])
    ], ListsResolver);
    return ListsResolver;
}());



/***/ }),

/***/ "./src/app/_resolver/member-detail.resolver.ts":
/*!*****************************************************!*\
  !*** ./src/app/_resolver/member-detail.resolver.ts ***!
  \*****************************************************/
/*! exports provided: MemberDetailResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MemberDetailResolver", function() { return MemberDetailResolver; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_services/user.service */ "./src/app/_services/user.service.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






// This is a resolver that will return a single type of User
// This is consumed by member-detail.component.ts as defined in the route.ts
var MemberDetailResolver = /** @class */ (function () {
    function MemberDetailResolver(userService, router, alertify) {
        this.userService = userService;
        this.router = router;
        this.alertify = alertify;
    }
    MemberDetailResolver.prototype.resolve = function (route) {
        var _this = this;
        // This automatically subscribe to the .getUser() method so we don't need to
        // subscribe this ourselves.
        return this.userService.getUser(+route.params['id'])
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["catchError"])(function (error) {
            _this.alertify.error('Problem retrieving data');
            // We will navigate them back to the /members page
            _this.router.navigate(['/members']);
            // We will return an observable of type null by using the of() method from 'rxjs'
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])(null);
        }));
    };
    MemberDetailResolver = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services_alertify_service__WEBPACK_IMPORTED_MODULE_3__["AlertifyService"]])
    ], MemberDetailResolver);
    return MemberDetailResolver;
}());



/***/ }),

/***/ "./src/app/_resolver/member-edit.resolver.ts":
/*!***************************************************!*\
  !*** ./src/app/_resolver/member-edit.resolver.ts ***!
  \***************************************************/
/*! exports provided: MemberEditResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MemberEditResolver", function() { return MemberEditResolver; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_services/user.service */ "./src/app/_services/user.service.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_services/auth.service */ "./src/app/_services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







// This is a resolver that will return a single type of User
// This is consumed by member-edit.component.ts as defined in the route.ts
var MemberEditResolver = /** @class */ (function () {
    function MemberEditResolver(userService, authService, router, alertify) {
        this.userService = userService;
        this.authService = authService;
        this.router = router;
        this.alertify = alertify;
    }
    MemberEditResolver.prototype.resolve = function (route) {
        var _this = this;
        // This automatically subscribe to the .getUser() method so we don't need to
        // subscribe this ourselves.
        // This time, we will use the 'decodedToken' from auth.service.ts to get the
        // user Id
        return this.userService.getUser(this.authService.decodedToken.nameid)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["catchError"])(function (error) {
            _this.alertify.error('Problem retrieving your data');
            // We will navigate them back to the /members page
            _this.router.navigate(['/members']);
            // We will return an observable of type null by using the of() method from 'rxjs'
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])(null);
        }));
    };
    MemberEditResolver = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"], _services_auth_service__WEBPACK_IMPORTED_MODULE_6__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _services_alertify_service__WEBPACK_IMPORTED_MODULE_3__["AlertifyService"]])
    ], MemberEditResolver);
    return MemberEditResolver;
}());



/***/ }),

/***/ "./src/app/_resolver/member-list.resolver.ts":
/*!***************************************************!*\
  !*** ./src/app/_resolver/member-list.resolver.ts ***!
  \***************************************************/
/*! exports provided: MemberListResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MemberListResolver", function() { return MemberListResolver; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_services/user.service */ "./src/app/_services/user.service.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






// This is a resolver that will return an array of type PaginatedResult<User[]>
// This is consumed by member-list.component.ts as defined in the route.ts
var MemberListResolver = /** @class */ (function () {
    function MemberListResolver(userService, router, alertify) {
        this.userService = userService;
        this.router = router;
        this.alertify = alertify;
        this.pageNumber = 1;
        this.pageSize = 6; // Setting is differently from our API for testing purposes
    }
    MemberListResolver.prototype.resolve = function (route) {
        var _this = this;
        // This automatically subscribe to the .getUsers() method so we don't need to
        // subscribe this ourselves.
        return this.userService.getUsers(this.pageNumber, this.pageSize)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["catchError"])(function () {
            _this.alertify.error('Problem retrieving data');
            // We will navigate them back to the /home page
            _this.router.navigate(['/home']);
            // We will return an observable of type null by using the of() method from 'rxjs'
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])(null);
        }));
    };
    MemberListResolver = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services_alertify_service__WEBPACK_IMPORTED_MODULE_3__["AlertifyService"]])
    ], MemberListResolver);
    return MemberListResolver;
}());



/***/ }),

/***/ "./src/app/_resolver/messages.resolver.ts":
/*!************************************************!*\
  !*** ./src/app/_resolver/messages.resolver.ts ***!
  \************************************************/
/*! exports provided: MessagesResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessagesResolver", function() { return MessagesResolver; });
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../_services/auth.service */ "./src/app/_services/auth.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_services/user.service */ "./src/app/_services/user.service.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







// This is a resolver that will return an array of type PaginatedResult<Message[]>
// This is consumed by member-list.component.ts as defined in the route.ts
var MessagesResolver = /** @class */ (function () {
    function MessagesResolver(userService, authService, router, alertify) {
        this.userService = userService;
        this.authService = authService;
        this.router = router;
        this.alertify = alertify;
        this.pageNumber = 1;
        this.pageSize = 6; // Setting is differently from our API for testing purposes
        this.messageContainter = 'Unread'; // This match the API default value in the \DatingApp.API\Helpers\MessageParams.cs
    }
    MessagesResolver.prototype.resolve = function (route) {
        var _this = this;
        // This automatically subscribe to the .getUsers() method so we don't need to
        // subscribe this ourselves.
        return this.userService.getMessages(this.authService.decodedToken.nameid, this.pageNumber, this.pageSize, this.messageContainter)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["catchError"])(function () {
            _this.alertify.error('Problem retrieving messages.');
            // We will navigate them back to the /home page
            _this.router.navigate(['/home']);
            // We will return an observable of type null by using the of() method from 'rxjs'
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["of"])(null);
        }));
    };
    MessagesResolver = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"], _services_auth_service__WEBPACK_IMPORTED_MODULE_0__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _services_alertify_service__WEBPACK_IMPORTED_MODULE_4__["AlertifyService"]])
    ], MessagesResolver);
    return MessagesResolver;
}());



/***/ }),

/***/ "./src/app/_services/alertify.service.ts":
/*!***********************************************!*\
  !*** ./src/app/_services/alertify.service.ts ***!
  \***********************************************/
/*! exports provided: AlertifyService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlertifyService", function() { return AlertifyService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AlertifyService = /** @class */ (function () {
    function AlertifyService() {
    }
    // This is our dialog box that says like 'Are you sure you want to do this ?'
    // This is just a wrapper
    // This will take a message as the first parameters and the second parameter
    // is the okCallBack which is a function of type any that will be executed
    // when the user clicks the OK button
    AlertifyService.prototype.confirm = function (message, okCallBack) {
        alertify.confirm(message, function (e) {
            // e here is the OK button that the user clicked
            if (e) {
                okCallBack();
            }
            else { } // this is empty since we don't need to do anything if the user clicks cancel
        });
    };
    AlertifyService.prototype.success = function (message) {
        alertify.success(message);
    };
    AlertifyService.prototype.error = function (message) {
        alertify.error(message);
    };
    AlertifyService.prototype.warning = function (message) {
        alertify.warning(message);
    };
    AlertifyService.prototype.message = function (message) {
        alertify.message(message);
    };
    AlertifyService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], AlertifyService);
    return AlertifyService;
}());



/***/ }),

/***/ "./src/app/_services/auth.service.ts":
/*!*******************************************!*\
  !*** ./src/app/_services/auth.service.ts ***!
  \*******************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @auth0/angular-jwt */ "./node_modules/@auth0/angular-jwt/index.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// We can use this for any-to-any component communication through the use of the Services.
// BehaviorSubject
// * Is a type of subject (which is a type of Observable)
// * Can be subscribed to
// * Subscribers can receive updated results
// * A subject is an observer (so we can send values to it)
// * Needs an initial value (must always return a value on subscription)
// * On subscription returns last value of subject
// * Can use the getValue() method in no observable code




// This allows us to make the service injectible.  Components does not need this decorator
// since components are automatically injectible.
var AuthService = /** @class */ (function () {
    function AuthService(http) {
        this.http = http;
        // This is defined in the environment.ts
        this.baseUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].apiUrl + 'auth/';
        this.jwtHelper = new _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_4__["JwtHelperService"]();
        this.photoUrl = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]('../../assets/user.png');
        // Making the this.currentPhotoUrl property 'asObservable' mean we are able to subscribe
        // to this.currentPhotoUrl property and if this is updated, then ANY components
        // subscribing to it gets updated too.  This is even if the application is refreshed,
        // we log-in, we log-out, anything we do on any occasion the
        // this.changeMemberPhoto(photoUrl: string)
        // is going to be called, our photo url will be updated everywhere or any component
        // that is subscribing to the this.currentPhotoUrl observable.
        this.currentPhotoUrl = this.photoUrl.asObservable();
    }
    // This method will update the 'this.photoUrl' behavior subject
    AuthService.prototype.changeMemberPhoto = function (photoUrl) {
        // This will update the value of the this.photoUrl instead of
        // the default which is '../../assets/user.png'
        if (photoUrl) {
            this.photoUrl.next(photoUrl);
        }
    };
    // This will take the model parameter that we have specified in the nav.component.ts
    AuthService.prototype.login = function (model) {
        // Observable -- is a stream of data that is coming back from the server and in order
        // get this observable data, we need to subscribe to it
        var _this = this;
        // We will return an http POST with first parameter as the URL, second is the Body which we will send the
        // model that will contain like
        // {
        //  "Username": "john",
        //  "Password": "password"
        // }
        // and the third part is if we need to add options for this request like Headers.  Do we need add Headers
        // for this specific request.  This is a post request and typically you might want to send Headers depending
        // on the API you are using.  Since we are using ASP.NET CORE, it is expected to receive the content
        // as application/json.  This is also the default header for Angular
        // Since this just a log-in request, we don't need a third parameter.
        // The response will return a token (as seen in Postman).  And in order to do Observable when it comes back
        // from the server, we need to use rxjs operator.  We are using rxjs 6 for this course since we are using Angular 6.
        return this.http.post(this.baseUrl + 'login', model)
            .pipe(
        // We are now using the rxjs map operator
        // We will pass in the response
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            // This will contain the token response
            var responseUser = response;
            if (responseUser) {
                localStorage.setItem('token', responseUser.token);
                // The .setItem second parameter accepts a string and what we are getting
                // back from our API server is an object.  So, we will use JSON.stringify
                // to convert the string into an object
                localStorage.setItem('user', JSON.stringify(responseUser.user));
                _this.decodedToken = _this.jwtHelper.decodeToken(responseUser.token);
                _this.currentUser = responseUser.user;
                _this.changeMemberPhoto(_this.currentUser.photoUrl);
            }
        }));
    };
    AuthService.prototype.register = function (user) {
        return this.http.post(this.baseUrl + 'register', user);
    };
    AuthService.prototype.loggedIn = function () {
        var token = localStorage.getItem('token');
        // We will use a third party library called angular-jwt to manage the
        // token we stored in the localStorage
        // What we CANNOT DO is to validate the token since the key to validate the
        // token is on the server \DatingApp.API\appsettings.json and we don't have
        // access to that in the client application and we don't really need to do that
        // in our client application since the client application is compiled into
        // javascript and since javascript is run on the client-side, we don't want
        // end-users to have access to the validation key
        // Confusing names: angular 1 is renamed as angularjs
        // and angular 2 is renamed as angular
        // @auth0/angular-jwt: https://github.com/auth0/angular2-jwt and go for
        // version 2.0.0
        // If there is a value in this token, and is not expired,
        // then it will return true else it will return false
        return !this.jwtHelper.isTokenExpired(token);
    };
    AuthService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            // Any components that will use this service will tell it which module is providing the service.  In this
            // case it is the root module with is the app.module.ts.  When we add a new service, then we need to
            // add it on our app.module.ts under the providers:[] array.
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "./src/app/_services/error.interceptor.ts":
/*!************************************************!*\
  !*** ./src/app/_services/error.interceptor.ts ***!
  \************************************************/
/*! exports provided: ErrorInterceptor, ErrorInterceptorProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorInterceptor", function() { return ErrorInterceptor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorInterceptorProvider", function() { return ErrorInterceptorProvider; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ErrorInterceptor = /** @class */ (function () {
    function ErrorInterceptor() {
    }
    // Intercept an outgoing  HttpRequest and optionally transform it or the response
    // First parameter is the request parameter of type HttpRequest<any>
    // Second parameter is the next parameter of type HttpHandler
    // This will return an Observable that is having a return type of HttpEvent<any>
    ErrorInterceptor.prototype.intercept = function (req, next) {
        // We will return next and handle the request and then we need use the
        // rxjs pipe because we want to use an rxjs operator which is the rxjs catchError
        return next.handle(req).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (error) {
            // We will check what type of error
            if (error instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpErrorResponse"]) {
                // We will check if the error is a 401 - UnAuthorized error
                if (error.status === 401) {
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(error.statusText);
                }
                // We will check the application headers and get the application error
                // that we have created in \DatingApp.API\Helpers\Extensions.cs
                // on the method AddApplicationError(this HttpResponse response, string message)
                var applicationError = error.headers.get('Application-Error');
                if (applicationError) {
                    console.error(applicationError);
                    // We will throw the error
                    // throwError is coming from rxjs and is of type Observable
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(applicationError);
                }
                // We will check for server errors and this will go inside the
                // HttpResponse          
                var serverError = error.error;
                // If it is a model state error, it will be of type object
                // which is basically a key/value
                var modalStateError = '';
                if (serverError && typeof serverError === 'object') {
                    for (var key in serverError) {
                        if (serverError[key]) {
                            modalStateError += serverError[key] + '\n';
                        }
                    }
                }
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(modalStateError || serverError || 'Server Error');
            }
        }));
    };
    ErrorInterceptor = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            // Any components that will use this service will tell it which module is providing the service.  In this
            // case it is the root module with is the app.module.ts.  When we add a new service, then we need to
            // add it on our app.module.ts under the providers:[] array.
            providedIn: 'root'
        })
    ], ErrorInterceptor);
    return ErrorInterceptor;
}());

// We need to create an error interceptor provider that we can later add to our
// app.module.ts
var ErrorInterceptorProvider = {
    // Add an additional http interceptor to the existing Angular array
    // of http interceptors
    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HTTP_INTERCEPTORS"],
    useClass: ErrorInterceptor,
    // Set to true since we don't want to replace this to our existing Angular array
    // of interceptors but we need to add it.
    multi: true
};


/***/ }),

/***/ "./src/app/_services/user.service.ts":
/*!*******************************************!*\
  !*** ./src/app/_services/user.service.ts ***!
  \*******************************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _models_pagination__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_models/pagination */ "./src/app/_models/pagination.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





// When we will be doing a request from the API, we also need to send-up the
// authorization token with the request.
// The http.get() method can also take some options and inside the options can be the
// headers like in Postman the 'Authorization' header
// We will only need this if we don't configure JwtModule in app.module.ts
// We will now create a header
// const httpOptions = {
//  headers: new HttpHeaders({
//    // Do not forget the 'space' after the 'Bearer'
//    'Authorization': 'Bearer ' + localStorage.getItem('token')
//  })
// }
var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
        // This is defined in the environment.ts
        this.baseUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].apiUrl;
    }
    UserService.prototype.getUsers = function (page, itemsPerPage, userParams, likesParam) {
        var paginatedResult = new _models_pagination__WEBPACK_IMPORTED_MODULE_3__["PaginatedResult"]();
        // This is query string the parameter that we are going to append when we will
        // call the the UsersController.GetUsers([FromQuery]UserParams userParams) endpoint
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpParams"]();
        // These are the same fields we have created in the DatingApp.API.Helpers.UserParams
        // class which is the parameter type in the UsersController.GetUsers([FromQuery]UserParams userParams)
        // endpoint.  The UserParams class uses its default value PageNumber = 1 and
        // PageSize = 10 if 'page' and 'itemsPerPage' are null
        if (page != null && itemsPerPage != null) {
            params = params.append('pageNumber', page);
            params = params.append('pageSize', itemsPerPage);
        }
        // Check if we have userParams
        if (userParams != null) {
            params = params.append('minAge', userParams.minAge);
            params = params.append('maxAge', userParams.maxAge);
            params = params.append('gender', userParams.gender);
            params = params.append('orderBy', userParams.orderBy);
        }
        // Check if we need to filter the users by Likers
        if (likesParam === 'Likers') {
            params = params.append('likers', 'true');
        }
        // Check if we need to filter the users by Likees
        if (likesParam === 'Likees') {
            params = params.append('likees', 'true');
        }
        // return this.http.get<User[]>(this.baseUrl + 'users/', httpOptions);
        // return this.http.get<User[]>(this.baseUrl + 'users');
        // We will now change what we are observing as part of the response
        // By specifying observe: 'response', we will now have access to the full
        // Http response and pass in the query string params.
        // Since we are not getting only the body back we need to do something
        // with the response by using .pipe which is a method that allows us access
        // to the rxjs operators.  The rxjs operator we will be using is the map operator
        // which applies a given project function to each value emitted by the source
        // Observable, and emits the resulting values as an Observable.
        return this.http.get(this.baseUrl + 'users', { observe: 'response', params: params })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) {
            // We are getting the Users[] array from the body of the response
            paginatedResult.result = response.body;
            // We are also getting the pagination information from the response headers
            // The headers returned by the UsersController.GetUsers([FromQuery]UserParams userParams)
            // contains Pagination →{"CurrentPage":1,"ItemsPerPage":10,"TotalItems":14,"TotalPages":2}
            // which is configured the DatingApp.API.Helpers.Extensions.AddPagination method
            if (response.headers.get('Pagination') != null) {
                paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
            }
            return paginatedResult;
        }));
    };
    UserService.prototype.getUser = function (id) {
        // return this.http.get<User>(this.baseUrl + 'users/' + id, httpOptions);
        return this.http.get(this.baseUrl + 'users/' + id);
    };
    UserService.prototype.updateUser = function (id, user) {
        return this.http.put(this.baseUrl + 'users/' + id, user);
    };
    UserService.prototype.setMainPhoto = function (userId, id) {
        // Since this is a post request, we are required to send a body.
        // We will be sending an empty object {}
        return this.http.post(this.baseUrl + 'users/' + userId +
            '/photos/' + id + '/setMain', {});
    };
    UserService.prototype.deletePhoto = function (userId, id) {
        return this.http.delete(this.baseUrl + 'users/' + userId +
            '/photos/' + id);
    };
    UserService.prototype.sendLike = function (id, recipientId) {
        // Since this is a post request, we are required to send a body.
        // We will be sending an empty object {}
        return this.http.post(this.baseUrl + 'users/' + id +
            '/like/' + recipientId, {});
    };
    UserService.prototype.getMessages = function (id, page, itemsPerPage, messageContainer) {
        var paginatedResult = new _models_pagination__WEBPACK_IMPORTED_MODULE_3__["PaginatedResult"]();
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpParams"]();
        params = params.append('MessageContainer', messageContainer);
        // These are the same fields we have created in the DatingApp.API.Helpers.UserParams
        // class which is the parameter type in the UsersController.GetUsers([FromQuery]UserParams userParams)
        // endpoint.  The UserParams class uses its default value PageNumber = 1 and
        // PageSize = 10 if 'page' and 'itemsPerPage' are null
        if (page != null && itemsPerPage != null) {
            params = params.append('pageNumber', page);
            params = params.append('pageSize', itemsPerPage);
        }
        // We will now change what we are observing as part of the response
        // By specifying observe: 'response', we will now have access to the full
        // Http response and pass in the query string params.
        // Since we are not getting only the body back we need to do something
        // with the response by using .pipe which is a method that allows us access
        // to the rxjs operators.  The rxjs operator we will be using is the map operator
        // which applies a given project function to each value emitted by the source
        // Observable, and emits the resulting values as an Observable.
        return this.http.get(this.baseUrl + 'users/' + id + '/messages', { observe: 'response', params: params })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) {
            // We are getting the Users[] array from the body of the response
            paginatedResult.result = response.body;
            // We are also getting the pagination information from the response headers
            // The headers returned by the UsersController.GetUsers([FromQuery]UserParams userParams)
            // contains Pagination →{"CurrentPage":1,"ItemsPerPage":10,"TotalItems":14,"TotalPages":2}
            // which is configured the DatingApp.API.Helpers.Extensions.AddPagination method
            if (response.headers.get('Pagination') != null) {
                paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
            }
            return paginatedResult;
        }));
    };
    UserService.prototype.getMessageThread = function (id, recipientId) {
        return this.http.get(this.baseUrl + 'users/' + id + '/messages/thread/' + recipientId);
    };
    UserService.prototype.sendMessage = function (id, message) {
        return this.http.post(this.baseUrl + 'users/' + id + '/messages', message);
    };
    UserService.prototype.deleteMessage = function (id, userId) {
        return this.http.post(this.baseUrl + 'users/' + userId + '/messages/' + id, {});
    };
    UserService.prototype.markAsRead = function (userId, messageId) {
        this.http.post(this.baseUrl + 'users/' + userId + '/messages/' + messageId + '/read', {})
            .subscribe();
    };
    UserService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], UserService);
    return UserService;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-nav></app-nav>\r\n\r\n<!--\r\n    When we click one of our router links as defined in the nav.component.html,\r\n    the <router-outlet> is automatically swapped for our component and our component\r\n    will be displayed.\r\n-->\r\n<router-outlet></router-outlet>\r\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_services/auth.service */ "./src/app/_services/auth.service.ts");
/* harmony import */ var _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @auth0/angular-jwt */ "./node_modules/@auth0/angular-jwt/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// A class decorated with a 'Component' is a Typescript class that has Angular-component features
var AppComponent = /** @class */ (function () {
    function AppComponent(authService) {
        this.authService = authService;
        this.jwtHelper = new _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_2__["JwtHelperService"]();
    }
    AppComponent.prototype.ngOnInit = function () {
        // This will prevent the 'Welcome <Username>' on the nav.component.html
        // from showing blank once the user refreshes the page.
        // The 'token' and 'user' is retrieved and stored in the localStored in the auth.service.ts
        // in the login(model: any) method
        var token = localStorage.getItem('token');
        // We will use JSON.parse to turn a string into an object since 'user' is stored as string
        var user = JSON.parse(localStorage.getItem('user'));
        if (token) {
            this.authService.decodedToken = this.jwtHelper.decodeToken(token);
        }
        if (user) {
            this.authService.currentUser = user;
            this.authService.changeMemberPhoto(user.photoUrl);
        }
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: tokenGetter, AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tokenGetter", function() { return tokenGetter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_gallery__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-gallery */ "./node_modules/ngx-gallery/bundles/ngx-gallery.umd.js");
/* harmony import */ var ngx_gallery__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(ngx_gallery__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var ng2_file_upload__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng2-file-upload */ "./node_modules/ng2-file-upload/index.js");
/* harmony import */ var ng2_file_upload__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(ng2_file_upload__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @auth0/angular-jwt */ "./node_modules/@auth0/angular-jwt/index.js");
/* harmony import */ var time_ago_pipe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! time-ago-pipe */ "./node_modules/time-ago-pipe/esm5/time-ago-pipe.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _nav_nav_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./nav/nav.component */ "./src/app/nav/nav.component.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./_services/auth.service */ "./src/app/_services/auth.service.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _register_register_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./register/register.component */ "./src/app/register/register.component.ts");
/* harmony import */ var _services_error_interceptor__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./_services/error.interceptor */ "./src/app/_services/error.interceptor.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./_services/alertify.service */ "./src/app/_services/alertify.service.ts");
/* harmony import */ var _members_member_list_member_list_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./members/member-list/member-list.component */ "./src/app/members/member-list/member-list.component.ts");
/* harmony import */ var _list_list_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./list/list.component */ "./src/app/list/list.component.ts");
/* harmony import */ var _messages_messages_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./messages/messages.component */ "./src/app/messages/messages.component.ts");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./routes */ "./src/app/routes.ts");
/* harmony import */ var _guards_auth_guard__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./_guards/auth.guard */ "./src/app/_guards/auth.guard.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./_services/user.service */ "./src/app/_services/user.service.ts");
/* harmony import */ var _members_member_card_member_card_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./members/member-card/member-card.component */ "./src/app/members/member-card/member-card.component.ts");
/* harmony import */ var _members_member_detail_member_detail_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./members/member-detail/member-detail.component */ "./src/app/members/member-detail/member-detail.component.ts");
/* harmony import */ var _resolver_member_detail_resolver__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./_resolver/member-detail.resolver */ "./src/app/_resolver/member-detail.resolver.ts");
/* harmony import */ var _resolver_member_list_resolver__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./_resolver/member-list.resolver */ "./src/app/_resolver/member-list.resolver.ts");
/* harmony import */ var _members_member_edit_member_edit_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./members/member-edit/member-edit.component */ "./src/app/members/member-edit/member-edit.component.ts");
/* harmony import */ var _resolver_member_edit_resolver__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./_resolver/member-edit.resolver */ "./src/app/_resolver/member-edit.resolver.ts");
/* harmony import */ var _guards_prevent_unsaved_changes_guard__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./_guards/prevent-unsaved-changes.guard */ "./src/app/_guards/prevent-unsaved-changes.guard.ts");
/* harmony import */ var _members_photo_editor_photo_editor_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./members/photo-editor/photo-editor.component */ "./src/app/members/photo-editor/photo-editor.component.ts");
/* harmony import */ var _resolver_lists_resolver__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./_resolver/lists.resolver */ "./src/app/_resolver/lists.resolver.ts");
/* harmony import */ var _resolver_messages_resolver__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./_resolver/messages.resolver */ "./src/app/_resolver/messages.resolver.ts");
/* harmony import */ var _members_member_messages_member_messages_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./members/member-messages/member-messages.component */ "./src/app/members/member-messages/member-messages.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Node modules










// Local components
























// Added a new way to handle the tokens using JwtModule.
// We will get the token inside our app.module.ts, we will import the JwtModule
// and we will configure it to send up the token for any domain listed in the
// 'whitelistedDomain' and any 'blacklistedDomain' route we are not going
// to send the token with.
function tokenGetter() {
    return localStorage.getItem('token');
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_10__["AppComponent"],
                _nav_nav_component__WEBPACK_IMPORTED_MODULE_11__["NavComponent"],
                _home_home_component__WEBPACK_IMPORTED_MODULE_13__["HomeComponent"],
                _register_register_component__WEBPACK_IMPORTED_MODULE_14__["RegisterComponent"],
                _members_member_list_member_list_component__WEBPACK_IMPORTED_MODULE_17__["MemberListComponent"],
                _list_list_component__WEBPACK_IMPORTED_MODULE_18__["ListComponent"],
                _messages_messages_component__WEBPACK_IMPORTED_MODULE_19__["MessagesComponent"],
                _members_member_card_member_card_component__WEBPACK_IMPORTED_MODULE_23__["MemberCardComponent"],
                _members_member_detail_member_detail_component__WEBPACK_IMPORTED_MODULE_24__["MemberDetailComponent"],
                _members_member_edit_member_edit_component__WEBPACK_IMPORTED_MODULE_27__["MemberEditComponent"],
                _members_photo_editor_photo_editor_component__WEBPACK_IMPORTED_MODULE_30__["PhotoEditorComponent"],
                // This is a pipe so we will add it on the declarations - https://www.npmjs.com/package/time-ago-pipe
                time_ago_pipe__WEBPACK_IMPORTED_MODULE_9__["TimeAgoPipe"],
                _members_member_messages_member_messages_component__WEBPACK_IMPORTED_MODULE_33__["MemberMessagesComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                // We will be importing this inside our value.component in order to get the values from our DatingApp.API
                // with the Http service that it provides like HttpClient which allows us to do an Http GET request
                // and retrieve values from the server.  The HttpClient can be injected in the ValueComponent (value.component.ts)
                // constructor like constructor(private http:HttpClient)
                _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClientModule"],
                // We need to tell Angular we will be using the Forms module which is used for submitting username and password
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                // We need to import the reactive forms module so that we can use reactive forms
                // in our register.component.ts
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                // Add the NGX dropdown module - https://valor-software.com/ngx-bootstrap/#/dropdowns
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__["BsDropdownModule"].forRoot(),
                // Add the NGX datepicker module - https://valor-software.com/ngx-bootstrap/#/datepicker
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__["BsDatepickerModule"].forRoot(),
                // Add the NGX pagination module - https://valor-software.com/ngx-bootstrap/#/pagination
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__["PaginationModule"].forRoot(),
                // Add the NGX buttons module - https://valor-software.com/ngx-bootstrap/#/buttons
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__["ButtonsModule"].forRoot(),
                // Add a router to our SPA which is defined in the routes.ts
                _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forRoot(_routes__WEBPACK_IMPORTED_MODULE_20__["appRoutes"]),
                // Import the NGX Gallery for our image gallery - https://lukasz-galka.github.io/ngx-gallery-demo/
                ngx_gallery__WEBPACK_IMPORTED_MODULE_6__["NgxGalleryModule"],
                // Import the NG2 File Uploader - https://valor-software.com/ng2-file-upload/
                ng2_file_upload__WEBPACK_IMPORTED_MODULE_7__["FileUploadModule"],
                // Imports the JwtModule so that we can send the token automatically when
                // we will do an API request rather than creating headers manually as
                // example found in user.services.ts
                _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_8__["JwtModule"].forRoot({
                    config: {
                        tokenGetter: tokenGetter,
                        whitelistedDomains: ['localhost:5000'],
                        blacklistedRoutes: ['localhost:5000/api/auth']
                    }
                }),
                // Import the tab module so that we can use the tab controls in our components
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__["TabsModule"].forRoot()
            ],
            // Add the services we have created
            // Add the error interceptors
            // Add router guards
            providers: [
                _services_auth_service__WEBPACK_IMPORTED_MODULE_12__["AuthService"],
                _services_error_interceptor__WEBPACK_IMPORTED_MODULE_15__["ErrorInterceptorProvider"],
                _services_alertify_service__WEBPACK_IMPORTED_MODULE_16__["AlertifyService"],
                _guards_auth_guard__WEBPACK_IMPORTED_MODULE_21__["AuthGuard"],
                _services_user_service__WEBPACK_IMPORTED_MODULE_22__["UserService"],
                _resolver_member_detail_resolver__WEBPACK_IMPORTED_MODULE_25__["MemberDetailResolver"],
                _resolver_member_list_resolver__WEBPACK_IMPORTED_MODULE_26__["MemberListResolver"],
                _resolver_member_edit_resolver__WEBPACK_IMPORTED_MODULE_28__["MemberEditResolver"],
                _resolver_lists_resolver__WEBPACK_IMPORTED_MODULE_31__["ListsResolver"],
                _resolver_messages_resolver__WEBPACK_IMPORTED_MODULE_32__["MessagesResolver"],
                _guards_prevent_unsaved_changes_guard__WEBPACK_IMPORTED_MODULE_29__["PreventUnsavedChangesGuard"]
            ],
            // When the module is loaded, its gonna bootstrap the AppComponent which is the app.component.ts
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_10__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/home/home.component.css":
/*!*****************************************!*\
  !*** ./src/app/home/home.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/home/home.component.html":
/*!******************************************!*\
  !*** ./src/app/home/home.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--\r\n    container -- Bootstrap provide a bit of sensoring and padding around the content inside the container\r\n    mt-5 -- Represents a bootstrap margin. mt means margin-top and 5 is an element of distance from the top\r\n-->\r\n<div class=\"container mt-5\">\r\n\r\n  <div *ngIf=\"!registerMode\" style=\"text-align: center\">\r\n    <h1>Find your match</h1>\r\n    <p class=\"lead\">Come on in to view your matches... All you need to do is sign up!</p>\r\n    <div class=\"text-center\">\r\n      <!--\r\n        Add mr-2 for spacing  \r\n      -->\r\n      <button class=\"btn btn-primary btn-lg mr-2\" (click)=\"setRegisterMode(true)\">Register</button>\r\n      <button class=\"btn btn-info btn-lg\">Learn more</button>\r\n    </div>\r\n  </div>\r\n\r\n  <div *ngIf=\"registerMode\" class=\"container\">\r\n    <div class=\"row justify-content-center\">\r\n      <!--\r\n          A bootstrap grid is made up of 12 columns in total.\r\n          We are going to use 4 of them to show our register form.\r\n      -->\r\n      <div class=\"col-4\">\r\n        <!--\r\n            This will demonstrate a child to parent component communication using output properties\r\n            by emitting an output from our child component register.component which will be then received by our\r\n            parent component home.component.  The (cancelRegister) is an event method in our child component\r\n            register.component which emits a boolean value and the setRegisterMode($event) is an method in our\r\n            parent component home.component which accepts boolean as a parameter.\r\n        -->\r\n        <app-register (cancelRegister)=\"setRegisterMode($event)\"></app-register>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/home/home.component.ts":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

 // Make sure this is the same lib on the app.module.ts
var HomeComponent = /** @class */ (function () {
    function HomeComponent(http) {
        this.http = http;
        this.registerMode = false;
    }
    HomeComponent.prototype.ngOnInit = function () { };
    HomeComponent.prototype.setRegisterMode = function (mode) {
        this.registerMode = mode;
    };
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.css */ "./src/app/home/home.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/list/list.component.css":
/*!*****************************************!*\
  !*** ./src/app/list/list.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/list/list.component.html":
/*!******************************************!*\
  !*** ./src/app/list/list.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"text-center mt-3\">\r\n  <h2>{{likesParam === 'Likers' ? 'Members who like me' : 'Members who I\\'ve liked'}}\r\n  : {{pagination.totalItems}}</h2>\r\n</div>\r\n\r\n<div class=\"container mt-3\">\r\n\r\n  <div class=\"row\">\r\n    <div class=\"btn-group\">\r\n      <button class=\"btn btn-primary\"\r\n              [(ngModel)]=\"likesParam\"\r\n              btnRadio=\"Likers\"\r\n              (click)=\"loadUsers()\">\r\n        Members who like me\r\n      </button>\r\n      <button class=\"btn btn-primary\"\r\n              [(ngModel)]=\"likesParam\"\r\n              btnRadio=\"Likees\"\r\n              (click)=\"loadUsers()\">\r\n        Members who I like\r\n      </button>\r\n    </div>\r\n  </div>\r\n\r\n  <br />\r\n\r\n  <div class=\"row\">\r\n    <div *ngFor=\"let user of users\" class=\"col-sm-6 col-md-4 col-lg-4 col-xl-2\">\r\n      <app-member-card [user]=\"user\"></app-member-card>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n\r\n<div class=\"d-flex justify-content-center\">\r\n  <pagination [boundaryLinks]=\"true\"\r\n              [totalItems]=\"pagination.totalItems\"\r\n              [itemsPerPage]=\"pagination.itemsPerPage\"\r\n              [(ngModel)]=\"pagination.currentPage\"\r\n              (pageChanged)=\"pageChanged($event)\"\r\n              previousText=\"&lsaquo;\" nextText=\"&rsaquo;\" firstText=\"&laquo;\" lastText=\"&raquo;\">\r\n\r\n  </pagination>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/list/list.component.ts":
/*!****************************************!*\
  !*** ./src/app/list/list.component.ts ***!
  \****************************************/
/*! exports provided: ListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListComponent", function() { return ListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_services/auth.service */ "./src/app/_services/auth.service.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_services/user.service */ "./src/app/_services/user.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ListComponent = /** @class */ (function () {
    function ListComponent(authService, userService, route, alertify) {
        this.authService = authService;
        this.userService = userService;
        this.route = route;
        this.alertify = alertify;
    }
    ListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (data) {
            _this.users = data['users'].result;
            _this.pagination = data['users'].pagination;
        });
        this.likesParam = 'Likers';
    };
    ListComponent.prototype.pageChanged = function (event) {
        this.pagination.currentPage = event.page;
        this.loadUsers();
    };
    ListComponent.prototype.loadUsers = function () {
        var _this = this;
        this.userService
            .getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.likesParam)
            .subscribe(function (res) {
            _this.users = res.result;
            _this.pagination = res.pagination;
        }, function (error) {
            _this.alertify.error(error);
        });
    };
    ListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-list',
            template: __webpack_require__(/*! ./list.component.html */ "./src/app/list/list.component.html"),
            styles: [__webpack_require__(/*! ./list.component.css */ "./src/app/list/list.component.css")]
        }),
        __metadata("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"], _services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"], _services_alertify_service__WEBPACK_IMPORTED_MODULE_4__["AlertifyService"]])
    ], ListComponent);
    return ListComponent;
}());



/***/ }),

/***/ "./src/app/members/member-card/member-card.component.css":
/*!***************************************************************!*\
  !*** ./src/app/members/member-card/member-card.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*Transforms the image by zooming-in/out when the user do a mouse over*/\r\n.card:hover img{\r\n  -webkit-transform: scale(1.2, 1.2);\r\n          transform: scale(1.2, 1.2);\r\n  transition-duration: 500ms;\r\n  transition-timing-function: ease-out;\r\n  opacity: 0.7; \r\n}\r\n.card img{\r\n  -webkit-transform: scale(1.0, 1.0);\r\n          transform: scale(1.0, 1.0);\r\n  transition-duration: 500ms;\r\n  transition-timing-function: ease-out;\r\n}\r\n/*Prevent the image from zooming in outside from the card wrapper*/\r\n.card-img-wrapper{\r\n  overflow: hidden;\r\n  /*This will allow the user, heart, and envelop buttons to be positioned abolutely as\r\n    defined in the .member-icons below.\r\n  */\r\n  position: relative;\r\n}\r\n.member-icons{\r\n  position: absolute;\r\n  bottom: -30%;\r\n  left: 0;\r\n  right: 0;\r\n  margin-right: auto;\r\n  margin-left: auto;\r\n  opacity: 0;\r\n}\r\n/*This takes effect on our user, heart, and envelope buttons when the user hovers over*/\r\n.card-img-wrapper:hover .member-icons{\r\n  bottom: 0;\r\n  opacity: 1;\r\n}\r\n/*Add animation that slides-up the user, heart, and envelope buttons rather than pop-in*/\r\n.animate{\r\n  transition: all 0.3s ease-in-out;\r\n}\r\n"

/***/ }),

/***/ "./src/app/members/member-card/member-card.component.html":
/*!****************************************************************!*\
  !*** ./src/app/members/member-card/member-card.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--\r\n\r\n  We are going to use the card component from Bootstrap.\r\n  Source: https://getbootstrap.com/docs/4.1/components/card/\r\n\r\n    We are also modifying some behaviour of the .card class to zoom-in/out\r\n    when the user selects the image.  The modification can be found in\r\n    member-card.component.css.\r\n\r\n-->\r\n\r\n<!--mb for margin bottom-->\r\n<div class=\"card mb-4\">\r\n  <!--\r\n      If we want to absolutely position the user, heart, and envelope buttons, then the container\r\n      which is the <div class=\"card-img-wrapper\"> should be relatively positioned element\r\n  -->\r\n  <div class=\"card-img-wrapper\">\r\n    <img class=\"card-img-top\" src=\"{{user.photoUrl || '../../../assets/user.png'}}\" alt=\"{{user.knownAs}}\" />\r\n    <!--\r\n        Add an ordered list of buttons which are inline so that the buttons will\r\n        appear horizontally align.  We will also give it a class of .member-icons\r\n        so that we can have the ability to style it.  We will also give it an\r\n        .animate class so that we can add animate styles to the button. And we will\r\n        add .text-center class so that the buttons will be aligned to each member card\r\n    -->\r\n    <ul class=\"list-inline member-icons animate text-center\">\r\n      <!--Redirect them to the user information-->\r\n      <li class=\"list-inline-item\">\r\n        <button class=\"btn btn-primary\" [routerLink]=\"['/members/', user.id]\">\r\n          <i class=\"fa fa-user\"></i>\r\n        </button>\r\n      </li>\r\n      <!--Button to hit 'like' the user-->\r\n      <li class=\"list-inline-item\">\r\n        <button class=\"btn btn-primary\"\r\n                (click)=\"sendLike(user.id)\">\r\n          <i class=\"fa fa-heart\"></i>\r\n        </button>\r\n      </li>\r\n      <!--Button to send the user a message-->\r\n      <li class=\"list-inline-item\">\r\n        <!--\r\n            We are adding [queryParams]=\"{tab: 3}\" so that our URL will \r\n            have a query string and will look like http://localhost:4200/members/14?tab=3\r\n            We need this query string so that we can redirect the tab focus\r\n            to the Messages tab when we click each message row\r\n        -->\r\n        <button class=\"btn btn-primary\" \r\n          [routerLink]=\"['/members', user.id]\"\r\n          [queryParams]=\"{tab: 3}\">\r\n          <i class=\"fa fa-envelope\"></i>\r\n        </button>\r\n      </li>\r\n    </ul>\r\n  </div>\r\n  <!--p for padding-->\r\n  <div class=\"card-body p-1\">\r\n    <h6 class=\"card-title text-center mb-1\"><i class=\"fa fa-user\"></i>\r\n      {{user.knownAs}}, {{user.age}}\r\n    </h6>\r\n    <p class=\"card-text text-muted text-center\">{{user.city}}</p>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/members/member-card/member-card.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/members/member-card/member-card.component.ts ***!
  \**************************************************************/
/*! exports provided: MemberCardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MemberCardComponent", function() { return MemberCardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_services/auth.service */ "./src/app/_services/auth.service.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_services/user.service */ "./src/app/_services/user.service.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MemberCardComponent = /** @class */ (function () {
    function MemberCardComponent(authService, userService, alertify) {
        this.authService = authService;
        this.userService = userService;
        this.alertify = alertify;
    }
    MemberCardComponent.prototype.ngOnInit = function () {
    };
    MemberCardComponent.prototype.sendLike = function (id) {
        var _this = this;
        this.userService.sendLike(this.authService.decodedToken.nameid, id)
            .subscribe(function () {
            _this.alertify.success('You have liked ' + _this.user.knownAs);
        }, function (error) {
            _this.alertify.error(error);
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], MemberCardComponent.prototype, "user", void 0);
    MemberCardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-member-card',
            template: __webpack_require__(/*! ./member-card.component.html */ "./src/app/members/member-card/member-card.component.html"),
            styles: [__webpack_require__(/*! ./member-card.component.css */ "./src/app/members/member-card/member-card.component.css")]
        }),
        __metadata("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"], _services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"],
            _services_alertify_service__WEBPACK_IMPORTED_MODULE_3__["AlertifyService"]])
    ], MemberCardComponent);
    return MemberCardComponent;
}());



/***/ }),

/***/ "./src/app/members/member-detail/member-detail.component.css":
/*!*******************************************************************!*\
  !*** ./src/app/members/member-detail/member-detail.component.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*Adjust the .img-thumbnail*/\r\n.img-thumbnail{\r\n  margin: 25px;\r\n  width: 85%;\r\n  height: 85%;\r\n}\r\n.card-body{\r\n  /*Take away the padding on top and bottom and set the left and right to 25px*/\r\n  padding: 0 25px;\r\n}\r\n.card-footer{\r\n  /*Add 10px padding top and button and 15px left and right*/\r\n  padding: 10px 15px;\r\n  /*Background #fff to match the color of the rest of the component*/\r\n  background-color: #fff;\r\n  border-top: none;\r\n}\r\n"

/***/ }),

/***/ "./src/app/members/member-detail/member-detail.component.html":
/*!********************************************************************!*\
  !*** ./src/app/members/member-detail/member-detail.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--\r\n      We need to use an elvies/ ? / save navigation operator to fix the error\r\n      ERROR TypeError: Cannot read property 'knownAs' of undefined\r\n      But this is fixed by adding member-detail.resolver.ts\r\n\r\n      {{user?.knownAs}} or\r\n\r\n      <img class=\"card-img-top img-thumbnail\" src=\"{{user?.photoUrl}}\" alt=\"{{user?.knownAs}}\" />\r\n  -->\r\n\r\n<div class=\"container mt-4\">\r\n  <div class=\"row\">\r\n    <h1>{{user.knownAs}}'s Profile</h1>\r\n  </div>\r\n  <div class=\"row\">\r\n    <!--\r\n        On the left hand side, we will display some general information about the user\r\n        including the photo\r\n    -->\r\n    <div class=\"col-sm-4\">\r\n      <div class=\"card\">\r\n        <img class=\"card-img-top img-thumbnail\" src=\"{{user.photoUrl || '../../../assets/user.png'}}\" alt=\"{{user.knownAs}}\" />\r\n        <div class=\"card-body\">\r\n          <div>\r\n            <strong>Location:</strong>\r\n            <p>{{user.city}}, {{user.country}}</p>\r\n          </div>\r\n          <div>\r\n            <strong>Age:</strong>\r\n            <p>{{user.age}}</p>\r\n          </div>\r\n          <div>\r\n            <strong>Last Active:</strong>\r\n            <p>{{user.lastActive | timeAgo}}</p>\r\n          </div>\r\n          <div>\r\n            <strong>Member Since:</strong>\r\n            <!--\r\n                We will be using pipes '|' to specify this field is of type date\r\n\r\n                We can use options like date: 'medium' or date: 'mediumDate'\r\n                -->\r\n            <p>{{user.created | date: 'mediumDate'}}</p>\r\n          </div>\r\n        </div>\r\n        <div class=\"card-footer\">\r\n          <!--d-flex will give the <div> a display of flex-->\r\n          <div class=\"btn-group d-flex\">\r\n            <!--w-100 give the button a width of 100-->\r\n            <button class=\"btn btn-primary w-100\" (click)=\"sendLike(user.id)\">Like</button>\r\n            <button class=\"btn btn-success w-100\" (click)=\"selectTab(3)\">Message</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <!--\r\n        On the right hand side, we will have a sort of tab panel where we are going to display\r\n        the users's' photos, description about the user, section for messages, and\r\n        section for interest\r\n\r\n        .member-tabset, .tab-panel class will be targetted using global styles under styles.css\r\n    -->\r\n    <div class=\"col-sm-8\">\r\n      <div class=\"tab-panel\">\r\n        <!--\r\n            Taken from https://valor-software.com/ngx-bootstrap/#/tabs\r\n             As describe on the link https://valor-software.com/ngx-bootstrap/#/tabs#tabs-manual-select,\r\n             we are adding a template reference variable #memberTab to our tab\r\n            set so that we can reference it in our member-detail.component.ts component\r\n            using the @ViewChild decorator\r\n        -->\r\n        <tabset class=\"member-tabset\" #memberTabs>\r\n          <tab heading=\"About {{user.knownAs}}\">\r\n            <h4>Description</h4>\r\n            <p>{{user.introduction}}</p>\r\n            <h4>Looking For</h4>\r\n            <p>{{user.lookingFor}}</p>\r\n          </tab>\r\n          <tab heading=\"Interests\">\r\n            <h4>Interests</h4>\r\n            <p>{{user.interest}}</p>\r\n          </tab>\r\n          <tab heading=\"Photos\">\r\n            <ngx-gallery [options]=\"galleryOptions\" [images]=\"galleryImages\"></ngx-gallery>\r\n          </tab>\r\n          <tab heading=\"Messages\">\r\n            <app-member-messages [recipientId]=\"user.id\"></app-member-messages>\r\n          </tab>\r\n        </tabset>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/members/member-detail/member-detail.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/members/member-detail/member-detail.component.ts ***!
  \******************************************************************/
/*! exports provided: MemberDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MemberDetailComponent", function() { return MemberDetailComponent; });
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../_services/auth.service */ "./src/app/_services/auth.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_services/user.service */ "./src/app/_services/user.service.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_gallery__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-gallery */ "./node_modules/ngx-gallery/bundles/ngx-gallery.umd.js");
/* harmony import */ var ngx_gallery__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(ngx_gallery__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MemberDetailComponent = /** @class */ (function () {
    function MemberDetailComponent(userService, alertify, route, authService) {
        this.userService = userService;
        this.alertify = alertify;
        this.route = route;
        this.authService = authService;
    }
    MemberDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        // We are going to pass the data to the route and retrieve the data from the route
        // resolver itself so that there is no way this component will be loaded without
        // the data available.
        // This will prevent member-detail.component.html from using elvies / ? / save navigation operator
        // to fix the error ERROR TypeError: Cannot read property 'knownAs' of undefined
        // We are now getting the data from the 'route' itself as defined in the routes.ts
        // for the member-detail.component.ts (MemberDetailComponent) which is assigned to the
        // member-detail.resolver.ts (MemberDetailResolver) where success['user'] is the property
        // name that we gave in the routes.ts.
        this.route.data.subscribe(function (success) {
            _this.user = success['user'];
        });
        // We will be subscribing to the query parameters and we have
        // included in the router link in messages.component.html
        // [routerLink]="['/members', messageContainer == 'Outbox' ? message.recipientId : message.senderId]"
        // [queryParams]="{tab: 3}"
        this.route.queryParams.subscribe(function (params) {
            var selectedTab = params['tab'];
            _this.selectTab(selectedTab > 0 ? selectedTab : 0);
        });
        // Configure the gallery options and set how we want it to look
        this.galleryOptions = [
            {
                width: '500px',
                height: '500px',
                imagePercent: 100,
                thumbnailsColumns: 4,
                imageAnimation: ngx_gallery__WEBPACK_IMPORTED_MODULE_5__["NgxGalleryAnimation"].Slide,
                preview: false
            }
        ];
        this.galleryImages = this.getImages();
    };
    MemberDetailComponent.prototype.getImages = function () {
        var imageUrls = [];
        for (var i = 0; i < this.user.photos.length; i++) {
            imageUrls.push({
                small: this.user.photos[i].url,
                medium: this.user.photos[i].url,
                big: this.user.photos[i].url,
                description: this.user.photos[i].description
            });
        }
        return imageUrls;
    };
    MemberDetailComponent.prototype.selectTab = function (tabId) {
        this.memberTabs.tabs[tabId].active = true;
    };
    MemberDetailComponent.prototype.sendLike = function (id) {
        var _this = this;
        this.userService.sendLike(this.authService.decodedToken.nameid, id)
            .subscribe(function () {
            _this.alertify.success('You have liked ' + _this.user.knownAs);
        }, function (error) {
            _this.alertify.error(error);
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('memberTabs'),
        __metadata("design:type", ngx_bootstrap__WEBPACK_IMPORTED_MODULE_6__["TabsetComponent"])
    ], MemberDetailComponent.prototype, "memberTabs", void 0);
    MemberDetailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-member-detail',
            template: __webpack_require__(/*! ./member-detail.component.html */ "./src/app/members/member-detail/member-detail.component.html"),
            styles: [__webpack_require__(/*! ./member-detail.component.css */ "./src/app/members/member-detail/member-detail.component.css")]
        }),
        __metadata("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"], _services_alertify_service__WEBPACK_IMPORTED_MODULE_3__["AlertifyService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"], _services_auth_service__WEBPACK_IMPORTED_MODULE_0__["AuthService"]])
    ], MemberDetailComponent);
    return MemberDetailComponent;
}());



/***/ }),

/***/ "./src/app/members/member-edit/member-edit.component.css":
/*!***************************************************************!*\
  !*** ./src/app/members/member-edit/member-edit.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*Adjust the .img-thumbnail*/\r\n.img-thumbnail {\r\n  margin: 25px;\r\n  width: 85%;\r\n  height: 85%;\r\n}\r\n.card-body {\r\n  /*Take away the padding on top and bottom and set the left and right to 25px*/\r\n  padding: 0 25px;\r\n}\r\n.card-footer {\r\n  /*Add 10px padding top and button and 15px left and right*/\r\n  padding: 10px 15px;\r\n  /*Background #fff to match the color of the rest of the component*/\r\n  background-color: #fff;\r\n  border-top: none;\r\n}\r\n"

/***/ }),

/***/ "./src/app/members/member-edit/member-edit.component.html":
/*!****************************************************************!*\
  !*** ./src/app/members/member-edit/member-edit.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--\r\n      We need to use an elvies/ ? / save navigation operator to fix the error\r\n      ERROR TypeError: Cannot read property 'knownAs' of undefined\r\n      But this is fixed by adding member-detail.resolver.ts\r\n\r\n      {{user?.knownAs}} or\r\n\r\n      <img class=\"card-img-top img-thumbnail\" src=\"{{user?.photoUrl || '../../../assets/user.png'}}\" alt=\"{{user?.knownAs}}\" />\r\n  -->\r\n\r\n\r\n<div class=\"container mt-4\">\r\n  <div class=\"row\">\r\n    <!--Column 1-->\r\n    <div class=\"col-sm-4\">\r\n      <h1>Your Profile</h1>\r\n    </div>\r\n    <!--Column 2 which contains an alert that highlights the changes we have made-->\r\n    <div class=\"col-sm-8\">\r\n      <!--\r\n          We will hide this and we will only show this once the user has changes being made\r\n          and he will exit the page without clicking the save button.\r\n      -->\r\n      <div *ngIf=\"editForm.dirty\" class=\"alert alert-info\">\r\n        <strong>Information:</strong> You have made changes.  Any unsaved changes will be lost!\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"row\">\r\n    <!--\r\n        On the left hand side, we will display some general information about the user\r\n        including the photo\r\n    -->\r\n    <!--Column 1-->\r\n    <div class=\"col-sm-4\">\r\n      <div class=\"card\">\r\n        <img class=\"card-img-top img-thumbnail\" src=\"{{photoUrl || '../../../assets/user.png'}}\" alt=\"{{user.knownAs}}\" />\r\n        <div class=\"card-body\">\r\n          <div>\r\n            <strong>Location:</strong>\r\n            <p>{{user.city}}, {{user.country}}</p>\r\n          </div>\r\n          <div>\r\n            <strong>Age:</strong>\r\n            <p>{{user.age}}</p>\r\n          </div>\r\n          <div>\r\n            <strong>Last Active:</strong>\r\n            <p>{{user.lastActive | timeAgo}}</p>\r\n          </div>\r\n          <div>\r\n            <strong>Member Since:</strong>\r\n            <!--\r\n              We will be using pipes '|' to specify this field is of type date\r\n\r\n              We can use options like date: 'medium' or date: 'mediumDate'\r\n              -->\r\n            <p>{{user.created | date: 'mediumDate'}}</p>\r\n          </div>\r\n        </div>\r\n        <div class=\"card-footer\">\r\n          <!--\r\n              We assign this button to the form with id='editForm' so that\r\n              this will trigger the submit event of the form\r\n          -->\r\n          <button [disabled]=\"!editForm.dirty\" form=\"editForm\"\r\n                  class=\"btn btn-success btn-block\">\r\n            Save Changes\r\n          </button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <!--\r\n        On the right hand side, we will have a sort of tab panel where we are going to display\r\n        the users's' photos, description about the user, section for messages, and\r\n        section for interest\r\n\r\n        .member-tabset, .tab-panel class will be targetted using global styles under styles.css\r\n    -->\r\n    <!--Column 2-->\r\n    <div class=\"col-sm-8\">\r\n      <div class=\"tab-panel\">\r\n        <!--\r\n            Taken from https://valor-software.com/ngx-bootstrap/#/tabs\r\n        -->\r\n        <tabset class=\"member-tabset\">\r\n          <tab heading=\"Edit Profile\">\r\n            <!--\r\n                We gave our form an attribute of 'id' since our 'Save Changes'\r\n                button does not belong to the form and we need to assign it\r\n                to the button element\r\n            -->\r\n            <form #editForm=\"ngForm\" id=\"editForm\" (ngSubmit)=\"updateUser()\">\r\n              <h4>Description</h4>\r\n              <textarea class=\"form-control\" name=\"introduction\" rows=\"6\"\r\n                        [(ngModel)]=\"user.introduction\"></textarea>\r\n              <h4>Looking For</h4>\r\n              <textarea class=\"form-control\" name=\"lookingFor\" rows=\"6\"\r\n                        [(ngModel)]=\"user.lookingFor\"></textarea>\r\n              <h4>Interest</h4>\r\n              <textarea class=\"form-control\" name=\"interest\" rows=\"6\"\r\n                        [(ngModel)]=\"user.interest\"></textarea>\r\n              <h4>Location Details:</h4>\r\n              <div class=\"form-inline\">\r\n                <label for=\"city\">City</label>\r\n                <input class=\"form-control\" type=\"text\" name=\"city\" [(ngModel)]=\"user.city\" />\r\n                <label for=\"country\">Country</label>\r\n                <input class=\"form-control\" type=\"text\" name=\"country\" [(ngModel)]=\"user.country\" />\r\n              </div>\r\n            </form>\r\n          </tab>\r\n          <tab heading=\"Edit Photos\">\r\n            <app-photo-editor [photos]=\"user.photos\"\r\n                              (getMemberPhotoChange)=\"updateMainPhoto($event)\">\r\n            </app-photo-editor>\r\n          </tab>\r\n        </tabset>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/members/member-edit/member-edit.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/members/member-edit/member-edit.component.ts ***!
  \**************************************************************/
/*! exports provided: MemberEditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MemberEditComponent", function() { return MemberEditComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_services/user.service */ "./src/app/_services/user.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../_services/auth.service */ "./src/app/_services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MemberEditComponent = /** @class */ (function () {
    function MemberEditComponent(route, alertify, userService, authService) {
        this.route = route;
        this.alertify = alertify;
        this.userService = userService;
        this.authService = authService;
    }
    // The prevent-unsaved-changes.guard.ts prevents the user from clicking other
    // links within the page while there are still unsaved changes in the edit form.
    // But, Angular does not have access 'outside' the route
    // that is why user still will loose some changes if the user clicks the close
    // button on the browser.  In this case, we need a HostListener.  This will prompt
    // 'Leave site' in the browser if there are still unsaved changes in the edit form.
    // We don't have any control in the pop-up and its text since it is browser-specific.
    MemberEditComponent.prototype.unloadNotification = function ($event) {
        if (this.editForm.dirty) {
            $event.returnValue = true;
        }
    };
    MemberEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        // We are going to pass the data to the route and retrieve the data from the route
        // resolver itself so that there is no way this component will be loaded without
        // the data available.
        // This will prevent member-detail.component.html from using elvies / ? / save navigation operator
        // to fix the error ERROR TypeError: Cannot read property 'knownAs' of undefined
        // We are now getting the data from the 'route' itself as defined in the routes.ts
        // for the member-edit.component.ts (MemberEditComponent) which is assigned to the
        // member-edit.resolver.ts (MemberEditResolver) where success['user'] is the property
        // name that we gave in the routes.ts.
        this.route.data.subscribe(function (success) {
            _this.user = success['user'];
        });
        // We will subscribe to the 'currentPhotoUrl' observable so that we can
        // set the user photo in the nav bar every time other components like
        // the photo-editor.component.ts changes the user main
        // photo.  Remember, this nav.component.ts is not a parent/child component of
        // the photo-editor.component.ts
        this.authService.currentPhotoUrl.subscribe(function (returnUrl) {
            _this.photoUrl = returnUrl;
        });
    };
    MemberEditComponent.prototype.updateUser = function () {
        var _this = this;
        // We are using the authService.decodedToken.nameid to pass the user id
        this.userService.updateUser(this.authService.decodedToken.nameid, this.user)
            .subscribe(function () {
            _this.alertify.success('Profile updated successfully!');
            // Reset the form control.  This means by default, it is marked as pristine, marked as
            // untouched and value is set to null.
            // Add the this.user as the parameter so that it will reset the elements and fill
            // the controls with the bindings coming from the this.user variable
            _this.editForm.reset(_this.user);
        }, function (error) {
            _this.alertify.error(error);
        });
    };
    // This method handles the 'getMemberPhotoChange' event which is emitted from the child
    // component photo-editor.component.ts define in the template member-edit.component.html
    // as (getMemberPhotoChange)="updateMainPhoto($event)"
    MemberEditComponent.prototype.updateMainPhoto = function (photoUrl) {
        this.user.photoUrl = photoUrl;
        this.authService.changeMemberPhoto(photoUrl);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('editForm'),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgForm"])
    ], MemberEditComponent.prototype, "editForm", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('window:beforeunload', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], MemberEditComponent.prototype, "unloadNotification", null);
    MemberEditComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-member-edit',
            template: __webpack_require__(/*! ./member-edit.component.html */ "./src/app/members/member-edit/member-edit.component.html"),
            styles: [__webpack_require__(/*! ./member-edit.component.css */ "./src/app/members/member-edit/member-edit.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], _services_alertify_service__WEBPACK_IMPORTED_MODULE_2__["AlertifyService"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"], _services_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"]])
    ], MemberEditComponent);
    return MemberEditComponent;
}());



/***/ }),

/***/ "./src/app/members/member-list/member-list.component.css":
/*!***************************************************************!*\
  !*** ./src/app/members/member-list/member-list.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/members/member-list/member-list.component.html":
/*!****************************************************************!*\
  !*** ./src/app/members/member-list/member-list.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"text-center mt-3\">\r\n  <h2>Your matches - {{pagination.totalItems}} found</h2>\r\n</div>\r\n\r\n<!--mt for margin top-->\r\n<div class=\"container mt-3\">\r\n\r\n  <!--Make this as an Angular form-->\r\n  <form class=\"form-inline\" #form=\"ngForm\" (ngSubmit)=\"loadUsers()\" novalidate>\r\n    <div class=\"form-group\">\r\n      <label for=\"minAge\">Age From</label>\r\n      <!--\r\n          Since this is now a template form, we will just use [(ngModel)] for\r\n          two-way binding\r\n          -->\r\n      <input type=\"number\"\r\n             class=\"form-control ml-1\"\r\n             style=\"width: 70px\"\r\n             id=\"minAge\"\r\n             name=\"minAge\"\r\n             [(ngModel)]=\"userParams.minAge\"/>\r\n    </div>\r\n\r\n    <div class=\"form-group px-2\">\r\n      <label for=\"maxAge\">Age To</label>\r\n      <input type=\"number\"\r\n             class=\"form-control ml-1\"\r\n             style=\"width: 70px\"\r\n             id=\"maxAge\"\r\n             name=\"maxAge\"\r\n             [(ngModel)]=\"userParams.maxAge\"/>\r\n    </div>\r\n\r\n    <div class=\"form-group px-2\">\r\n      <label for=\"gender\">Show:</label>\r\n      <select class=\"form-control ml-1\"\r\n              style=\"width: 130px\"\r\n              id=\"gender\"\r\n              name=\"gender\"\r\n              [(ngModel)]=\"userParams.gender\">\r\n        <option *ngFor=\"let gender of genderList\" [value]=\"gender.value\">\r\n          {{gender.display}}\r\n        </option>\r\n      </select>\r\n    </div>\r\n\r\n    <button type=\"submit\"\r\n            class=\"btn btn-primary\"\r\n            style=\"margin-left: 10px\">\r\n    Apply Filters\r\n    </button>\r\n    <button type=\"button\"\r\n            class=\"btn btn-info\"\r\n            style=\"margin-left: 10px\"\r\n            (click)=\"resetFilters()\">\r\n    Reset Filters\r\n    </button>\r\n\r\n    <!--We used the class 'col' so that we can use the 'float-right'\r\n        to move the buttons to the right hand side of the page.\r\n        Then we use the 'btn-group' because to group two buttons.\r\n        -->\r\n    <div class=\"col\">\r\n      <div class=\"btn-group float-right\">\r\n        <!--In order to make use of the radio buttons from the\r\n          // Add the NGX buttons module - https://valor-software.com/ngx-bootstrap/#/buttons\r\n          ButtonsModule.forRoot(),\r\n            we will give it the directive 'btnRadio'>\r\n          -->\r\n        <button type=\"submit\"\r\n                name=\"orderBy\"\r\n                class=\"btn btn-primary\"\r\n                btnRadio=\"lastActive\"\r\n                [(ngModel)]=\"userParams.orderBy\">\r\n        Last Active\r\n        </button>\r\n        <button type=\"submit\"\r\n                name=\"orderBy\"\r\n                class=\"btn btn-primary\"\r\n                btnRadio =\"created\"\r\n                [(ngModel)]=\"userParams.orderBy\">\r\n        Newest Members\r\n        </button>\r\n      </div>\r\n    </div>\r\n\r\n  </form>\r\n  <br />\r\n\r\n  <div class=\"row\">\r\n    <!--\r\n        Bootstrap uses 12 columns\r\n        This means on a large screen (lg), columns are made up of 2 grid columns which\r\n        means there would be 6 elements line-up on the page\r\n        In a medium screen (md), columns are made up of 3 grid columns which means\r\n        there would be 4 elements line-up on the page\r\n        In a small screen (sm), columns are made up of 6 grid columns which means\r\n        there would be 2 elements line-up on the page\r\n    -->\r\n    <div *ngFor=\"let user of users\" class=\"col-lg-2 col-md-3 col-sm-6\">\r\n      <!--[ ] square bracket for input and ( ) for output-->\r\n      <app-member-card [user]=\"user\"></app-member-card>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"d-flex justify-content-center\">\r\n  <pagination [boundaryLinks]=\"true\"\r\n              [totalItems]=\"pagination.totalItems\"\r\n              [itemsPerPage]=\"pagination.itemsPerPage\"\r\n              [(ngModel)]=\"pagination.currentPage\"\r\n              (pageChanged)=\"pageChanged($event)\"\r\n              previousText=\"&lsaquo;\" nextText=\"&rsaquo;\" firstText=\"&laquo;\" lastText=\"&raquo;\">\r\n  </pagination>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/members/member-list/member-list.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/members/member-list/member-list.component.ts ***!
  \**************************************************************/
/*! exports provided: MemberListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MemberListComponent", function() { return MemberListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_services/user.service */ "./src/app/_services/user.service.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MemberListComponent = /** @class */ (function () {
    function MemberListComponent(userService, alertify, route) {
        this.userService = userService;
        this.alertify = alertify;
        this.route = route;
        this.user = JSON.parse(localStorage.getItem('user'));
        this.genderList = [{ value: 'male', display: 'Males' }, { value: 'female', display: 'Females' }];
        this.userParams = {};
    }
    MemberListComponent.prototype.ngOnInit = function () {
        var _this = this;
        // We are going to pass the data to the route and retrieve the data from the route
        // resolver itself so that there is no way this component will be loaded without
        // the data available.
        // This will prevent member-list.component.html from using elvies / ? / save navigation operator
        // to fix the error ERROR TypeError: Cannot read property 'knownAs' of undefined
        // We are now getting the data from the 'route' itself as defined in the routes.ts
        // for the member-list.component.ts (MemberListComponent) which is assigned to the
        // member-list.resolver.ts (MemberListResolver) where success['users'] is the property
        // name that we gave in the routes.ts.
        this.route.data.subscribe(function (success) {
            // When we change the return type of the member-list.resolver.ts (MemberListResolver)
            // to Observable<PaginatedResult<User[]>>, we will now use success['users'].result
            // because the users are now in the .result field of the PaginatedResult type object
            _this.users = success['users'].result;
            _this.pagination = success['users'].pagination;
        });
        this.userParams.gender = (this.user.gender === 'female') ? 'male' : ' female';
        this.userParams.minAge = 18;
        this.userParams.maxAge = 99;
        this.userParams.orderBy = 'lastActive';
    };
    // This is for the pagination and is copied from https://valor-software.com/ngx-bootstrap/#/pagination
    MemberListComponent.prototype.pageChanged = function (event) {
        this.pagination.currentPage = event.page;
        this.loadUsers();
    };
    MemberListComponent.prototype.resetFilters = function () {
        this.userParams.gender = (this.user.gender === 'female') ? 'male' : ' female';
        this.userParams.minAge = 18;
        this.userParams.maxAge = 99;
        this.loadUsers();
    };
    MemberListComponent.prototype.loadUsers = function () {
        var _this = this;
        this.userService
            .getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
            .subscribe(function (res) {
            _this.users = res.result;
            _this.pagination = res.pagination;
        }, function (error) {
            _this.alertify.error(error);
        });
    };
    MemberListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-member-list',
            template: __webpack_require__(/*! ./member-list.component.html */ "./src/app/members/member-list/member-list.component.html"),
            styles: [__webpack_require__(/*! ./member-list.component.css */ "./src/app/members/member-list/member-list.component.css")]
        }),
        __metadata("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"], _services_alertify_service__WEBPACK_IMPORTED_MODULE_2__["AlertifyService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], MemberListComponent);
    return MemberListComponent;
}());



/***/ }),

/***/ "./src/app/members/member-messages/member-messages.component.css":
/*!***********************************************************************!*\
  !*** ./src/app/members/member-messages/member-messages.component.css ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".card {\r\n    border: none;\r\n}\r\n\r\n.chat {\r\n    list-style: none;\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n\r\n.chat li {\r\n    margin-bottom: 10px;\r\n    padding-bottom: 10px;\r\n    border-bottom: 1px dotted #B3A9A9;\r\n}\r\n\r\n.rounded-circle {\r\n    height: 50px;\r\n    width: 50px;\r\n}\r\n\r\n/*This will make the chat area fixed with scroll bar*/\r\n\r\n.card-body {\r\n    overflow-y: scroll;\r\n    height: 400px;\r\n}"

/***/ }),

/***/ "./src/app/members/member-messages/member-messages.component.html":
/*!************************************************************************!*\
  !*** ./src/app/members/member-messages/member-messages.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\n  <div class=\"card-body\">\n    <div *ngIf=\"messages?.length === 0\">\n      <p>No messages yet... say 'Hi' by using the message box below</p>\n    </div>\n\n    <ul class=\"chat\">\n      <li *ngFor=\"let message of messages\">\n        <!-- to them -->\n        <div *ngIf=\"message.senderId == recipientId\">\n          <span class=\"chat-img float-left\">\n            <img src={{message.senderPhotoUrl}} alt={{message.senderKnownAs}} \n            class=\"rounded-circle\">\n          </span>\n          <div class=\"chat-body\">\n            <div class=\"header\">\n              <strong class=\"primary-font\">{{message.senderKnownAs}}</strong>\n              <small class=\"text-muted float-right\">\n                <span class=\"fa fa-clock-o\"> {{message.messageSent | timeAgo}}</span>\n              </small>\n            </div>\n            <p>{{message.content}}</p>\n          </div>\n        </div>\n\n        <!-- to me -->\n        <div *ngIf=\"message.senderId != recipientId\">\n          <span class=\"chat-img float-right\">\n            <img src={{message.senderPhotoUrl}} alt={{message.senderKnownAs}} \n            class=\"rounded-circle\">\n          </span>\n          <div class=\"chat-body\">\n            <div class=\"header\">\n              <small class=\"text-muted\">\n                <span class=\"fa fa-clock-o\"> {{message.messageSent | timeAgo}}</span>\n                <span *ngIf=\"!message.isRead\" class=\"text-danger\"> (Unread)</span>\n                <span *ngIf=\"message.isRead\" class=\"text-success\"> (Read {{message.dateRead | timeAgo}})</span>\n              </small>\n              <strong class=\"primary-font float-right\">{{message.senderKnownAs}}</strong>              \n            </div>\n          </div>\n          <p>{{message.content}}</p>\n        </div>\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"card-footer\">\n    <!--\n      We will add a template reference variable called #messageForm which is of type\n      'ngForm'.  We are adding a ngSubmit method which checks first if the form is\n      valid, and if it is, then we will call the sendMessage() method\n    -->\n    <form #messageForm=\"ngForm\" (ngSubmit)=\"messageForm.valid && sendMessage()\">\n      <div class=\"input-group\">\n        <input type=\"text\" \n          [(ngModel)]=\"newMessage.content\"\n          name=\"content\"\n          required\n          class=\"form-control input-sm\" \n          placeholder=\"Send a private message\">\n        <div class=\"input-group-append\">\n          <button class=\"btn btn-primary\" [disabled]=\"!messageForm.valid\">Send</button>\n        </div>\n      </div>\n    </form>\n  </div>\n\n</div>"

/***/ }),

/***/ "./src/app/members/member-messages/member-messages.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/members/member-messages/member-messages.component.ts ***!
  \**********************************************************************/
/*! exports provided: MemberMessagesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MemberMessagesComponent", function() { return MemberMessagesComponent; });
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../_services/auth.service */ "./src/app/_services/auth.service.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../_services/user.service */ "./src/app/_services/user.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MemberMessagesComponent = /** @class */ (function () {
    function MemberMessagesComponent(userService, authService, alertify) {
        this.userService = userService;
        this.authService = authService;
        this.alertify = alertify;
        this.newMessage = {};
    }
    MemberMessagesComponent.prototype.ngOnInit = function () {
        this.loadMessages();
    };
    MemberMessagesComponent.prototype.loadMessages = function () {
        var _this = this;
        // We are getting the current user id and we are adding the plus ' + ' operator
        // so that we can convert the 'nameid' to number.
        var currentUserId = +this.authService.decodedToken.nameid;
        this.userService.getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (messages) {
            for (var i = 0; i < messages.length; i++) {
                // We are checking if the message is still 'unread' and the recipient id
                // is equal to the current user id
                if (messages[i].isRead === false && messages[i].recipientId === currentUserId) {
                    _this.userService.markAsRead(currentUserId, messages[i].id);
                }
            }
        }))
            .subscribe(function (messages) {
            _this.messages = messages;
        }, function (error) {
            _this.alertify.error(error);
        });
    };
    MemberMessagesComponent.prototype.sendMessage = function () {
        var _this = this;
        this.newMessage.recipientId = this.recipientId;
        this.userService.sendMessage(this.authService.decodedToken.nameid, this.newMessage)
            .subscribe(function (message) {
            // We need to the new message to the messages array.  We want to add it to the
            // start of the array so we will use 'unshift' rather than 'push'
            _this.messages.unshift(message);
            _this.newMessage.content = '';
        }, function (error) {
            _this.alertify.error(error);
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"])(),
        __metadata("design:type", Number)
    ], MemberMessagesComponent.prototype, "recipientId", void 0);
    MemberMessagesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-member-messages',
            template: __webpack_require__(/*! ./member-messages.component.html */ "./src/app/members/member-messages/member-messages.component.html"),
            styles: [__webpack_require__(/*! ./member-messages.component.css */ "./src/app/members/member-messages/member-messages.component.css")]
        }),
        __metadata("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"], _services_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"],
            _services_alertify_service__WEBPACK_IMPORTED_MODULE_0__["AlertifyService"]])
    ], MemberMessagesComponent);
    return MemberMessagesComponent;
}());



/***/ }),

/***/ "./src/app/members/photo-editor/photo-editor.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/members/photo-editor/photo-editor.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "img.img-thumbnail{\r\n  height: 100px;\r\n  min-width: 100px !important;\r\n  margin-bottom: 2px;\r\n}\r\n\r\n.nv-file-over{\r\n  border: dotted 3px red;\r\n}\r\n\r\ninput[type=file]{\r\n  color: transparent;\r\n}\r\n"

/***/ }),

/***/ "./src/app/members/photo-editor/photo-editor.component.html":
/*!******************************************************************!*\
  !*** ./src/app/members/photo-editor/photo-editor.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <div class=\"col-sm-2\" *ngFor=\"let photo of photos\">\r\n    <!--p-1 stands for padding-->\r\n    <img src=\"{{photo.url}}\" class=\"img-thumbnail p-1\" alt=\"\" />\r\n    <div class=\"text-center\">\r\n      <!--Add a class to the element if it is a main photo-->\r\n      <button type=\"button\" class=\"btn btn-sm mr-1\"\r\n              (click)=\"setMainPhoto(photo)\"\r\n              [ngClass]=\"photo.isMain ? 'btn-success active' : 'btn-secondary'\"\r\n              [disabled]=\"photo.isMain\">\r\n        Main\r\n      </button>\r\n      <button type=\"button\" class=\"btn btn-sm btn-danger\"\r\n              (click)=\"deletePhoto(photo.id)\"\r\n              [disabled]=\"photo.isMain\">\r\n        <i class=\"fa fa-trash-o\"></i>\r\n      </button>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<!--Copied from https://valor-software.com/ng2-file-upload/-->\r\n<div class=\"row mt-3\">\r\n\r\n  <div class=\"col-md-3\">\r\n\r\n    <h3>Add Photos</h3>\r\n\r\n    <!--\r\n    The class .well does not exist on Bootstrap 4\r\n    and only exists on Bootstrap 3\r\n\r\n    [uploader]=\"uploader\"\r\n    class=\"well my-drop-zone\">\r\n\r\n      https://www.udemy.com/build-an-app-with-aspnet-core-and-angular-from-scratch/learn/v4/t/lecture/8714914?start=15\r\n  -->\r\n    <div ng2FileDrop\r\n         [ngClass]=\"{'nv-file-over': hasBaseDropZoneOver}\"\r\n         (fileOver)=\"fileOverBase($event)\"\r\n         [uploader]=\"uploader\"\r\n         class=\"card bg-faded p-3 text-center mb-3 my-drop-zone\">\r\n        <i class=\"fa fa-upload fa-3x\"></i>\r\n      Drop Photos Here\r\n    </div>\r\n\r\n    Multiple\r\n    <input type=\"file\" ng2FileSelect [uploader]=\"uploader\" multiple /><br />\r\n\r\n    Single\r\n    <input type=\"file\" ng2FileSelect [uploader]=\"uploader\" />\r\n  </div>\r\n\r\n  <div class=\"col-md-9\" style=\"margin-bottom: 40px\" *ngIf=\"uploader?.queue?.length\">\r\n\r\n    <h3>Upload queue</h3>\r\n    <p>Queue length: {{ uploader?.queue?.length }}</p>\r\n\r\n    <table class=\"table\">\r\n      <thead>\r\n        <tr>\r\n          <th width=\"50%\">Name</th>\r\n          <th>Size</th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        <tr *ngFor=\"let item of uploader.queue\">\r\n          <td><strong>{{ item?.file?.name }}</strong></td>\r\n          <td *ngIf=\"uploader.options.isHTML5\" nowrap>{{ item?.file?.size/1024/1024 | number:'.2' }} MB</td>          \r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n\r\n    <div>\r\n      <div>\r\n        Queue progress:\r\n        <div class=\"progress mb-4\"> \r\n          <div class=\"progress-bar\" role=\"progressbar\" [ngStyle]=\"{ 'width': uploader.progress + '%' }\"></div>\r\n        </div>\r\n      </div>\r\n      <button type=\"button\" class=\"btn btn-success btn-s\"\r\n              (click)=\"uploader.uploadAll()\" [disabled]=\"!uploader.getNotUploadedItems().length\">\r\n        <!--\r\n      The class .glyphicon does not exist on Bootstrap 4\r\n      and only exists on Boostrap 3\r\n\r\n    <span class=\"glyphicon glyphicon-upload\">\r\n      https://www.udemy.com/build-an-app-with-aspnet-core-and-angular-from-scratch/learn/v4/t/lecture/8714914?start=420\r\n  -->\r\n        <span class=\"fa fa-upload\"></span> Upload\r\n      </button>\r\n      <button type=\"button\" class=\"btn btn-warning btn-s\"\r\n              (click)=\"uploader.cancelAll()\" [disabled]=\"!uploader.isUploading\">\r\n        <span class=\"fa fa-ban\"></span> Cancel\r\n      </button>\r\n      <button type=\"button\" class=\"btn btn-danger btn-s\"\r\n              (click)=\"uploader.clearQueue()\" [disabled]=\"!uploader.queue.length\">\r\n        <span class=\"fa fa-trash\"></span> Remove\r\n      </button>\r\n    </div>\r\n\r\n  </div>\r\n\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/members/photo-editor/photo-editor.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/members/photo-editor/photo-editor.component.ts ***!
  \****************************************************************/
/*! exports provided: PhotoEditorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PhotoEditorComponent", function() { return PhotoEditorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ng2_file_upload__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ng2-file-upload */ "./node_modules/ng2-file-upload/index.js");
/* harmony import */ var ng2_file_upload__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ng2_file_upload__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_services/auth.service */ "./src/app/_services/auth.service.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_services/user.service */ "./src/app/_services/user.service.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






// This will be a child component of our member-edit.component.ts
// And on of the things that we will be bringing in from our member-edit.component.ts
// is a 'User' and the 'User' has an array of photos[].
var PhotoEditorComponent = /** @class */ (function () {
    function PhotoEditorComponent(authService, userService, alertify) {
        this.authService = authService;
        this.userService = userService;
        this.alertify = alertify;
        // We will update our parent member-edit.component.ts with changes from this
        // child component
        this.getMemberPhotoChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.hasBaseDropZoneOver = false;
        this.baseUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl;
    }
    PhotoEditorComponent.prototype.ngOnInit = function () {
        this.initializeUploader();
    };
    PhotoEditorComponent.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    PhotoEditorComponent.prototype.initializeUploader = function () {
        var _this = this;
        this.uploader = new ng2_file_upload__WEBPACK_IMPORTED_MODULE_1__["FileUploader"]({
            // This is pointing to the API \DatingApp.API\Controllers\PhotosController.cs
            // where the route specified is 'api/users/{userId}/photos'
            url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
            // We also need to authenticate so we need to pass the auth token
            authToken: 'Bearer ' + localStorage.getItem('token'),
            isHTML5: true,
            allowedFileType: ['image'],
            // After the photo has been successfully uploaded, we want to remove it from
            // the upload queue
            removeAfterUpload: true,
            // We want our users to click the button before we will upload
            autoUpload: false,
            // Setting the max file size to 10MB
            maxFileSize: 10 * 1024 * 1024
        });
        // Fix the ng2-file-uploader issue: Fail to load 'http://localhost:500/api/user/1/photos:
        // Response to preflight request doesn't pass access control check: The value of the
        // Access-Control-Allow-Origin header in the response must not be a the wildcard '*'
        // when the request credential mode is 'include'.  Origin 'http://localhost:4200' is
        // therefore not allowed access. The credentials mode of requests initiated by the XMLHttpRequest
        // is controlled by the withCredentials attribute.
        // We are going to extend our ng2-file-uploader that our file is not going with
        // credentials
        this.uploader.onAfterAddingFile = function (file) { file.withCredentials = false; };
        // Once the file has been uploaded, this method will give us an option
        // to do something.  And what we are going to do in this case is with the response we
        // get back from our API, we can use the response:string parameter of the onSuccessItem
        // method to get the photo properties like Id, Uri, etc so that we can display it
        // directly to the browser once the upload is successful.
        this.uploader.onSuccessItem = function (item, response, status, headers) {
            if (response) {
                var res = JSON.parse(response);
                // Building up an photo object from the response
                var photo = {
                    id: res.id,
                    url: res.url,
                    dateAdded: res.dateAdded,
                    description: res.description,
                    isMain: res.isMain
                };
                // Add the newly uploaded photo to the photos array
                _this.photos.push(photo);
                // In our API PhotosController.AddPhotoForUser, we are checking to see if
                // the user has already a main photo.  If there is no main photo, for example
                // it is the first photo uploaded by the user, then the API will set the
                // newly uploaded photo as the main photo.  So, if the newly uploaded photo
                // is successful, then we can check if it is the main photo
                if (photo.isMain) {
                    // We will then emit the photo URL to be consumed by the parent member-edit.component.ts
                    // or we can also say this.authService.changeMemberPhoto(photo.url) although I placed
                    // this on member-edit.component.ts -> updateMainPhoto(photoUrl)
                    _this.getMemberPhotoChange.emit(photo.url);
                    // We will save the new photo url in the local storage so that the same main
                    // photo will be shown even when the user refreshes the page, we are finishing
                    // the 'user' information in the local storage in the app.component.ts -> ngOnInit()
                    _this.authService.currentUser.photoUrl = photo.url;
                    localStorage.setItem('user', JSON.stringify(_this.authService.currentUser));
                }
            }
        };
    };
    PhotoEditorComponent.prototype.setMainPhoto = function (photo) {
        var _this = this;
        this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id)
            .subscribe(function () {
            // We need to find out which one is the current photo and set it to false
            // and we will set the current photo selected to be the main photo. In that way
            // we are going to instantly reflect what is going on when the user sets the
            // main photo.
            // We need to access the current main photo by using the array filter method
            // to filter out photos and assign the main photo to the currentMain field
            _this.currentMain = _this.photos.filter(function (f) { return f.isMain === true; })[0];
            _this.currentMain.isMain = false;
            photo.isMain = true;
            // We will then emit the photo URL to be consumed by the parent member-edit.component.ts
            // or we can also say this.authService.changeMemberPhoto(photo.url) although I placed
            // this on member-edit.component.ts -> updateMainPhoto(photoUrl)
            _this.getMemberPhotoChange.emit(photo.url);
            // We will save the new photo url in the local storage so that the same main
            // photo will be shown even when the user refreshes the page, we are finishing
            // the 'user' information in the local storage in the app.component.ts -> ngOnInit()
            _this.authService.currentUser.photoUrl = photo.url;
            localStorage.setItem('user', JSON.stringify(_this.authService.currentUser));
        }, function (error) {
            _this.alertify.error(error);
        });
    };
    PhotoEditorComponent.prototype.deletePhoto = function (id) {
        var _this = this;
        // The second parameter of the this.alertify.confirm method is an 'OK' callback
        this.alertify.confirm('Are you sure you want to delete this photo?', function () {
            _this.userService.deletePhoto(_this.authService.decodedToken.nameid, id)
                .subscribe(function () {
                // We will now remove the delete photo from our photos array
                // First we need to find the index of the photo we are deleting and then
                // next is indicate how many are we deleting
                _this.photos.splice(_this.photos.findIndex(function (f) { return f.id === id; }), 1);
                _this.alertify.success('Photo has been successfully deleted.');
            }, function () {
                _this.alertify.error('Failed to delete the photo.');
            });
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], PhotoEditorComponent.prototype, "photos", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], PhotoEditorComponent.prototype, "getMemberPhotoChange", void 0);
    PhotoEditorComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-photo-editor',
            template: __webpack_require__(/*! ./photo-editor.component.html */ "./src/app/members/photo-editor/photo-editor.component.html"),
            styles: [__webpack_require__(/*! ./photo-editor.component.css */ "./src/app/members/photo-editor/photo-editor.component.css")]
        }),
        __metadata("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"], _services_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"],
            _services_alertify_service__WEBPACK_IMPORTED_MODULE_5__["AlertifyService"]])
    ], PhotoEditorComponent);
    return PhotoEditorComponent;
}());



/***/ }),

/***/ "./src/app/messages/messages.component.css":
/*!*************************************************!*\
  !*** ./src/app/messages/messages.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\r\n    margin-top: 15px;\r\n}\r\n\r\n.img-circle {\r\n    max-height: 50px;\r\n}\r\n\r\ntd {\r\n    vertical-align: middle;\r\n}"

/***/ }),

/***/ "./src/app/messages/messages.component.html":
/*!**************************************************!*\
  !*** ./src/app/messages/messages.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container mt-5\">\n  <div class=\"row\">\n    <div class=\"btn-group\">\n      <button class=\"btn btn-primary\" \n        [(ngModel)]=\"messageContainer\"\n        btnRadio=\"Unread\" \n        (click)=\"loadMessages()\">\n        <i class=\"fa fa-envelope\"></i>\n        UnRead\n      </button>\n      <button class=\"btn btn-primary\"\n        [(ngModel)]=\"messageContainer\"\n        btnRadio=\"Inbox\"\n        (click)=\"loadMessages()\">\n        <i class=\"fa fa-paper-open\"></i>\n        Inbox\n      </button>\n      <button class=\"btn btn-primary\"\n        [(ngModel)]=\"messageContainer\"\n        btnRadio=\"Outbox\"\n        (click)=\"loadMessages()\">\n        <i class=\"fa fa-paper-plane\"></i>\n        Outbox\n      </button>\n    </div>\n  </div>\n\n  <div class=\"row\" *ngIf=\"messages.length == 0\">\n    <h3>No messages</h3>\n  </div>\n\n  <div class=\"row\" *ngIf=\"messages.length > 0\">\n    <table class=\"table table-hover\" style=\"cursor: pointer\">\n      <tr>\n        <th style=\"width: 40%\">Message</th>\n        <th style=\"width: 20%\">From / To</th>\n        <th style=\"width: 20%\">Sent / Received</th>\n        <th style=\"width: 20%\"></th>\n      </tr>\n      <!--\n        Each table row is clickable with router link in which, if the \n        messageContainer == 'Outbox', then it will send them to the \n        /members/<recipientId>\n          We are adding [queryParams]=\"{tab: 3}\" so that our URL will \n          have a query string and will look like http://localhost:4200/members/14?tab=3\n          We need this query string so that we can redirect the tab focus\n          to the Messages tab when we click each message row\n      -->\n      <tr *ngFor=\"let message of messages\" \n        [routerLink]=\"['/members', messageContainer == 'Outbox' ? message.recipientId : message.senderId]\"\n        [queryParams]=\"{tab: 3}\">\n        <td>{{message.content}}</td>\n        <td>\n          <div *ngIf=\"messageContainer != 'Outbox'\">\n            <img src={{message?.senderPhotoUrl}} class=\"img-circle rounded-circle mr-1\">\n            <strong>{{message.senderKnownAs}}</strong>\n          </div>\n          <div *ngIf=\"messageContainer == 'Outbox'\">\n            <img src={{message?.recipientPhotoUrl}} class=\"img-circle rounded-circle mr-1\">\n            <strong>{{message.recipientKnownAs}}</strong>\n          </div>\n        </td>\n        <td>{{message.messageSent | timeAgo}}</td>\n        <td>\n          <!--\n            For this table row, we are adding a router link\n            [routerLink]=\"['/members', messageContainer == 'Outbox' ? message.recipientId : message.senderId]\"\n            which redirect us to the member page if we do a click event to \n            any object in this row.  But, we don't want to do that in the delete flow.\n            So, we will add another click event which is the (click)=\"$event.stopPropagation()\"\n          -->\n          <button class=\"btn btn-danger\" \n            (click)=\"$event.stopPropagation()\" \n            (click)=\"deleteMessage(message.id)\">\n            Delete\n          </button>\n        </td>\n      </tr>      \n    </table>\n  </div>\n</div>\n\n<div class=\"d-flex justify-content-center\">\n  <pagination [boundaryLinks]=\"true\"\n              [totalItems]=\"pagination.totalItems\"\n              [itemsPerPage]=\"pagination.itemsPerPage\"\n              [(ngModel)]=\"pagination.currentPage\"\n              (pageChanged)=\"pageChanged($event)\"\n              previousText=\"&lsaquo;\" nextText=\"&rsaquo;\" firstText=\"&laquo;\" lastText=\"&raquo;\">\n  </pagination>\n</div>"

/***/ }),

/***/ "./src/app/messages/messages.component.ts":
/*!************************************************!*\
  !*** ./src/app/messages/messages.component.ts ***!
  \************************************************/
/*! exports provided: MessagesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessagesComponent", function() { return MessagesComponent; });
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../_services/auth.service */ "./src/app/_services/auth.service.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../_services/user.service */ "./src/app/_services/user.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MessagesComponent = /** @class */ (function () {
    function MessagesComponent(userService, authService, route, alertify) {
        this.userService = userService;
        this.authService = authService;
        this.route = route;
        this.alertify = alertify;
        this.messageContainer = 'Unread';
    }
    MessagesComponent.prototype.ngOnInit = function () {
        var _this = this;
        // We are going to pass the data to the route and retrieve the data from the route
        // resolver itself so that there is no way this component will be loaded without
        // the data available.
        // This will prevent messages.component.html from using elvies / ? / safe navigation operator
        // to fix the error ERROR TypeError: Cannot read property 'knownAs' of undefined
        // We are now getting the data from the 'route' itself as defined in the routes.ts
        // for the messages.component.ts (MessagesComponent) which is assigned to the
        // messages.resolver.ts (MessagesResolver) where success['messages'] is the property
        // name that we gave in the routes.ts.
        this.route.data.subscribe(function (success) {
            _this.messages = success['messages'].result;
            _this.pagination = success['messages'].pagination;
        });
    };
    // This is for the pagination and is copied from https://valor-software.com/ngx-bootstrap/#/pagination
    MessagesComponent.prototype.pageChanged = function (event) {
        this.pagination.currentPage = event.page;
        this.loadMessages();
    };
    MessagesComponent.prototype.loadMessages = function () {
        var _this = this;
        this.userService.getMessages(this.authService.decodedToken.nameid, this.pagination.currentPage, this.pagination.itemsPerPage, this.messageContainer)
            .subscribe(function (res) {
            _this.messages = res.result;
            _this.pagination = res.pagination;
        }, function (error) {
            _this.alertify.error(error);
        });
    };
    MessagesComponent.prototype.deleteMessage = function (id) {
        var _this = this;
        // We are giving the user to confirm if they will proceed on deleting the
        // message or not
        // We added the callback function () => {}
        this.alertify.confirm('Are you sure you want to delete this message', function () {
            // We added an anonymous function () => {} since we are not getting anything back
            // from this function
            _this.userService.deleteMessage(id, _this.authService.decodedToken.nameid).subscribe(function () {
                // We need to remove the message immediately from the browser view that
                // the user gonna see.  That means we are going to use the javascript 'splice'
                // method to do so.
                // We will find the index of the messages array and we will delete only 1 message
                _this.messages.splice(_this.messages.findIndex(function (m) { return m.id === id; }), 1);
                _this.alertify.success('Message has been deleted.');
            }, function () {
                _this.alertify.error('Failed to delete the message.');
            });
        });
    };
    MessagesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["Component"])({
            selector: 'app-messages',
            template: __webpack_require__(/*! ./messages.component.html */ "./src/app/messages/messages.component.html"),
            styles: [__webpack_require__(/*! ./messages.component.css */ "./src/app/messages/messages.component.css")]
        }),
        __metadata("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"], _services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], _services_alertify_service__WEBPACK_IMPORTED_MODULE_0__["AlertifyService"]])
    ], MessagesComponent);
    return MessagesComponent;
}());



/***/ }),

/***/ "./src/app/nav/nav.component.css":
/*!***************************************!*\
  !*** ./src/app/nav/nav.component.css ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".dropdown-toggle, .dropdown-item{\r\n  cursor: pointer;\r\n}\r\n\r\nimg{\r\n  max-height: 50px;\r\n  border: 2px solid white;\r\n  display: inline;\r\n}\r\n"

/***/ }),

/***/ "./src/app/nav/nav.component.html":
/*!****************************************!*\
  !*** ./src/app/nav/nav.component.html ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand-md navbar-dark bg-primary\">\r\n\r\n  <div class=\"container\">\r\n\r\n    <a class=\"navbar-brand\" [routerLink]=\"['/home']\">Dating App</a>\r\n\r\n    <ul *ngIf=\"loggedIn()\" class=\"navbar-nav mr-auto\">\r\n      <!--The routerLinkActive=\"active\" makes use of the .active bootstrap class-->\r\n      <li class=\"nav-item active\" routerLinkActive=\"active\">\r\n        <!--Add a router link based on the routes specified in routes.ts-->\r\n        <a class=\"nav-link\" [routerLink]=\"['/members']\">Matches</a>\r\n      </li>\r\n      <li class=\"nav-item\" routerLinkActive=\"active\">\r\n        <a class=\"nav-link\" [routerLink]=\"['/list']\">Lists</a>\r\n      </li>\r\n      <li class=\"nav-item\" routerLinkActive=\"active\">\r\n        <a class=\"nav-link\" [routerLink]=\"['/messages']\">Messages</a>\r\n      </li>\r\n    </ul>\r\n\r\n    <!--\r\n      Copied from https://getbootstrap.com/docs/4.1/components/dropdowns/\r\n\r\n      We will use a structural directive *ngIf to determine if the user has loggedIn().  This will change the DOM.\r\n\r\n      We also specified the 'dropdown', 'dropdownToggle', and '*dropdownMenu'\r\n      directive from ngx-boostrap package\r\n  -->\r\n    <div *ngIf=\"loggedIn()\" class=\"dropdown\" dropdown>\r\n      <span class=\"mr-1\">\r\n        <img src=\"{{photoUrl || '../../assets/user.png'}}\" />\r\n      </span>\r\n      <a class=\"dropdown-toggle text-light\"\r\n         dropdownToggle (click)=\"false\">\r\n        <!--Add a pipe titlecase which converts the output into title case-->\r\n        Welcome {{authService.decodedToken?.unique_name | titlecase}}\r\n      </a>\r\n\r\n      <div class=\"dropdown-menu mt-3\" *dropdownMenu>\r\n        <a class=\"dropdown-item\" [routerLink]=\"['/member/edit']\">\r\n          <i class=\"fa fa-user\"></i> Edit Profile\r\n        </a>\r\n        <div class=\"dropdown-divider\"></div>\r\n        <!--If we remove the href=\"\", the cursor will be change as text cursor instead of pointer-->\r\n        <a class=\"dropdown-item\" (click)=\"logOut()\">\r\n          <i class=\"fa fa-sign-out\"></i> Logout\r\n        </a>\r\n      </div>\r\n    </div>\r\n\r\n    <!--\r\n        We will convert this html form into Angular form.  There are two types of form in Angular: template and reactive.\r\n        For now, we will use template\r\n        We will create a \"template reference variable\" by using the pound/hash sign. Ex. #loginForm, #modelUsername,\r\n        #modelPassword. The character ' - ' is not allowed. Ex. model-username.\r\n        We use #modelUsername or #modelPassword if we need to get its states.  We can just\r\n        remove that if we don't need to refer the input fields\r\n        Ex:\r\n          Username Valid: {{modelUsername.valid}}\r\n          Username Touched: {{modelUsername.touched}}\r\n          Username Dirty: {{modelUsername.dirty}}\r\n          Username Values: {{modelUsername.value | json}}\r\n        We also need a two-way binding from our template (html) to our component (ts).  And in order to do that, we need\r\n        to use a directive called the ngModel directive [(ngModel)]=\"binding\".\r\n        We also need a way for the users to submit the form, so for this, we need the (ngSubmit) event.  We will add it on\r\n        the form level instead of the button.\r\n  -->\r\n    <form *ngIf=\"!loggedIn()\" #loginForm=\"ngForm\" class=\"form-inline my-2 my-lg-0\" (ngSubmit)=\"login()\">\r\n      <input class=\"form-control mr-sm-2\" type=\"text\" name=\"input-username\"\r\n             placeholder=\"Username\" required [(ngModel)]=\"model.username\" #modelUsername=\"ngModel\" />\r\n      <input class=\"form-control mr-sm-2\" type=\"password\" name=\"input-password\"\r\n             placeholder=\"Password\" required [(ngModel)]=\"model.password\" #modelPassword=\"ngModel\" />\r\n      <!--\r\n      We will make the button disabled once the form is not valid by getting the loinForm.valid value\r\n    -->\r\n      <button [disabled]=\"!loginForm.valid\" class=\"btn btn-success my-2 my-sm-0\" type=\"submit\">Login</button>\r\n    </form>\r\n\r\n  </div> \r\n\r\n</nav>\r\n\r\n<!--\r\n<pre>\r\n  Form Valid: {{loginForm.valid}}\r\n  Form Touched: {{loginForm.touched}}\r\n  Form Dirty: {{loginForm.dirty}}\r\n  Form Values: {{loginForm.value | json}}\r\n  Username Valid: {{modelUsername.valid}}\r\n  Username Touched: {{modelUsername.touched}}\r\n  Username Dirty: {{modelUsername.dirty}\r\n  Username Values: {{modelUsername.value | json}}\r\n  Password Valid: {{modelPassword.valid}}\r\n  Password Touched: {{modelPassword.touched}}\r\n  Password Dirty: {{modelPassword.dirty}}\r\n  Password Values: {{modelPassword.value | json}}\r\n</pre>\r\n-->\r\n"

/***/ }),

/***/ "./src/app/nav/nav.component.ts":
/*!**************************************!*\
  !*** ./src/app/nav/nav.component.ts ***!
  \**************************************/
/*! exports provided: NavComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavComponent", function() { return NavComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_services/auth.service */ "./src/app/_services/auth.service.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// Provides the navigation and url manipulation capabilities

var NavComponent = /** @class */ (function () {
    function NavComponent(authService, alertify, router) {
        this.authService = authService;
        this.alertify = alertify;
        this.router = router;
        this.model = {};
    }
    NavComponent.prototype.ngOnInit = function () {
        var _this = this;
        // We will subscribe to the 'currentPhotoUrl' observable so that we can
        // set the user photo in the nav bar every time other components like
        // the photo-editor.component.ts changes the user main
        // photo.  Remember, this nav.component.ts is not a parent/child component of
        // the photo-editor.component.ts
        this.authService.currentPhotoUrl.subscribe(function (returnUrl) {
            _this.photoUrl = returnUrl;
        });
    };
    NavComponent.prototype.login = function () {
        var _this = this;
        // We will subscribe to the login method which is an observable
        // and we need to do on the next, and error options
        this.authService.login(this.model).subscribe(function (success) {
            _this.alertify.success('Logged in successfully');
        }, function (error) {
            _this.alertify.error(error);
        }, function () {
            // We will use an anonymous function for the 'complete' 3rd parameter of the
            // subscribe method.
            // We will us this to add additional option for our router though we can also
            // achieve the same effect when we will place this code under 'successs' 1st parameter
            // We will be routed to the /members page as defined in the routes.ts
            _this.router.navigate(['/members']);
        });
    };
    NavComponent.prototype.loggedIn = function () {
        //const token = localStorage.getItem('token');
        // We will use a third party library called angular-jwt to manage the
        // token we stored in the localStorage
        // What we CANNOT DO is to validate the token since the key to validate the
        // token is on the server \DatingApp.API\appsettings.json and we don't have
        // access to that in the client application and we don't really need to do that
        // in our client application since the client application is compiled into
        // javascript and since javascript is run on the client-side, we don't want
        // end-users to have access to the validation key
        // Confusing names: angular 1 is renamed as angularjs
        // and angular 2 is renamed as angular
        // @auth0/angular-jwt: https://github.com/auth0/angular2-jwt and go for
        // version 2.0.0
        // If there is a value in this token, then it will return true else it will return false
        //return !!token;
        return this.authService.loggedIn();
    };
    NavComponent.prototype.logOut = function () {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.authService.decodedToken = null;
        this.authService.currentUser = null;
        this.alertify.message('Logged out');
        this.router.navigate(['/home']);
    };
    NavComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-nav',
            template: __webpack_require__(/*! ./nav.component.html */ "./src/app/nav/nav.component.html"),
            styles: [__webpack_require__(/*! ./nav.component.css */ "./src/app/nav/nav.component.css")]
        }),
        __metadata("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"],
            _services_alertify_service__WEBPACK_IMPORTED_MODULE_2__["AlertifyService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], NavComponent);
    return NavComponent;
}());



/***/ }),

/***/ "./src/app/register/register.component.css":
/*!*************************************************!*\
  !*** ./src/app/register/register.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/register/register.component.html":
/*!**************************************************!*\
  !*** ./src/app/register/register.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--\r\n    In our nav.component.html, we are using template reference variable.\r\n    For our register.component.html, we will be using reactive forms by\r\n    specifying [formGroup]=\"registerForm\" where \"registerForm\" is the property\r\n    we have created in register.component.ts\r\n-->\r\n<form [formGroup]=\"registerForm\" (ngSubmit)=\"register()\">\r\n  <h2 class=\"text-center text-primary\">Sign Up</h2>\r\n  <hr>\r\n\r\n  <!--Gender-->\r\n  <div class=\"form-group\">\r\n    <label class=\"control-label\" style=\"margin-right:10px\">I am a: </label>\r\n    <label class=\"radio-inline\">\r\n      <input class=\"mr-3\" type=\"radio\" value=\"male\" formControlName=\"gender\">Male\r\n    </label>\r\n    <label class=\"radio-inline ml-3\">\r\n      <input class=\"mr-3\" type=\"radio\" value=\"female\" formControlName=\"gender\">Female\r\n    </label>\r\n  </div>\r\n\r\n  <!--Username-->\r\n  <div class=\"form-group\">\r\n    <!--\r\n      We will remove the 'required' attribute on this element since we will deal with\r\n      the validation in the component rather than on the template.\r\n\r\n      We will also remove the two-way binding [(ngModel)]=\"model.username\".\r\n\r\n      Instead of name=\"input-username\", we will now use formControlName=\"username\" and this\r\n          should match the name we added in\r\n\r\n          this.registerForm = new FormGroup({\r\n            username: new FormControl(),\r\n            password: new FormControl(),\r\n            confirmPassword: new FormControl()\r\n          });\r\n\r\n      We are also adding validation feedback to our user by using Boostrap classes and\r\n          conditionals to display validational errors to the users.  We are adding [ngClass]\r\n          which allows us to provide an expression so that we can use wether or not\r\n          we will be displaying the bootstrap 'is-invalid' class. We are using the\r\n          registerForm.get('username').errors property which means we will only be\r\n          showing the 'is-invalid' class if the 'username' control is on error state\r\n          based on the Validators we have provided in the register.component.ts.  And\r\n          then we used the registerForm.get('username').touched property so that we will\r\n          only show the 'is-invalid' class if the control is touched.\r\n\r\n          Noticed that we did not provide any other logic in the <div class=\"invalid-feedback\">\r\n          because the class 'invalid-feedback' will only show if the 'is-invalid' class is\r\n          also applied to our <input> element\r\n    -->\r\n    <input type=\"text\" class=\"form-control\"\r\n           [ngClass]=\"{'is-invalid': registerForm.get('username').errors\r\n           && registerForm.get('username').touched}\"\r\n           formControlName=\"username\" placeholder=\"Username\">\r\n    <div class=\"invalid-feedback\">Please choose a username</div>\r\n  </div>\r\n\r\n  <!--Known As-->\r\n  <div class=\"form-group\">\r\n    <input [ngClass]=\"{'is-invalid': registerForm.get('knownAs').errors && registerForm.get('knownAs').touched}\" class=\"form-control\"\r\n           placeholder=\"Known as\" formControlName=\"knownAs\">\r\n    <div class=\"invalid-feedback\" *ngIf=\"registerForm.get('knownAs').touched && registerForm.get('knownAs').hasError('required')\">Known as is required</div>\r\n  </div>\r\n\r\n  <!--\r\n      Date of Birth\r\n      We are now using NGX Bootstrap datepicker for this control that is why we need\r\n      to change the type=\"text\" attribute and add the bsDatepicker directive\r\n  -->\r\n  <div class=\"form-group\">\r\n    <input [ngClass]=\"{'is-invalid': registerForm.get('dateOfBirth').errors\r\n           && registerForm.get('dateOfBirth').touched}\"\r\n           class=\"form-control\"\r\n           placeholder=\"Date of Birth\"\r\n           formControlName=\"dateOfBirth\"\r\n           type=\"text\"\r\n           bsDatepicker\r\n           [bsConfig]=\"bsConfig\">\r\n    <div class=\"invalid-feedback\" *ngIf=\"registerForm.get('dateOfBirth').touched && registerForm.get('dateOfBirth').hasError('required')\">Date of Birth is required</div>\r\n  </div>\r\n\r\n  <!--City-->\r\n  <div class=\"form-group\">\r\n    <input [ngClass]=\"{'is-invalid': registerForm.get('city').errors && registerForm.get('city').touched}\" class=\"form-control\"\r\n           placeholder=\"City\" formControlName=\"city\">\r\n    <div class=\"invalid-feedback\" *ngIf=\"registerForm.get('city').touched && registerForm.get('city').hasError('required')\">City is required</div>\r\n  </div>\r\n\r\n  <!--Country-->\r\n  <div class=\"form-group\">\r\n    <input [ngClass]=\"{'is-invalid': registerForm.get('country').errors && registerForm.get('country').touched}\" class=\"form-control\"\r\n           placeholder=\"Country\" formControlName=\"country\">\r\n    <div class=\"invalid-feedback\" *ngIf=\"registerForm.get('country').touched && registerForm.get('country').hasError('required')\">Country is required</div>\r\n  </div>\r\n\r\n  <!--Password-->\r\n  <div class=\"form-group\">\r\n    <input type=\"password\" class=\"form-control\"\r\n           [ngClass]=\"{'is-invalid': registerForm.get('password').errors\r\n           && registerForm.get('password').touched}\"\r\n           formControlName=\"password\" placeholder=\"Password\">\r\n    <!--\r\n      We are now using *ngIf do filter what error message are we showing when the\r\n        'is-valid' class is added in our <input> element.  We are using the\r\n        registerForm.get('password').hasError('required') property where the 'required'\r\n          is the the Validators.required we have specified in the register.component.ts\r\n\r\n          For the minimum length, we need to use *ngIf=\"registerForm.get('password').hasError('minlength')\r\n          property and noticed we need to use lower-case 'minlegth' even though we are using\r\n          camel-cased Validators.minLength(4) in our register.component.ts\r\n    -->\r\n    <div class=\"invalid-feedback\"\r\n         *ngIf=\"registerForm.get('password').hasError('required')\r\n         && registerForm.get('password').touched\">\r\n      Password is required\r\n    </div>\r\n    <div class=\"invalid-feedback\"\r\n         *ngIf=\"registerForm.get('password').hasError('minlength')\r\n         && registerForm.get('password').touched\">\r\n      Password must be at least 4 characters\r\n    </div>\r\n    <div class=\"invalid-feedback\"\r\n         *ngIf=\"registerForm.get('password').hasError('maxlength')\r\n         && registerForm.get('password').touched\">\r\n      Password cannot exceed 8 characters\r\n    </div>\r\n  </div>\r\n\r\n  <!--Confirm Password-->\r\n  <div class=\"form-group\">\r\n    <!--\r\n        By using the registerForm.hasError('mismatch') property, we are now checking\r\n          if the registerForm form group is throwing the error 'mismatch' which matches\r\n          the key/value that we have specified in the custom validator\r\n          passwordMatchValidator(g: FormGroup) in the register.component.ts\r\n    -->\r\n    <input type=\"password\" class=\"form-control\"\r\n           [ngClass]=\"{'is-invalid': registerForm.get('confirmPassword').errors\r\n           && registerForm.get('confirmPassword').touched\r\n           || registerForm.get('confirmPassword').touched\r\n           && registerForm.hasError('mismatch')}\"\r\n           formControlName=\"confirmPassword\" placeholder=\"Confirm Password\" />\r\n    <div class=\"invalid-feedback\" *ngIf=\"registerForm.get('confirmPassword').hasError('required')\r\n         && registerForm.get('confirmPassword').touched\">Confirm password is required</div>\r\n    <div class=\"invalid-feedback\" *ngIf=\"registerForm.get('confirmPassword').touched\r\n         && registerForm.hasError('mismatch')\">Passwords must match</div>\r\n  </div>\r\n\r\n  <div class=\"form-group text-center\">\r\n    <button class=\"btn btn-success mr-2\" [disabled]=\"!registerForm.valid\" type=\"submit\">Register</button>\r\n    <button class=\"btn btn-default\" type=\"button\" (click)=\"cancel()\">Cancel</button>\r\n  </div>\r\n\r\n</form>\r\n\r\n<!--Temporary for just debugging-->\r\n<!--\r\n<p>Form value: {{registerForm.value | json}}</p>\r\n<p>Form status: {{registerForm.status | json}}</p>\r\n-->\r\n"

/***/ }),

/***/ "./src/app/register/register.component.ts":
/*!************************************************!*\
  !*** ./src/app/register/register.component.ts ***!
  \************************************************/
/*! exports provided: RegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return RegisterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_services/auth.service */ "./src/app/_services/auth.service.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(authService, alertify, fb, router) {
        this.authService = authService;
        this.alertify = alertify;
        this.fb = fb;
        this.router = router;
        // This will allow output from this component which is an emit event
        // and make sure EventEmitter is from @angular/core
        this.cancelRegister = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.bsConfig = {
            containerClass: 'theme-red'
        };
        // Create the register form in the ngOnInit() life cycle
        // which takes form controls and out-of-the-box validators as well
        // This is another way of creating a form
        //this.registerForm = new FormGroup({
        //  username: new FormControl('', Validators.required),
        //  password: new FormControl('', [Validators.required, Validators.minLength(4),
        //  Validators.maxLength(8)]),
        //  confirmPassword: new FormControl('', Validators.required)
        //}, this.passwordMatchValidator);
        this.createRegisterForm();
    };
    // Create a registration form using FormBuilder
    RegisterComponent.prototype.createRegisterForm = function () {
        this.registerForm = this.fb.group({
            gender: ['male'],
            username: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            knownAs: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            dateOfBirth: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            city: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            country: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            password: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].minLength(4),
                    _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].maxLength(8)]],
            confirmPassword: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]
        }, {
            validator: this.passwordMatchValidator
        });
    };
    // Custom validator that checks if the password matches
    RegisterComponent.prototype.passwordMatchValidator = function (g) {
        return g.get('password').value === g.get('confirmPassword').value ? null
            : { 'mismatch': true };
    };
    RegisterComponent.prototype.register = function () {
        var _this = this;
        // Since we are using reactive forms now, then we can check if the register form
        // is in a valid state
        if (this.registerForm.valid) {
            // We will get the values in our register form and we will pass it to the
            // user object by using Object.assign which copies the values of all
            // enumerable own properties from one or more source objects to a
            // target object.
            this.user = Object.assign({}, this.registerForm.value);
            // We will now register the user
            this.authService.register(this.user).subscribe(function () {
                _this.alertify.success('Registration successful');
            }, function (error) {
                _this.alertify.error(error);
            }, function () {
                // The third part of the subscribe method is what to do on complete
                // and on complete, we will automatically
                // log-in the user once they have successful registered
                _this.authService.login(_this.user).subscribe(function () {
                    _this.router.navigate(['/members']);
                });
            });
        }
        //// For the 'success' and 'error' parameter, we will just use empty () since we are not using anything
        //// from this response
        //this.authService.register(this.model).subscribe(() => {
        //  this.alertify.success('Registration successful');
        //}, error => {
        //  // This will be the http response that we will get back from the server
        //  // Typical error configured is a Bad Request that we set in \DatingApp.API\Controllers\AuthController.cs
        //  // RegisterNewUser method or model state validations (required, string length) that we
        //  // set on \DatingApp.API\Dtos\UserForRegisterDto.cs
        //  this.alertify.error(error);
        //});
        //console.log(this.registerForm.value);
    };
    RegisterComponent.prototype.cancel = function () {
        // We are just emitting a simple boolean value but this can be any value, or object, or data
        this.cancelRegister.emit(false);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], RegisterComponent.prototype, "cancelRegister", void 0);
    RegisterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-register',
            template: __webpack_require__(/*! ./register.component.html */ "./src/app/register/register.component.html"),
            styles: [__webpack_require__(/*! ./register.component.css */ "./src/app/register/register.component.css")]
        }),
        __metadata("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"],
            _services_alertify_service__WEBPACK_IMPORTED_MODULE_2__["AlertifyService"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], RegisterComponent);
    return RegisterComponent;
}());



/***/ }),

/***/ "./src/app/routes.ts":
/*!***************************!*\
  !*** ./src/app/routes.ts ***!
  \***************************/
/*! exports provided: appRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appRoutes", function() { return appRoutes; });
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _members_member_list_member_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./members/member-list/member-list.component */ "./src/app/members/member-list/member-list.component.ts");
/* harmony import */ var _messages_messages_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./messages/messages.component */ "./src/app/messages/messages.component.ts");
/* harmony import */ var _list_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./list/list.component */ "./src/app/list/list.component.ts");
/* harmony import */ var _guards_auth_guard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_guards/auth.guard */ "./src/app/_guards/auth.guard.ts");
/* harmony import */ var _members_member_detail_member_detail_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./members/member-detail/member-detail.component */ "./src/app/members/member-detail/member-detail.component.ts");
/* harmony import */ var _resolver_member_detail_resolver__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./_resolver/member-detail.resolver */ "./src/app/_resolver/member-detail.resolver.ts");
/* harmony import */ var _resolver_member_list_resolver__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./_resolver/member-list.resolver */ "./src/app/_resolver/member-list.resolver.ts");
/* harmony import */ var _members_member_edit_member_edit_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./members/member-edit/member-edit.component */ "./src/app/members/member-edit/member-edit.component.ts");
/* harmony import */ var _resolver_member_edit_resolver__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./_resolver/member-edit.resolver */ "./src/app/_resolver/member-edit.resolver.ts");
/* harmony import */ var _guards_prevent_unsaved_changes_guard__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./_guards/prevent-unsaved-changes.guard */ "./src/app/_guards/prevent-unsaved-changes.guard.ts");
/* harmony import */ var _resolver_lists_resolver__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./_resolver/lists.resolver */ "./src/app/_resolver/lists.resolver.ts");
/* harmony import */ var _resolver_messages_resolver__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./_resolver/messages.resolver */ "./src/app/_resolver/messages.resolver.ts");













var appRoutes = [
    // When the user is adding a url, or clicks on a link, or adding some path to the
    // url, then the router will attempt to match one of these routes and it keeps going
    // down to this list attempting to match to the url.  If nothing matches this path,
    // then it gonna use the wild card and it's gonna redirect to home.  So, the ordering
    // of these routes is important.
    // Instead of using 'home', we will just use '' so that when a user paste the url
    // localhost:4200, then the user will be redirected to the home component
    { path: '', component: _home_home_component__WEBPACK_IMPORTED_MODULE_0__["HomeComponent"] },
    // Add a dummy route so that we can guard multiple child routes
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_4__["AuthGuard"]],
        children: [
            {
                path: 'members', component: _members_member_list_member_list_component__WEBPACK_IMPORTED_MODULE_1__["MemberListComponent"],
                resolve: { users: _resolver_member_list_resolver__WEBPACK_IMPORTED_MODULE_7__["MemberListResolver"] }
            },
            // :id -- is how we specify the parameter of the route
            // The resolver will return a single type 'user' as define in the member-detail.resolver.ts
            {
                path: 'members/:id', component: _members_member_detail_member_detail_component__WEBPACK_IMPORTED_MODULE_5__["MemberDetailComponent"],
                resolve: { user: _resolver_member_detail_resolver__WEBPACK_IMPORTED_MODULE_6__["MemberDetailResolver"] }
            },
            // We will not pass the Id for the member that we want to edit
            // Instead, we will use the decoded token for whoever is logging in
            {
                path: 'member/edit', component: _members_member_edit_member_edit_component__WEBPACK_IMPORTED_MODULE_8__["MemberEditComponent"],
                resolve: { user: _resolver_member_edit_resolver__WEBPACK_IMPORTED_MODULE_9__["MemberEditResolver"] },
                canDeactivate: [_guards_prevent_unsaved_changes_guard__WEBPACK_IMPORTED_MODULE_10__["PreventUnsavedChangesGuard"]]
            },
            {
                path: 'messages', component: _messages_messages_component__WEBPACK_IMPORTED_MODULE_2__["MessagesComponent"],
                resolve: { messages: _resolver_messages_resolver__WEBPACK_IMPORTED_MODULE_12__["MessagesResolver"] }
            },
            {
                path: 'list', component: _list_list_component__WEBPACK_IMPORTED_MODULE_3__["ListComponent"],
                resolve: { users: _resolver_lists_resolver__WEBPACK_IMPORTED_MODULE_11__["ListsResolver"] }
            }
        ]
    },
    // redirect to the full path of the home URL
    { path: '**', redirectTo: '', pathMatch: 'full' }
];


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false,
    apiUrl: 'http://localhost:5000/api/'
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
// Imported from Angular which means we are making a Web application that
// runs on a browser which bootstraps the AppModule which in turn bootstraps the AppComponent and then
// the AppComponent loads the html on the page.
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });
// How does the main.ts file goes into our index.html ???  Our index.html does not have scripts tags inside it ???
// This is where the Angular magic comes in and uses a very popular tool called WebPack.
// WebPack is a module bundler and a task runner at the same time and it will bundle our application
// into javascript and at the same time injects this javascript into our index.html file when it builds it.
// The configuration for WebPack can be found under angular.json
// When you inspect index.html in the browser, you will see runtime.js, polyfills.js, styles.js, vendor.js,
// main.js which is the javascript bundled by WebPack since browser does not understand TypeScripts


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Documents\Dev-Repo\udemy-cummings-aspnet-core-angular\DatingApp-SPA\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map