
export class UserModule { 
  id ! : number;
  email !:String ;
  password !:String;
  username !:String;

  constructor(id :number,email :String , password :String, username :String ){
        this.id =id;
        this.email = email;
        this.password = password;
        this.username = username;
  } 

}
