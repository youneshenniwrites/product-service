import { Stack } from "aws-cdk-lib";
import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway";
import { IFunction } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

interface ApiGatewayStackProps {
  productLambda: IFunction;
}

export class ApiGatewayStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiGatewayStackProps) {
    super(scope, id);
    this.createApiGtw("product", props.productLambda);
  }

  private createApiGtw(apiName: string, lambdaFunction: IFunction) {
    const apigtw = new LambdaRestApi(this, `${apiName}-ApiGtw`, {
      restApiName: `${apiName}-ApiGtw`,
      handler: lambdaFunction,
      proxy: false,
    });

    const productsResource = apigtw.root.addResource("products");
    productsResource.addMethod("GET");
    productsResource.addMethod("POST");

    const productResource = productsResource.addResource("{id}");
    productResource.addMethod("GET");
    productResource.addMethod("PUT");
    productResource.addMethod("DELETE");

    const categoriesResource = apigtw.root.addResource("categories");
    categoriesResource.addMethod("GET");
    categoriesResource.addMethod("POST");

    const categoryResource = categoriesResource.addResource("{id}");
    categoryResource.addMethod("GET");
    categoryResource.addMethod("PUT");
    categoryResource.addMethod("DELETE");

    const dealsResource = apigtw.root.addResource("deals");
    dealsResource.addMethod("GET");
    dealsResource.addMethod("POST");

    const dealResource = dealsResource.addResource("{id}");
    dealResource.addMethod("GET");
    dealResource.addMethod("PUT");
    dealResource.addMethod("DELETE");
  }
}
