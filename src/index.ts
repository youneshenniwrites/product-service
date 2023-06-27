import { APIGatewayEvent, Context, APIGatewayProxyResult } from "aws-lambda";

export async function handler(
  event: APIGatewayEvent,
  _context: Context
): Promise<APIGatewayProxyResult> {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello World!",
      path: `${event.path}, ${event.pathParameters}`,
    }),
  };
}
