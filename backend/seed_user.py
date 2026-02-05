
from database import SessionLocal, engine
import models
from passlib.context import CryptContext

# Create tables
models.Base.metadata.create_all(bind=engine)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def seed_user():
    db = SessionLocal()
    try:
        user = db.query(models.User).filter(models.User.username == "celestin").first()
        if user:
            print("User 'celestin' already exists.")
            # Optional: Reset password if you want strict guarantee
            # user.hashed_password = get_password_hash("celestin")
            # db.commit()
        else:
            hashed_password = get_password_hash("celestin")
            new_user = models.User(
                username="celestin",
                email="celestin@example.com",
                hashed_password=hashed_password,
                role="superadmin"
            )
            db.add(new_user)
            db.commit()
            print("User 'celestin' created successfully.")
    except Exception as e:
        print(f"Error seeding user: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_user()
