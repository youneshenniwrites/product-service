import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { LambdaStack, ApiGatewayStack } from "./stacks";

// * This is our root stack
export class ProductsServiceStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const { productsLambda, categoriesLambda, dealsLambda } = new LambdaStack(
      this,
      "ProductsLambda",
      {
        bucket: process.env.BUCKET_NAME!,
      }
    );
    new ApiGatewayStack(this, "ProductsApiGateway", {
      productsLambda,
      categoriesLambda,
      dealsLambda,
    });
  }
}
