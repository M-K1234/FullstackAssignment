import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReviewComponent } from './review/review.component';
import { NewsComponent } from './news/news.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AccountComponent } from './account/account.component';
import { ReviewAddComponent } from './review-add/review-add.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'review', component: ReviewComponent},
    {path: 'review/:id', component: ReviewComponent},
    {path: 'review/create/form', component: ReviewAddComponent, canActivate: [AuthGuard]},
    {path: 'news', component: NewsComponent},
    {path: 'news/:id', component: NewsComponent},
    {path: 'about', component: AboutComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'login', component: LoginComponent},
    {path: 'sign-up', component: SignUpComponent},
    {path: 'account', component: AccountComponent}
];
