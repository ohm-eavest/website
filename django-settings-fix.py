"""
Django Settings Fix for staging.eavest.com
Add this to your Django settings.py file in ~/Backend

This fixes the RuntimeError about trailing slashes
"""

# Option 1: Disable APPEND_SLASH (Quick fix)
# Add this to your settings.py:
APPEND_SLASH = False

# Option 2: Keep APPEND_SLASH but ensure all API calls use trailing slashes
# This is already done in the Next.js code, but the proxy might be stripping it

# Option 3: Add middleware to handle both with and without trailing slashes
# Create a file middleware.py in your Django app:

from django.http import HttpResponsePermanentRedirect
from django.urls import resolve, Resolver404

class ForceSlashMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if not request.path.endswith('/') and request.method == 'POST':
            # For POST requests, we can't redirect, so we modify the path
            request.path_info = request.path + '/'

        response = self.get_response(request)
        return response

# Then add to MIDDLEWARE in settings.py:
MIDDLEWARE = [
    # ... other middleware ...
    'yourapp.middleware.ForceSlashMiddleware',  # Add before CommonMiddleware
    'django.middleware.common.CommonMiddleware',
    # ... rest of middleware ...
]