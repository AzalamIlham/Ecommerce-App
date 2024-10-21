import { Component} from '@angular/core';
import { Product} from '../../modules/Product';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../sevices/product.service';
import { AuthService } from '../../sevices/auth.service';
import { Comment } from '../../modules/Comment';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-datail-product',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './datail-product.component.html',
  styleUrl: './datail-product.component.css'
})
export class DatailProductComponent {
  @Input() product!: Product;
  @Input() comment !: Comment;
  comments : Comment[]=[];
  newComment: string = '';

  selectedRating: number = 0;

  constructor(private route: ActivatedRoute, 
    private productService: ProductService,
    private authService :AuthService) { }

    isUserLoggedIn(): boolean {
      return this.authService.isAuthenticated();
    }
  
    rateProduct(rating: number): void {
      if (this.isUserLoggedIn()) {
        this.selectedRating = rating;
      } else {
        alert('You must be logged in to rate this product.');
      }
    }

    
  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id'); 
    if (productId) {
      this.productService.getProductById(+productId).subscribe((data: Product) => {
        this.product = data; 
      });
    }
  }

  submitComment(): void {
    if (this.isUserLoggedIn()) {
      if (this.comment.commentaire.trim()) {
        this.comment.commentaire = ''; 
      } else {
        console.log('Comment field is empty.');
      }
    } else {
      alert('You must be logged in to submit a comment.');
    }
  }

  submitComment1(): void {
    if (this.isUserLoggedIn()) {
      if (this.newComment.trim()) {
        const newCommentObj: Comment = {
          id: this.comments.length + 1,
          commentaire: this.newComment,
          rating :this.selectedRating
        };
        this.comments.push(newCommentObj); 
        this.newComment = ''; 
      } else {
        alert('Comment field is empty.');
      }
    } else {
      alert('You must be logged in to submit a comment.');
    }
  }

  deleteComment(index: number): void {
    this.comments.splice(index, 1); 
  }
}


