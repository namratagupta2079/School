
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})

export class BreadcrumbComponent implements OnInit {
  public static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';
  public static readonly ROUTE_DATA_HOME = 'landing';
  public static readonly HOME_BREADCRUMB: Breadcrumb = {
    label: 'Home',
    url: '',
    terminalOnly: false
  };

  public breadCrumItems: Breadcrumb[];
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.breadCrumItems = [];
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadCrumItems = this.createBreadcrumbs(this.activatedRoute.root);
      }
      );
  }

  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '#',
    breadcrumbs: Breadcrumb[] = [BreadcrumbComponent.HOME_BREADCRUMB]
  ): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;
    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }
      if (this.isHomePage(url)) {
        return breadcrumbs = [];
      }
      const breadCrumData = child.snapshot.data[BreadcrumbComponent.ROUTE_DATA_BREADCRUMB];
      if (!(breadCrumData === null || breadCrumData === undefined)) {
        breadcrumbs.push({ label: breadCrumData.label, url, terminalOnly: breadCrumData.terminalOnly });
      }
      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
  }
  private isHomePage(routePath: string): boolean {
    if (routePath) {
      return routePath.indexOf(BreadcrumbComponent.ROUTE_DATA_HOME) === -1 ? false : true;
    }
    return false;
  }

  showBreadCrums() {
    return this.breadCrumItems.length > 0;
  }
}

export interface Breadcrumb {
  label: string;
  url: string;
  terminalOnly: boolean;
}
