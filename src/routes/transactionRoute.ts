import axios from "axios";
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { getAccessToken } from "../services/auth.service";
import { TransactionBodyV2, TransactionResponseV2 } from "../types/create-transaction-v2-types";


const TRANSACTION_URL = "https://api.omno.com/transaction/create";

export default async function (fastify: FastifyInstance) {
  fastify.post(
    "/create-transaction-v2",
    async (
      request: FastifyRequest<{ Body: TransactionBodyV2 }>,
      reply: FastifyReply
    ) => {
      try {
        const {
          amount,
          currency,
          hookUrl,
          callback,
          callbackFail,
          billing,
          lang,
          orderId,
          cardToken,
          paymentHistory,
        } = request.body;

        if (
          !amount ||
          !currency ||
          !hookUrl ||
          !callback ||
          !callbackFail ||
          !billing
        ) {
          return reply
            .status(400)
            .send({ message: "Missing required transaction data." });
        }

        const accessToken = await getAccessToken();

        const payload = {
          amount,
          currency,
          hookUrl,
          callback,
          callbackFail,
          billing,
          lang,
          orderId,
          cardToken,
          paymentHistory,
        };

        const transactionResponse = await axios.post<TransactionResponseV2>(
          TRANSACTION_URL,
          payload,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        return reply.send(transactionResponse.data);
      } catch (error: any) {
        reply.log.error("Error during transaction creation:", error.message);

        return reply
          .status(500)
          .send({
            message: "Failed to create transaction",
            error: error.message,
          });
      }
    }
  );
}
