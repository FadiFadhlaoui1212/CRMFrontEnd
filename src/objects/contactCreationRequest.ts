export enum TitleEnum {
    CEO = "CEO",
    ENGINEER = "ENGINEER",
    MANAGER = "MANAGER",
    DEVELOPER = "DEVELOPER",
    ANALYST = "ANALYST"
  }


  export class ContactCreationRequest {
    id?: number;
    firstName: string;
    lastName: string;
    company: string;
    phoneNumber: string;
    titleEnum: TitleEnum;
    address: string;
    country: string;
    city: string;
    zipCode: number;
    state: string;
  
    constructor(
      firstName: string,
      lastName: string,
      company: string,
      phoneNumber: string,
      titleEnum: TitleEnum,
      address: string,
      country: string,
      city: string,
      zipCode: number,
      state: string
    ) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.company = company;
      this.phoneNumber = phoneNumber;
      this.titleEnum = titleEnum;
      this.address = address;
      this.country = country;
      this.city = city;
      this.zipCode = zipCode;
      this.state = state;
    }
  }
