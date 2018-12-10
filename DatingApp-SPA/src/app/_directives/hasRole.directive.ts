import { Directive, Input, ViewContainerRef, TemplateRef, OnInit } from '@angular/core';
import { AuthService } from './../_services/auth.service';

// We are using the @Directive decorator and our selector
// is [appHasRole].  Since this is a structural directive,
// when we call this, we need to use the *appHasRole.  Whenever
// you see an '*' infront of a directive, it specifies that
// it is a structural directive and it actually transforms or
// converts elements into a type of <ng-template>
@Directive({
  selector: '[appHasRole]'
})
// We need to access the OnInit life cycle
export class HasRoleDirective implements OnInit {

  @Input() appHasRole: string[];
  isVisible = false;

  // ViewContainerRef is a container for two different kind of views
  // that can either be a component or a template and we are going to use this
  // to view templates
  // TemplateRef refers to the element that we are applying this structural
  // directive to
  constructor(private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService: AuthService) { }

  ngOnInit() {
    // This is where we will decide if we are going to show or hide the template
    const userRoles = this.authService.decodedToken.role as Array<string>;

    // If no roles, then clear the viewContainerRef
    if (!userRoles) {
      // If the user is not a member of any roles at all, then we certainly don't
      // want to display whatever we are using this 'appHasRole' on
      this.viewContainerRef.clear();
    }

    // If the user has role needed, then reder the element
    // We will be using the method authService.roleMatch
    // and we will pass the 'appHasRole' which is an input property
    // that we are passing as an array of string
    if (this.authService.roleMatch(this.appHasRole)) {
      if (!this.isVisible) {
        this.isVisible = true;
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.isVisible = false;
        this.viewContainerRef.clear();
      }
    }


  }
}
