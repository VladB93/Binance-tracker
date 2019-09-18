import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaggedCoinsGridComponent } from './components/tagged-coins-grid/tagged-coins-grid.component';

const routes: Routes = [{ component: TaggedCoinsGridComponent, path: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
