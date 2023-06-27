import { APIGatewayEvent, Context, APIGatewayProxyResult } from "aws-lambda";

export async function productsHandler(
  event: APIGatewayEvent,
  _context: Context
): Promise<APIGatewayProxyResult> {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello Products!",
      path: `${event.path}, ${event.pathParameters}`,
    }),
  };
}
