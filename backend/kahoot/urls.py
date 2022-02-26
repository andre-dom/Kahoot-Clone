from django.contrib import admin
from django.template.defaulttags import url
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

import quizzes.urls

urlpatterns = [

    # url to the admin page.
    # admin monitors the whole site
    path('admin/', admin.site.urls),
    # url for user login, logout, password reset,and account activation
    path('auth/', include('djoser.urls')),
    # url for user's token authentication
    path('auth/', include('djoser.urls.authtoken')),

    # YAML file for viewing the API Schema
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    # Optional UI:

    # another url for viewing api schema
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),

    # link you will see at the start of web page when running server. base url
    path('', include(quizzes.urls)),
]
