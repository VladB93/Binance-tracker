import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaggedCoinsTableComponent } from './components/tagged-coins-table/tagged-coins-table.component';

const routes: Routes = [{ component: TaggedCoinsTableComponent, path: 'home' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
