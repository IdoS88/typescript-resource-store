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
  ValidatorOptions,
  IsNotEmpty,
} from "class-validator";

export class Post {
  @IsNotEmpty()
  @IsString()
  @MinLength(2, {
    message: (args: ValidationArguments) => {
      if (args.value.length === 2) {
        return "Too short, minimum length is 2 character";
      } else {
        return (
          "Too short, minimum length is " + args.constraints[0] + " characters"
        );
      }
    },
  })
  title!: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(10)
  amount!: number;
}
let post = new Post();
 // should not pass
post.amount = -2;
validate(post).then((errors) => {
  // errors is an array of validation errors
  if (errors.length > 0) {
    console.log("validation failed. errors: ", errors);
    errors.forEach((element) => {
      if(element.constraints){
      for(let [key,value] of Object.entries(element.constraints))
        {
          console.log(value);
          alert("Error type form " + value);
        }
      }
    });
  } else {
    console.log("validation succeed");
  }
});

validateOrReject(post).catch((errors) => {
  console.log("Promise rejected (validation failed). Errors: ", errors);
});
// or
async function validateOrRejectExample(input: Post) {
  try {
    await validateOrReject(input);
  } catch (errors) {
    console.log(
      "Caught promise rejection (validation failed). Errors: ",
      errors
    );
  }
}

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
// }
