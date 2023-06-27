#!/usr/bin/env node
import "source-map-support/register";
import { App as CdkApp } from "aws-cdk-lib";
import { ProductsServiceStack } from "../lib/products-service-stack";

const app = new CdkApp();
new ProductsServiceStack(app, "ProductsServiceStack", {});
