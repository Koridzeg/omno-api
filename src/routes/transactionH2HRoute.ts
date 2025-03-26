  import axios from "axios";
  import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
  import { getAccessToken } from "../services/auth.service";
  import { TransactionBodyH2H } from "../types/create-transactions-h2h-types";
  import { createTransactionSchema } from "../schemas/transaction.schema";

  const TRANSACTION_URL = "https://api.omno.com/transaction/h2h/create";

  export default async function (fastify: FastifyInstance) {
    fastify.post(
      "/create-transaction",
      { schema: createTransactionSchema },
      async (
        request: FastifyRequest<{ Body: TransactionBodyH2H }>,
        reply: FastifyReply
      ) => {
        const {
          amount,
          currency,
          lang,
          hookUrl,
          callback,
          callbackFail,
          billing,
          orderId,
          cardToken,
          kycVerified,
          previousPaymentCount,
          cardData,
          saveCard,
          payment3dsType = "Redirection",
        } = request.body;


        try {
          const accessToken = await getAccessToken();

          const payload: TransactionBodyH2H = {
            amount,
            currency,
            lang,
            hookUrl,
            callback,
            callbackFail,
            billing,
            orderId,
            cardToken,
            payment3dsType,
            kycVerified,
            previousPaymentCount,
            cardData,
            saveCard,
          };

          const transactionResponse = await axios.post(TRANSACTION_URL, payload, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          });

          return reply.send(transactionResponse.data);
        } catch (error: any) {
          console.error("Error during transaction creation:", error.message);
          return reply.send({
            message: "Failed to create transaction",
            error: error.message,
          });
        }
      }
    );
  }
