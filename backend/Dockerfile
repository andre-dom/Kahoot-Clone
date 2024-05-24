# Use the official Python image from the Docker Hub
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt requirements.txt

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the working directory contents into the container
COPY . .

CMD ["python3" "manage.py", "runserver", "0.0.0.0:8000"]

EXPOSE 8000

CMD ["python3" "manage.py", "runserver", "0.0.0.0:8000"]