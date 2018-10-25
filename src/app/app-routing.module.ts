import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router, ActivationEnd } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

//local imports
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component'
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, data: { metaDescription: 'Dashboard Page Desc' } },
  { path: 'heroes', component: HeroesComponent, data: { metaDescription: 'Heroes Page Desc' } },
  { path: 'detail/:id', component: HeroDetailComponent, data: { metaDescription: 'Detail Page Desc' } }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router, private meta: Meta) {
    //Subscribe to all routing events.
    router.events.subscribe((val) => {
      // in the case of activation end. 
      // Update the meta description, title etc to match the given one above. 
      if(val instanceof ActivationEnd) {
        var description = val.snapshot.data.metaDescription;

        this.meta.updateTag({ name: 'description', content: description });
      }
    });
  }
}
