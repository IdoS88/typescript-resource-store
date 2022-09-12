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
  MAX,
  ValidatorOptions,
} from "class-validator";
import { ProjectInput } from "./ProjectInput.js";
export class Post {
  @MinLength(2)
  @MaxLength(15)
  @IsString()
  @IsNotEmpty()
  title?: string;

  @Max(Number.MAX_SAFE_INTEGER)
  @Min(1)
  @IsInt()
  amount!: number;

  set setTitle(title: string) {
    this.title = title;
  }
  set setAmount(amount: number) {
    this.amount = amount;
  }
  public async validate(): Promise<boolean> {
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

    const valErrors = await validate(this);

    if (valErrors.length > 0) {
      console.log("validation failed. errors: ", valErrors);
      alertAllErrors(valErrors);
      return false;
    } else {
      console.log("validation succeed");
      return true;
    }
    return false;
  }
}
