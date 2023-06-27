import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { LambdaStack } from "./lambda-stack";
import { ApiGatewayStack } from "./api-gateway-stack";

export class ProductServiceStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const { productLambda } = new LambdaStack(this, "ProductLambda", {
      bucket: "FOO",
    });
    new ApiGatewayStack(this, "ProductApiGateway", { productLambda });
  }
}
