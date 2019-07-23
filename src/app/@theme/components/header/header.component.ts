import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {DataService} from '../../../pages/e-commerce/data.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';
  type:any='All';
  userMenu = [ { title: 'Profile' }, { title: 'Log out' } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private backService:DataService) {
  }  
  
  changePeriod(month)
  {
    this.backService.monthChosenForTopFilter=month;
    console.log("this is the month selected in the main selector", month);
    //change the month with respect to the selector in the header cards
    console.log("this is the current country", this.backService.current_country);
    this.backService.selectedMonth={
      "total_profit":month,
      "active_users":month,
      "new_orders":month,
      "open_complaints":month  
      };



      if(month === 'All')
      {
        for(let i=0;i<this.backService.countryListingMain.length;i++)
        {
          if(this.backService.current_country == this.backService.countryListingMain[i].alpha3code)
          {   
            for(let j=0;j<this.backService.identities.length;j++)
            {
              this.backService.aboveListing[this.backService.identities[j]]=this.backService.countryListingMain[i][this.backService.identities[j]];
            }
          }
        }
  
      }
      else
      {
        for(let j=0;j<this.backService.identities.length;j++)
        {
          this.backService.aboveListing[this.backService.identities[j]] = this.backService.monthly_data['any_key'][month][this.backService.identities[j]];
        }
      }
    //change the month with respect to the selector in the graph
    this.backService.monthChosenForGraph = month;
    this.backService.chartData = this.backService.barGraphData[month];
  }


  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick);

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
