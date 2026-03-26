from concurrent import futures
import grpc

import demo_pb2
import demo_pb2_grpc


class PaymentService(demo_pb2_grpc.PaymentServiceServicer):

    def Charge(self, request, context):

        print("Processing payment:", request.amount)

        return demo_pb2.PaymentResponse(
            status="payment successful"
        )


def serve():

    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))

    demo_pb2_grpc.add_PaymentServiceServicer_to_server(
        PaymentService(), server
    )

    server.add_insecure_port("0.0.0.0:50052")
    #server.add_insecure_port("[::]:50052")

    print("Payment service running on 50052")

    server.start()
    server.wait_for_termination()


if __name__ == "__main__":
    serve()