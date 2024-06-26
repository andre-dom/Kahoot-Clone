"""
ASGI config for kahoot project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/howto/deployment/asgi/
"""

import os
import django
from django.core.asgi import get_asgi_application
from django.urls import include, re_path
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import django_eventstream

# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "server.settings")

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "kahoot.settings")

application = ProtocolTypeRouter(
    {
        "http": URLRouter(
            [
                re_path(
                    r"^events/",
                    AuthMiddlewareStack(
                        URLRouter(django_eventstream.routing.urlpatterns)
                    ),
                ),
                re_path(r"", get_asgi_application()),
            ]
        ),
    }
)
