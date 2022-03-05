from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from django.contrib.auth.models import User
from .models import Quiz


class QuizPostTests(APITestCase):
    def setUp(self):
        self.user1 = User.objects.create(username='user1')
        self.user1.set_password("password")
        self.user1.save()

    def test_post_quiz_with_correct_answer_index_4(self):
        """
             If a quiz has a question at most 4 correct answers, success on validate
        """
        url = reverse("quiz-list")
        data = {
            "name": "string",
            "questions": [
                {
                    "question_body": "string",
                    "answers": [
                        {
                            "answer_body": "a",

                        },
                        {
                            "answer_body": "b",

                        },
                        {
                            "answer_body": "c",

                        },
                        {
                            "answer_body": "d"
                        }
                    ],
                    "correct_answer": 4
                }
            ]
        }
        self.client.force_authenticate(user=self.user1)
        response = self.client.post(url, data, format='json')
        self.client.force_authenticate(user=None)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_post_quiz_with_correct_answer_index_1(self):
        """
                  If a quiz has a question with at least 1 correct answer, success on validate
        """
        url = reverse("quiz-list")
        data = {
            "name": "string",
            "questions": [
                {
                    "question_body": "string",
                    "answers": [
                        {
                            "answer_body": "a",

                        },
                        {
                            "answer_body": "b",

                        },
                        {
                            "answer_body": "c",

                        },
                        {
                            "answer_body": "d"
                        }
                    ],
                    "correct_answer": 1
                }
            ]
        }

    def test_post_quiz_with_correct_answer_index_0(self):
        """
        If a quiz has a question less than 1 correct answer, fail to validate
        """
        url = reverse("quiz-list")
        data = {
            "name": "string",
            "questions": [
                {
                    "question_body": "string",
                    "answers": [
                        {
                            "answer_body": "a",

                        },
                        {
                            "answer_body": "b",

                        },
                        {
                            "answer_body": "c",

                        },
                        {
                            "answer_body": "d"
                        }
                    ],
                    "correct_answer": 0
                }
            ]
        }
        self.client.force_authenticate(user=self.user1)
        response = self.client.post(url, data, format='json')
        self.client.force_authenticate(user=None)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        # self.assertEqual(response.data, {"non_field_errors:" ["No less than 1 /correct answer!"]},)

    def test_post_quiz_with_correct_answer_index_5(self):
        url = reverse("quiz-list")
        data = {
            "name": "string",
            "questions": [
                {
                    "question_body": "string",
                    "answers": [
                        {
                            "answer_body": "a",

                        },
                        {
                            "answer_body": "b",

                        },
                        {
                            "answer_body": "c",

                        },
                        {
                            "answer_body": "d"
                        }
                    ],
                    "correct_answer": 5
                }
            ]
        }
        self.client.force_authenticate(user=self.user1)
        response = self.client.post(url, data, format='json')
        self.client.force_authenticate(user=None)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        # self.assertEqual(response.data, {"non_field_errors:":["No more than 4 correct answers!"]})
    def test_post_quiz_with_4_answers(self):

        url = reverse("quiz-list")
        data = {
            "name": "string",
            "questions": [
                {
                    "question_body": "string",
                    "answers": [
                        {
                            "answer_body": "a",

                        },
                        {
                            "answer_body": "b",

                        },
                        {
                            "answer_body": "c",

                        },
                        {
                            "answer_body": "d"
                        }
                    ],
                    "correct_answer": 4
                }
            ]
        }
        self.client.force_authenticate(user=self.user1)
        response = self.client.post(url, data, format='json')
        self.client.force_authenticate(user=None)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_post_quiz_with_3_answers(self):
        """
        If a quiz has a question with 3 answers, fail  to validate
        """
        url = reverse("quiz-list")
        data = {
            "name": "string",
            "questions": [
                {
                    "question_body": "string",
                    "answers": [
                        {
                            "answer_body": "a",

                        },
                        {
                            "answer_body": "b",

                        },
                        {
                            "answer_body": "c",

                        }

                    ],
                    "correct_answer": 4
                }
            ]
        }
        self.client.force_authenticate(user=self.user1)
        response = self.client.post(url, data, format='json')
        self.client.force_authenticate(user=None)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        # self.assertEqual(response.data, {"non_field_errors:"["Must have exactly 4 answers!"]})

    def test_post_quiz_with_5_answers(self):
        """
        If a quiz has a question with 5 answers, fail to validate
        """

        url = reverse("quiz-list")
        data = {
            "name": "string",
            "questions": [
                {
                    "question_body": "string",
                    "answers": [
                        {
                            "answer_body": "a",

                        },
                        {
                            "answer_body": "b",

                        },
                        {
                            "answer_body": "c",

                        },
                        {
                            "answer_body": "d"
                        },
                        {
                            "answer_body": "e"
                        }
                    ],
                    "correct_answer": 4
                }
            ]
        }
        self.client.force_authenticate(user=self.user1)

        response = self.client.post(url, data, format='json')
        self.client.force_authenticate(user=None)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        # self.assertEqual(response.data, {"non_field_errors:":["Must have exactly 4 answers!"]})
