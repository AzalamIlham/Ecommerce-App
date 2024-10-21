import { Component,Output, EventEmitter } from '@angular/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormsModule } from '@angular/forms'; 
import { Product } from '../../modules/Product';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../sevices/product.service';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { SearchService } from '../../sevices/search.service';
import { AuthService } from '../../sevices/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] 
})

export class HeaderComponent {
  searchTerm: string = '';
  categories: string[] = [];
  showHeader: boolean = true;
  @Output() searchEvent = new EventEmitter<string>();

  constructor(
    private productService: ProductService,
    private router: Router,
    private searchService: SearchService,
    public authService: AuthService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showHeader = !(event.url === '/auth' || event.url === '/register');
      }
    });
  }

  ngOnInit(): void {
    this.productService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onCategoryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const category = selectElement.value;
    if (category) {
      if(category=="All"){
        this.router.navigate(['/'])
      }
      else{
        this.router.navigate(['/category', category]);
      }
    }
  }
  
  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchService.updateSearchTerm(input.value); 
    this.searchEvent.emit(input.value); 
  }

  onLogout() {
    if (confirm("Thank you for using our service! Do you really want to log out?")) {
        this.authService.logout();
        this.router.navigate(['/']);
    }
}

}
