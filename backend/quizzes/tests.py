from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from django.contrib.auth.models import User

class QuizPostTests(APITestCase):
	def setUp(self):
		self.user1 = User.objects.create(username='user1')
		self.user1.set_password("password")
		self.user1.save()

	def test_post_quiz_with_no_questions(self):
		"""
		If a quiz has no questions, fail to validate
		"""
		url = reverse("quiz-list")
		data = {
			'name': 'a quiz with no questions',
			'questions': []
		}
		self.client.force_authenticate(user=self.user1)
		response = self.client.post(url, data, format='json')
		self.client.force_authenticate(user=None)
		self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
