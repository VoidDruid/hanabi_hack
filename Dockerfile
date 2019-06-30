FROM python:3

ENV PYTHONUNBUFFERED 1
ENV DOCKERED 1
RUN mkdir /app
WORKDIR /app
COPY requirements.txt /app/
RUN pip install -r requirements.txt
COPY . /app/
WORKDIR /app/src

EXPOSE 8080
CMD ["python3", "run.py"]