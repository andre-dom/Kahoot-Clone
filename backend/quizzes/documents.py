from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry
from .models import Quiz


@registry.register_document
class QuizDocument(Document):
    slug = fields.KeywordField()
    name = fields.TextField()
    creator = fields.ObjectField(
        properties={
            "username": fields.TextField(),
            "email": fields.TextField(),
        }
    )
    questions = fields.NestedField(
        properties={
            "body": fields.TextField(),
            "answers": fields.NestedField(
                properties={
                    "body": fields.TextField(),
                }
            ),
        }
    )

    class Index:
        # Name of the Elasticsearch index
        name = "quizzes"
        # See Elasticsearch Indices API reference for available settings
        settings = {"number_of_shards": 1, "number_of_replicas": 0}

    class Django:
        model = Quiz  # The model associated with this Document
        fields = []

    def prepare(self, instance):
        """Prepare the data for indexing."""
        data = super().prepare(instance)
        data["questions"] = self.prepare_questions(instance)
        return data

    def prepare_questions(self, instance):
        """Prepare questions for indexing."""
        return [
            {
                "body": question.body,
                "answers": [{"body": answer.body} for answer in question.answers.all()],
            }
            for question in instance.questions.all()
        ]
