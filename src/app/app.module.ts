import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header';
import { ItemListComponent } from './components/item-list/item-list';
import { ItemDescComponent } from './components/item-desc/item-desc';
import { CheckoutComponent } from './components/checkout/checkout';

// Providers
import { CartProvider } from './providers/cart.provider';
import { ApiProvider } from './providers/api.provider';
import { CheckoutItemComponent } from './components/checkout/checkout-item/checkout-item.component';
import { ModalComponent } from './components/modal/modal.component';
import { ModalService } from './components/modal/modal.service';

// Routes
const routes: Routes = [
  { path: 'items', component: ItemListComponent },
  { path: 'items/:ref', component: ItemDescComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: '**', redirectTo: 'items' },
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    CartProvider,
    ApiProvider,
    ModalService
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    ItemListComponent,
    ItemDescComponent,
    CheckoutComponent,
    CheckoutItemComponent,
    ModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
