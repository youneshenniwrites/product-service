import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { LambdaStack, ApiGatewayStack } from "./stacks";

// * This is our root stack
export class ProductsServiceStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const { productsLambda } = new LambdaStack(this, "ProductsLambda", {
      bucket: "FOO",
    });
    new ApiGatewayStack(this, "ProductsApiGateway", { productsLambda });
  }
}
