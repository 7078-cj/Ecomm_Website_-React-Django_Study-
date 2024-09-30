from django.db import models
from django.contrib.auth.models import AbstractUser
#CustomUser(settings.AUTH_USER_MODEL to swap)
from django.conf import settings


# Create your models here.
    

class Reviews(models.Model):
    reviewer = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    body = models.CharField(max_length=200)
    rate = models.IntegerField()
    

class Category(models.Model):
    title = models.CharField(max_length=200)
    Category = models.ImageField(null=True, default="null.jpg",upload_to='static/category', blank=True )
    


class Product(models.Model):
    ProductName = models.CharField(max_length=200)
    ProductPic = models.ImageField(null=True, default="null.jpg", upload_to='static/products')
    price =  models.IntegerField()
    ProductReview = models.ManyToManyField(Reviews,related_name='ProductReview',blank=True)
    Category = models.ManyToManyField(Category,related_name='category',blank=True)
    seller = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    updated = models.DateTimeField(auto_now=True)
    created= models.DateTimeField(auto_now_add=True)

class User(AbstractUser):
    name = models.CharField(max_length=200,)
    email = models.EmailField(unique=True)
    
    Avatar =  models.ImageField(null=True, default="null.jpg",upload_to='static/users')
    Cart = models.ManyToManyField(Product, related_name='Usercart',blank=True)
    
    USERNAME_FIELD = 'email'
    
    REQUIRED_FIELDS = []
    
    def __str__(self):
        return self.name


    


    




    
