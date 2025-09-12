# Django API Views Reference
# Add these to your Django backend at: C:\Users\User\PycharmProjects\Eavest-Backend
# 
# This file shows what API endpoints your Django backend should implement
# to work with the Next.js frontend integration

"""
Required Django views for the frontend integration:

1. GET /api/products/ - List all products with optional filtering
2. GET /api/products/{isin}/ - Get specific product by ISIN

IMPORTANT: 401 Unauthorized Error Fix:
Your Django backend is currently returning 401 errors. Here are solutions:

Option 1: Disable authentication for these endpoints (QUICKEST FIX):
Add @csrf_exempt decorator and remove authentication requirements

Option 2: Use Django REST Framework with proper authentication
Option 3: Configure basic auth or token auth

Example implementation:
"""

from django.http import JsonResponse
from django.core.paginator import Paginator
from django.db.models import Q
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views import View
from .models import PrdProduct, PrdStatu, DeliverTable, PrdSousjacent, PrdProductSousjacent

# QUICKEST FIX: Remove authentication requirement
@csrf_exempt
@require_http_methods(["GET"])
def products_list(request):
    """
    UNAUTHENTICATED API endpoint for listing products
    URL: /api/products/
    This removes the 401 error by allowing unauthenticated access
    """
    """
    API endpoint for listing products
    URL: /api/products/
    """
    try:
        # Get query parameters
        search = request.GET.get('search', '')
        limit = int(request.GET.get('limit', 50))
        isin_filter = request.GET.get('isin', '')
        
        # Base queryset
        queryset = PrdProduct.objects.all()
        
        # Apply filters
        if search:
            queryset = queryset.filter(
                Q(label__icontains=search) |
                Q(isin__icontains=search) |
                Q(deliver__icontains=search) |
                Q(family__icontains=search)
            )
        
        if isin_filter:
            queryset = queryset.filter(isin=isin_filter)
        
        # Order by latest first
        queryset = queryset.order_by('-launch_date', '-created_at')
        
        # Paginate
        paginator = Paginator(queryset, limit)
        page = paginator.get_page(1)
        
        # Serialize products
        products = []
        for product in page.object_list:
            products.append({
                'id': product.id,
                'label': product.label,
                'isin': product.isin,
                'deliver': product.deliver,
                'family': product.family,
                'category': product.category,
                'launch_date': product.launch_date.isoformat() if product.launch_date else None,
                'due_date': product.due_date.isoformat() if product.due_date else None,
                'coupon': product.coupon,
                'coupon_year': product.coupon_year,
                'id_prd_status': product.id_prd_status,
                'capital_guaranteed': product.capital_guaranteed,
                'performance': product.performance,
            })
        
        return JsonResponse({
            'results': products,
            'count': paginator.count,
            'next': page.has_next(),
            'previous': page.has_previous(),
        })
        
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


# QUICKEST FIX: Remove authentication requirement
@csrf_exempt
@require_http_methods(["GET"])
def product_detail(request, isin):
    """
    API endpoint for getting specific product by ISIN
    URL: /api/products/{isin}/
    """
    try:
        # Find product by ISIN
        try:
            product = PrdProduct.objects.get(isin=isin)
        except PrdProduct.DoesNotExist:
            return JsonResponse({'error': 'Product not found'}, status=404)
        
        # Get related status
        status = None
        if product.id_prd_status:
            try:
                status = PrdStatu.objects.get(id=product.id_prd_status)
            except PrdStatu.DoesNotExist:
                pass
        
        # Get related deliver info
        deliver = None
        if product.id_deliver:
            try:
                deliver = DeliverTable.objects.get(id=product.id_deliver)
            except DeliverTable.DoesNotExist:
                pass
        
        # Get related sousjacents (underlyings)
        sousjacents = []
        product_sousjacents = PrdProductSousjacent.objects.filter(id_prd_product=product.id)
        for ps in product_sousjacents:
            try:
                sousjacent = PrdSousjacent.objects.get(id=ps.id_prd_sousjacent)
                sousjacents.append({
                    'id': sousjacent.id,
                    'label': sousjacent.label,
                    'type': sousjacent.type,
                })
            except PrdSousjacent.DoesNotExist:
                continue
        
        # Build response
        response_data = {
            'product': {
                'id': product.id,
                'label': product.label,
                'isin': product.isin,
                'deliver': product.deliver,
                'family': product.family,
                'category': product.category,
                'launch_date': product.launch_date.isoformat() if product.launch_date else None,
                'due_date': product.due_date.isoformat() if product.due_date else None,
                'coupon': product.coupon,
                'coupon_year': product.coupon_year,
                'capital_protection': product.capital_protection,
                'protection_barrier': product.protection_barrier,
                'coupon_barrier': product.coupon_barrier,
                'reimbursement_barrier': product.reimbursement_barrier,
                'id_prd_status': product.id_prd_status,
                'capital_guaranteed': product.capital_guaranteed,
                'performance': product.performance,
            }
        }
        
        if status:
            response_data['status'] = {
                'id': status.id,
                'code': status.code,
                'description': status.description,
            }
        
        if deliver:
            response_data['deliver'] = {
                'id': deliver.id,
                'deliver': deliver.deliver,
                'groups': deliver.groups,
                'nationality': deliver.nationality,
            }
        
        if sousjacents:
            response_data['sousjacents'] = sousjacents
        
        return JsonResponse(response_data)
        
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


# URL patterns to add to your Django urls.py:
"""
from django.urls import path
from . import views

urlpatterns = [
    path('api/products/', views.products_list, name='products-list'),
    path('api/products/<str:isin>/', views.product_detail, name='product-detail'),
    # ... other urls
]
"""

# QUICK FIX FOR AUTHENTICATION:
# If you want to quickly disable authentication for testing, add this to your Django settings.py:
"""
# In settings.py, add this middleware to allow CORS from your Next.js app:
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    # ... other middleware
]

# Allow your Next.js app to make requests:
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Your Next.js dev server
    "http://127.0.0.1:3000",
]

# Or for development, allow all origins (LESS SECURE):
CORS_ALLOW_ALL_ORIGINS = True

# Install django-cors-headers first:
# pip install django-cors-headers
"""

# ALTERNATIVE: Use authentication credentials
# If your Django backend uses basic auth, set these in your .env.local:
"""
DJANGO_USERNAME=your-django-username
DJANGO_PASSWORD=your-django-password
"""