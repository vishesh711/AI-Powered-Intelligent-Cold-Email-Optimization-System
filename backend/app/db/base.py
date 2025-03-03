# Import all the models, so that Base has them before being
# imported by Alembic
from app.db.base_class import Base  # noqa
from app.models.user import User  # noqa
from app.models.prospect import Prospect, Company, ProspectSegment  # noqa
from app.models.campaign import Campaign  # noqa
from app.models.email import Email, EmailTemplate  # noqa
