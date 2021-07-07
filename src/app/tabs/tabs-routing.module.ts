import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'avatar',
        loadChildren: () => import('../avatar/avatar.module').then(m => m.AvatarPageModule)
      },
      {
        path: 'walk',
        loadChildren: () => import('../walk/walk.module').then(m => m.WalkPageModule)
      },
      {
        path: 'wall',
        loadChildren: () => import('../wall/wall.module').then(m => m.WallPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/walk',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/walk',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
