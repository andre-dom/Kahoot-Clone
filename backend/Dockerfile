FROM python:3.12.3

WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

RUN apt-get update && apt-get install -y \
    curl \
    libcurl4-openssl-dev \
    make \
    gcc

COPY . .

RUN python3 manage.py migrate

EXPOSE 8000 

CMD sh -c "python manage.py runserver 0.0.0.0:8000"
