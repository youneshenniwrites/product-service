import { APIGatewayEvent, Context, APIGatewayProxyResult } from "aws-lambda";

export async function dealsHandler(
  event: APIGatewayEvent,
  _context: Context
): Promise<APIGatewayProxyResult> {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello Deals!",
      path: `${event.path}, ${event.pathParameters}`,
    }),
  };
}
