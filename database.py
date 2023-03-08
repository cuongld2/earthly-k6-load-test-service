from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os


USER = os.getenv('DB_USER')
PASSWORD = os.getenv('DB_PASSWORD')

SQLALCHEMY_DATABASE_URL = (f"mysql+mysqlconnector://{USER}:{PASSWORD}@localhost:3306/blogFastAPI")

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()





