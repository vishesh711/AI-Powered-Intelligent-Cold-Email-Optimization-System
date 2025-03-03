import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from typing import List, Optional

from app.core.config import settings


class EmailService:
    """Service for sending emails."""

    def send_email(
        self,
        to_email: str,
        to_name: str,
        subject: str,
        body: str,
        from_email: Optional[str] = None,
        from_name: Optional[str] = None,
        cc: Optional[List[str]] = None,
        bcc: Optional[List[str]] = None,
        reply_to: Optional[str] = None,
        html: bool = True,
    ) -> bool:
        """
        Send an email.

        Args:
            to_email: Recipient email address
            to_name: Recipient name
            subject: Email subject
            body: Email body
            from_email: Sender email address (defaults to settings.EMAILS_FROM_EMAIL)
            from_name: Sender name (defaults to settings.EMAILS_FROM_NAME)
            cc: List of CC recipients
            bcc: List of BCC recipients
            reply_to: Reply-to email address
            html: Whether the body is HTML

        Returns:
            True if the email was sent successfully, False otherwise
        """
        # Use default sender if not provided
        from_email = from_email or settings.EMAILS_FROM_EMAIL
        from_name = from_name or settings.EMAILS_FROM_NAME

        if not from_email or not to_email:
            raise ValueError("Sender and recipient email addresses are required")

        # Create message
        msg = MIMEMultipart()
        msg["From"] = f"{from_name} <{from_email}>" if from_name else from_email
        msg["To"] = f"{to_name} <{to_email}>" if to_name else to_email
        msg["Subject"] = subject

        if cc:
            msg["Cc"] = ", ".join(cc)
        if reply_to:
            msg["Reply-To"] = reply_to

        # Add body
        if html:
            msg.attach(MIMEText(body, "html"))
        else:
            msg.attach(MIMEText(body, "plain"))

        try:
            # Connect to SMTP server
            server = smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT)
            if settings.SMTP_TLS:
                server.starttls()

            # Login if credentials are provided
            if settings.SMTP_USER and settings.SMTP_PASSWORD:
                server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)

            # Send email
            recipients = [to_email]
            if cc:
                recipients.extend(cc)
            if bcc:
                recipients.extend(bcc)

            server.sendmail(from_email, recipients, msg.as_string())
            server.quit()

            return True
        except Exception as e:
            print(f"Error sending email: {str(e)}")
            return False

    def send_campaign_email(
        self, campaign_id: int, prospect_id: int, email_id: int
    ) -> bool:
        """
        Send an email as part of a campaign.

        In a real implementation, this would handle tracking, personalization, etc.
        """
        # This is a placeholder implementation
        # In a real system, this would fetch the email and prospect from the database,
        # personalize the content, add tracking pixels and links, etc.
        return True


email_service = EmailService()
