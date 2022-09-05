import {
  validate,
  validateOrReject,
  Contains,
  IsInt,
  Min,
  Max,
  MinLength,
  MaxLength,
  IsDefined,
  ValidationError,
  ValidationArguments,
  maxLength,
  isDefined,
  isString,
  IsString,
  IsEmpty,
  IsNotEmpty,
  minLength,
} from "class-validator";
import { ProjectInput } from "./ProjectInput.js";
export class Post {
  @MinLength(2)
  @MaxLength(15)
  @IsString()
  @IsNotEmpty()
  title?: string;

 
  @Min(1)
  // @Max(10)
  @IsInt()
  amount!: number;
  // [Symbol.iterator]: function* () {
  //   let properties = Object.keys(this);
  //   for (let i of properties) {
  //       yield [i, this[i]];
  //   }
  isValid!: boolean
  set setTitle(title: string) {
    this.title = title;
  }
  set setAmount(amount: number) {
    this.amount = amount;
  }
  validate() {
    // if(Array.isArray(input)){
    //   [this.title, this.amount] = <[string,number]>input.gatherUserInput();
    // }
    const val = validate(this).then((errors) => {
      // errors is an array of validation errors
      if (errors.length > 0) {
        console.log("validation failed. errors: ", errors);
        console.log(typeof errors[0].constraints);
        alertAllErrors(errors);
        this.isValid = false;
      }
      else{
        console.log("validation succeed");
        this.isValid = true;
      }
    });
    

    //alert function for showing errors infront
    function alertAllErrors(errors: ValidationError[]) {
      // errors is an array of validation errors
      // has property object 'constraints' which has the error description messages
      errors.forEach((element) => {
        if (element.constraints) {
          for (const value of Object.values(element.constraints)) {
            alert(value);
          }
        }
      });
    }
    validateOrReject(this).catch((errors) => {
      console.log("Promise rejected (validation failed). Errors: ", errors);
    });
    return this.isValid;
  }

}
// function alertErrorMessages(errors:ValidationError[]){

// }
// }
// or
// async function validateOrRejectExample(input: Post) {
//   try {
//     await validateOrReject(input);
//   } catch (errors) {
//     console.log(
//       "Caught promise rejection (validation failed). Errors: ",
//       errors
//     );
//   }

// export interface ValidatorOptions {
//   skipMissingProperties?: boolean;
//   whitelist?: boolean;
//   forbidNonWhitelisted?: boolean;
//   groups?: string[];
//   dismissDefaultMessages?: boolean;
//   validationError?: {
//     target?: boolean;
//     value?: boolean;
//   };

//   forbidUnknownValues?: boolean;
//   stopAtFirstError?: boolean;
