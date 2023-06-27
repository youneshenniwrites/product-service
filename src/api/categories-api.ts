import { APIGatewayEvent, Context, APIGatewayProxyResult } from "aws-lambda";

export async function categorieshandler(
  event: APIGatewayEvent,
  _context: Context
): Promise<APIGatewayProxyResult> {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello Categories!",
      path: `${event.path}, ${event.pathParameters}`,
    }),
  };
}
