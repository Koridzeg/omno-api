    import axios from "axios";
    import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
    import { getAccessToken } from "../services/auth.service";
    import { TransactionBodyH2H } from "../types/create-transactions-h2h-types";
    import { createTransactionSchema } from "../schemas/transaction.schema";

    const TRANSACTION_URL = "https://api.omno.com/transaction/h2h/create";



    const transactionQueue = new Map<string, { resolve: Function, reject: Function }>();

    export default async function (fastify: FastifyInstance) {
      fastify.post(
        "/create-transaction",
        { 
          
          schema: {
            ...createTransactionSchema,
            tags: ['Transaction'],
            description: 'Create a new transaction', 
          },
         },
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
    
            const promise = new Promise((resolve, reject) => {
              transactionQueue.set(orderId, { resolve, reject });
            });
    
       
    
            const redirectUrl = await promise;
            return reply.send({ redirectUrl });

            //we could reply.redirect but we are using postman so let's keep it this way
            
          } catch (error: any) {
            console.error("Error during transaction creation:", error.message);
            return reply.send({
              message: "Failed to create transaction",
              error: error.message,
            });
          }
        }
      );
    
      fastify.post('/webhook', {
        schema: {
          tags: ['webhook'],
          description: 'Webhook to handle transaction updates',
          body: {
            type: 'object',
            properties: {
              orderId: { type: 'string', description: 'Order ID of the transaction' },
              '3dsRedirectUrl': { type: 'string', description: '3D Secure redirect URL' },
            },
            required: ['orderId', '3dsRedirectUrl'],
          },
        },
      }, async (request, reply) => {
        const webhookData: any = request.body;
        console.log("Webhook received:", webhookData);
      
        if (webhookData['3dsRedirectUrl']) {
          const orderId = webhookData['orderId'];  
          const redirectUrl = webhookData['3dsRedirectUrl'];
      
          console.log('Redirecting client to:', redirectUrl);
      
          if (transactionQueue.has(orderId)) {
            const { resolve } = transactionQueue.get(orderId)!;
            resolve(redirectUrl);  
            transactionQueue.delete(orderId);  
          }
      
          return reply.send({ redirectUrl });
        }
      
        reply.send({ message: 'Webhook received', data: webhookData });
      });
      
    }


    