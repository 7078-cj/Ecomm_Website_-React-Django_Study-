from rest_framework import serializers
from .models import Product,Reviews,User


class ReviewsSerializer(serializers.ModelSerializer):
    
    class Meta:
       model = Reviews
       fields = '__all__'
       
class ProductSerializer(serializers.ModelSerializer):
    
    
    class Meta:
       model = Product
       fields = ('id','ProductName','ProductPic','price','seller')
       
       

class UserSerializer(serializers.ModelSerializer):
    Cart = ProductSerializer(many=True)
    class Meta:
       model = User
       fields = ('id', 'username', 'email', 'password','Avatar','Cart')
       extra_kwargs = {'password': {'write_only': True}}
       
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            name=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            
        )
        return user
    
class AllReviewsSerializer(serializers.ModelSerializer):
    reviewer = UserSerializer()
    class Meta:
       model = Reviews
       fields = '__all__'
    
class AllProductSerializer(serializers.ModelSerializer):
    seller = UserSerializer()
    ProductReview = AllReviewsSerializer(many=True)
    
    class Meta:
       model = Product
       fields = '__all__'
       

    
   
       