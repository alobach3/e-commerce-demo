package main

import (
	"context"
	"log"
	"net"

	pb "product-service/productservice"

	"google.golang.org/grpc"
)

type server struct {
	pb.UnimplementedProductServiceServer
}

func (s *server) ListProducts(ctx context.Context, req *pb.Empty) (*pb.ProductList, error) {

	products := []*pb.Product{
		{Id: 1, Name: "Anime Figure 1/6", Category: "figure", Price: 200, Image: "https://via.placeholder.com/400x400"},
		{Id: 2, Name: "Anime Figure 1/7", Category: "figure", Price: 67, Image: "https://via.placeholder.com/400x400"},
		{Id: 3, Name: "Anime Keycap", Category: "keyboard", Price: 67, Image: "https://via.placeholder.com/400x400"},
		{Id: 4, Name: "Anime Accessories", Category: "accessories", Price: 100, Image: "https://via.placeholder.com/400x400"},
		{Id: 5, Name: "Abune Bundle", Category: "bundle", Price: 300, Image: "https://via.placeholder.com/400x400"},
	}

	return &pb.ProductList{Products: products}, nil
}

func main() {

	lis, err := net.Listen("tcp", "0.0.0.0:50051")
	//lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatal(err)
	}

	grpcServer := grpc.NewServer()

	pb.RegisterProductServiceServer(grpcServer, &server{})

	log.Println("Product service running on 50051")

	grpcServer.Serve(lis)
}
