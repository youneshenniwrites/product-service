import { Stack } from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { IFunction } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

interface ResourceType {
  name: string;
  methods: string[];
  child?: ResourceType;
}
interface ApiGatewayStackProps {
  productsLambda: IFunction;
  categoriesLambda: IFunction;
  dealsLambda: IFunction;
}

export class ApiGatewayStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiGatewayStackProps) {
    super(scope, id);
    this.createApiGateway("products-service", props);
  }

  private createApiGateway(
    apiName: string,
    { productsLambda, categoriesLambda, dealsLambda }: ApiGatewayStackProps
  ) {
    const apiGateway = new RestApi(this, `${apiName}-ApiGtw`);

    this.createEndpoints(productsLambda, apiGateway, {
      name: "products",
      methods: ["GET", "POST"],
      child: {
        name: "{id}",
        methods: ["GET", "PUT", "DELETE"],
      },
    });

    this.createEndpoints(categoriesLambda, apiGateway, {
      name: "categories",
      methods: ["GET", "POST"],
      child: {
        name: "{id}",
        methods: ["GET", "PUT", "DELETE"],
      },
    });

    this.createEndpoints(dealsLambda, apiGateway, {
      name: "deals",
      methods: ["GET", "POST"],
      child: {
        name: "{id}",
        methods: ["GET", "PUT", "DELETE"],
      },
    });
  }

  private createEndpoints(
    lambdaFunction: IFunction,
    apiGateway: RestApi,
    { name, methods, child }: ResourceType
  ) {
    const lambdaIntegration = new LambdaIntegration(lambdaFunction);
    const rootResource = apiGateway.root.addResource(name);
    methods.forEach((item) => rootResource.addMethod(item, lambdaIntegration));

    if (child) {
      const childResource = rootResource.addResource(child.name);
      child.methods.forEach((item) =>
        childResource.addMethod(item, lambdaIntegration)
      );
    }
  }
}
