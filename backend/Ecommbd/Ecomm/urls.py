from django.urls import path
from .views import MyTokenObtainPairView,GetProducts
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # product CRUD
    path('products/',views.GetProducts, name='get-products'),
    path('product/<str:pk>/',views.GetProduct, name='get-product'),
    path('createProduct/',views.CreateProduct, name='create-products'),
    path('updateProduct/<str:pk>/',views.UpdateProduct, name='update-products'),
    path('deleteProduct/<str:pk>/',views.DeleteProduct, name='delete-products'),
    
    # Review Crud
    path('reviews/',views.GetReviews, name='get-reviews'),
    path('review/<str:pk>/',views.GetReview, name='get-review'),
    path('createReview/<str:pk>/',views.CreateReview, name='create-review'),
    path('updateReview/<str:pk>/',views.UpdateReview, name='update-Review'),
    path('deleteReview/<str:pk>/',views.DeleteReview, name='delete-review'),
    
    #LogIN
    path('getuser/<str:pk>/',views.GetUser, name='getuser'),
    path('registerUser/',views.RegisterUser, name='register'),
    path('updateuser/<str:pk>/',views.UpdateUser, name='updateuser'),
    
    
    #Cart
    path('addToCart/<str:pk>/<str:uk>',views.AddToCart, name='addtocart'),
    path('removeToCart/<str:pk>/<str:uk>',views.RemoveToCart, name='removetocart'),
]
urlpatterns +=  static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

