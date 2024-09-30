import os
import uuid
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import Token
from rest_framework import status

from .serializers import ProductSerializer,ReviewsSerializer,UserSerializer,AllProductSerializer

from .models import Product,Reviews,User




# CustomToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        token['username' ] =user.username
        
        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
#----------------------------------------------------------------------------
#product CRUD
    
@api_view(['GET'])
def GetProducts(request):
    Products = Product.objects.all()
    serializer = AllProductSerializer(Products,many=True)
    
    return Response(serializer.data)

@api_view(['GET'])
def GetProduct(request,pk):
    
    product = Product.objects.get(id=pk)
    
    serializer = AllProductSerializer(product,many=False)
    
    return Response(serializer.data)


@api_view(['POST'])
def CreateProduct(request):
    serializer = ProductSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
    
        return Response('Product Created')
    else:
        return Response(serializer.errors, status=400)
    
def rename_image_file(instance, filename):
    ext = filename.split('.')[-1]
    filename = f"{uuid.uuid4().hex}.{ext}"  # Generate a unique file name
    return os.path.join('products', filename)

        
@api_view(['PUT'])
def UpdateProduct(request,pk):
    
    if request.method == 'PUT':
        product = Product.objects.get(id=pk)
        
        print(request.data)
        data = request.data.copy()

        
        if 'ProductPic' in request.FILES:
        # If a new file is uploaded, replace 'ProductPic' with the uploaded file
            file = request.FILES['ProductPic']
            file.name = rename_image_file(product, file.name)  # Rename the file
            data['ProductPic'] = file
           
        else:
        # If no new file is uploaded, retain the old ProductPic
            data['ProductPic'] = product.ProductPic
       
        print(data)
        serializer = AllProductSerializer(instance=product,data=data,partial=True)
            
        if serializer.is_valid():
            product.ProductPic.delete(save=False)#to delete the pic in the product before uploading the new one
            serializer.save()
            return Response('Product Updated')
        return Response(serializer.errors, status=400)
            
        
    

@api_view(['DELETE'])
def DeleteProduct(request,pk):
    product = Product.objects.get(id=pk)
    product.delete()
    
    return Response('Product Deleted')

#------------------------------------------------------------------------------------------------------


#Reviews Crud
@api_view(['GET'])
def GetReviews (request):
    Reviewss = Reviews.objects.all()
    serializer = ReviewsSerializer(Reviewss,many=True)
    
    return Response(serializer.data)

@api_view(['GET'])
def GetReview(request,pk):
    
    Reviewss = Reviews.objects.get(id=pk)
    
    serializer = ReviewsSerializer(Reviewss,many=False)
    
    return Response(serializer.data)


# @api_view(['POST'])
# def CreateReview(request,pk):
    
#     product = Product.objects.get(id=pk)
#     serializer = ReviewsSerializer(data=request.data)
    
#     if serializer.is_valid():
#         review = serializer.save()
#         product.ProductReview.add(review)
    
    
    
#     return Response('Review Created')
@api_view(['POST'])
def CreateReview(request, pk):
    try:
        product = Product.objects.get(id=pk)  # Get the product by primary key (pk)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
    
    # Serialize the incoming data to a review
    serializer = ReviewsSerializer(data=request.data)
    print(request.data)
    
    if serializer.is_valid():
        # Save the review instance
        review = serializer.save()
        
        # Add the review to the product's reviews ManyToManyField
        product.ProductReview.add(review)  # Use 'reviews' instead of 'ProductReview'
        
        # Optionally return the updated product or review details
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    # If the serializer is not valid, return the errors
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['PUT'])
def UpdateReview(request,pk):
    
    Reviewss = Reviews.objects.get(id=pk)
    
    serializer = ReviewsSerializer(instance=Reviewss,data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        
        
    return Response('review Updated')

@api_view(['DELETE'])
def DeleteReview(request,pk):
    Reviewss = Reviews.objects.get(id=pk)
    Reviewss.delete()
    
    return Response('review Deleted')

#LOG-IN
@api_view(['POST'])
def LogIn(request,pk):
    
    try:
        user = User.objects.get(id=pk)
    
    except:
        return Response("User 404")
    
    if user is not None:
        
        serializer = UserSerializer(user,many=False)
        
        return Response(serializer.data)
    
@api_view(['GET'])
def GetUser(request,pk):
    
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user,many=False)
    
    return Response(serializer.data)
    
#register
@api_view(['POST'])
def RegisterUser(request):
    
    
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User registered successfully'})
        return Response(serializer.errors, status=400)
    
@api_view(['PUT'])
def UpdateUser(request,pk):
    
    if request.method == 'PUT':
        user = User.objects.get(id=pk)
        
        print(request.data)
        data = request.data.copy()

        
        if 'Avatar' in request.FILES:
      
            file = request.FILES['Avatar']
            file.name = rename_image_file(user, file.name)  # Rename the file
            data['Avatar'] = file
           
        else:
        
            data['Avatar'] = User.ProductPic
       
        print(data)
        serializer = UserSerializer(instance=user,data=data,partial=True)
            
        if serializer.is_valid():
            user.Avatar.delete(save=False)#to delete the pic in the product before uploading the new one
            serializer.save()
            return Response('User Updated')
        return Response(serializer.errors, status=400)
    
#add to cart(uk = userkey pk=productkey)
@api_view(['PUT'])
def AddToCart(request,pk,uk):
    user = User.objects.get(id=uk)
    product = Product.objects.get(id=pk)
    
    user.Cart.add(product)
    
    return Response('added to cart')

@api_view(['PUT'])
def RemoveToCart(request,pk,uk):
    user = User.objects.get(id=uk)
    cart = user.Cart.get(id=pk)
    print(cart)
    
    
    user.Cart.remove(cart)
    
    return Response('added to cart')


    




    