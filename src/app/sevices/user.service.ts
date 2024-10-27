import { Injectable } from '@angular/core';
import { UserModule } from '../modules/user.module';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  users: UserModule[] = [
    new UserModule(1, "ilhamazalam@gmail.com", "12345678", "IlhamAz"),
  ]

  constructor() { }


}
