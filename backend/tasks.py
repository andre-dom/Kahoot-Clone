from celery import shared_task
from django.core.mail import send_mail


@shared_task
def send_email_task(player):
    send_mail(
        "Kahoot-Clone Game Invite",
        f"{player.game.creator.username} has invited you to a game! Join with the link below:\n\nhttp://127.0.0.1:3000/game/{player.slug}",
        "admin@example.com",
        [player.email],
        fail_silently=False,
    )
