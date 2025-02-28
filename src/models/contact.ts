export enum TitleEnum {
    CEO = "CEO",
    ENGINEER = "ENGINEER",
    MANAGER = "MANAGER",
    DEVELOPER = "DEVELOPER",
    ANALYST = "ANALYST"
  }

export class User {
    id: number;
    firstname: string;
    lastname: string;
    fullname: string;
    email: string;
    password: string;

    constructor(id: number, firstname: string, lastname: string, email: string, password: string){
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.fullname = firstname + lastname;
        this.email = email;
        this.password = password;
    }
}

  export class Contact {
    id: number;
    firstName: string;
    lastName: string;
    profilePicture: Blob;
    company: string;
    user: User; // Reference to User (use ID instead of full User object)
    phoneNumber: string;
    titleEnum: TitleEnum;
    address: string;
    country: string;
    city: string;
    zipCode: number;
    state: string;

    constructor(
      id: number,
      firstName: string,
      lastName: string,
      profilePicture: Blob,
      company: string,
      user: User,
      phoneNumber: string,
      titleEnum: TitleEnum,
      address: string,
      country: string,
      city: string,
      zipCode: number,
      state: string
    ) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.profilePicture = profilePicture;
      this.company = company;
      this.user = user;
      this.phoneNumber = phoneNumber;
      this.titleEnum = titleEnum;
      this.address = address;
      this.country = country;
      this.city = city;
      this.zipCode = zipCode;
      this.state = state;
    }
  }
  