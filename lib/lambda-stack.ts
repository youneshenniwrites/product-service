import { Stack } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import {
  NodejsFunction as LambdaFunction,
  NodejsFunctionProps as LambdaFunctionProps,
} from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";

interface LambdaStackProps {
  bucket: string;
}

export class LambdaStack extends Stack {
  public readonly productLambda: LambdaFunction;

  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id);

    const nodeJsFunctionProps: LambdaFunctionProps = {
      bundling: {
        externalModules: ["aws-sdk"],
      },
      environment: {
        BUCKET_NAME: props.bucket,
      },
      runtime: Runtime.NODEJS_18_X,
    };

    this.productLambda = new LambdaFunction(this, "productLambda", {
      entry: join(__dirname, "/../src/index.ts"),
      ...nodeJsFunctionProps,
    });
  }
}
