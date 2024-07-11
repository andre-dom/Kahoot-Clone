from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

from django_elasticsearch_dsl.registries import registry


def simple_document_update(app_label, model_name, instance):
    if app_label == "quiz":
        if model_name in ["question", "answer"]:
            instances = instance.quizzes.all()
            for _instance in instances:
                registry.update(_instance)


@receiver(post_save)
def update_document(sender, **kwargs):
    simple_document_update(
        sender._meta.app_label, sender._meta.model_name, kwargs["instance"]
    )


@receiver(post_delete)
def delete_document(sender, **kwargs):
    simple_document_update(
        sender._meta.app_label, sender._meta.model_name, kwargs["instance"]
    )
