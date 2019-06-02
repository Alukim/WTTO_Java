import { NewDocumentComponent } from './new-document/new-document.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewDocumentComponent } from './view-document/view-document.component';

const routes: Routes = [
  { path: 'home', component: DashboardComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'new', component: NewDocumentComponent},
  { path: 'document/:id', component: ViewDocumentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
